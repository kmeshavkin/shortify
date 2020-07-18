import bcrypt from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
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

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' },
      );

      return res.json({ token, userId: user.id });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

export const loginRouter = router;
