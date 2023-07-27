import bcrypt from 'bcryptjs';
import config from 'config';
import { Router } from 'express';
import { validationResult, check } from 'express-validator';
import { google } from 'googleapis';
import { UserModel } from '../models/User';
import { AfterAuthMiddleware } from '../middleware/auth.middleware';

const { OAuth2 } = google.auth;
const { clientID, clientSecret, redirectPath, scope } = config.get<any>('google');
const oauth2Client = new OAuth2(
  clientID,
  clientSecret,
  `${config.get('frontendHost')}/${redirectPath}`
);

const router = Router();
router.post(
  '/login',
  [
    check('email', 'Email cannot be empty').exists({ checkFalsy: true }),
    check('email', 'Wrong email format').isEmail(),
    check('password', 'Password cannot be empty').exists({ checkFalsy: true }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login credentials',
        });
      }

      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Email not found' });

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      // Don't use req.session.regenerate here, I need session after login to save links
      req.session.userId = user.id;

      res.json({ done: true });
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
  AfterAuthMiddleware
);

router.post(
  '/google/redirect',
  async (req, res, next) => {
    try {
      const session = req.session as any;
      const { code, error } = req.query;
      if (error) throw new Error(error.toString());

      const { tokens } = await oauth2Client.getToken(code.toString());
      oauth2Client.setCredentials(tokens);
      const people = google.people({ version: 'v1', auth: oauth2Client });
      const { data } = await people.people.get({
        resourceName: 'people/me',
        personFields: 'emailAddresses,externalIds',
      });

      const externalId = data.etag;
      const email = data.emailAddresses[0].value;

      const candidate = await UserModel.findOneAndUpdate(
        { $or: [{ googleId: externalId }, { email }] },
        { email, password: '', googleId: externalId }, // TODO: make so it doesn't replace existing password
        { upsert: true, new: true }
      );
      session.userId = candidate.id;
      res.json({ done: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
    return next();
  },
  AfterAuthMiddleware
);

router.post('/logout', async (req, res) => {
  try {
    // Destroying session is not necessary, just in case
    return req.session.destroy(() => res.json({ done: true }));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post(
  '/register',
  [
    check('email', 'Email cannot be empty').exists({ checkFalsy: true }),
    check('email', 'Wrong email format').isEmail(),
    check('password', 'Password length should be at least 6').isLength({
      min: 6,
    }),
    check('password', 'Password length should be less than 40').isLength({
      max: 40,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect credentials',
        });
      }

      const { email, password } = req.body;
      const candidate = await UserModel.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync());
      const user = new UserModel({ email, password: hashedPassword });
      await user.save();

      return res.status(201).json({ done: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

router.post('/session', async (req, res) => {
  try {
    const session = req.session as any;
    const loginLink = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
    });
    return res.json({ loginLink, loggedIn: session.userId });
  } catch (e) {
    return res.json({ loggedIn: false });
  }
});

export const authRouter = router;
