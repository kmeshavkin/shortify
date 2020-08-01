import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { UserModel } from '../models/User';

const router = Router();
router.post(
  '/register',
  [
    check('username', 'Username cannot be empty').exists({ checkFalsy: true }),
    check('password', 'Password length should be at least 6').isLength({ min: 6 }),
    check('password', 'Password length should be less than 40').isLength({ max: 40 }),
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

      const { username, password } = req.body;
      const candidate = await UserModel.findOne({ username });
      if (candidate) return res.status(400).json({ message: 'Username already exists' });

      const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync());
      const user = new UserModel({ username, password: hashedPassword });
      await user.save();

      return res.status(201).json({ message: 'User created' });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

export const registerRouter = router;
