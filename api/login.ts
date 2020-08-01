import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { validationResult, check } from 'express-validator';
import { UserModel } from '../models/User';

const router = Router();
router.post(
  '/login',
  [
    check('username', 'Username cannot be empty').exists({ checkFalsy: true }),
    check('password', 'Password cannot be empty').exists({ checkFalsy: true }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login credentials',
        });
      }

      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) return res.status(400).json({ message: 'Username not found' });

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      // TODO: use req.session.regenerate(() => { ... }); here?
      req.session.userId = user.id;

      return res.json({ done: true }); // TODO: needs .json() response for some reason?
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

export const loginRouter = router;
