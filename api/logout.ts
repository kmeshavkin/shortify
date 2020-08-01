import { Router } from 'express';
import config from 'config';

const router = Router();
router.post('/logout', async (req, res) => {
  try {
    return req.session.destroy(() => {
      res.clearCookie(config.get('sessionName'));
      return res.json({ done: true }); // TODO: why is .json required? status(200) doesn't work
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export const logoutRouter = router;
