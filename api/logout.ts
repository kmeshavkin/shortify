import { Router } from 'express';

const router = Router();
router.post('/logout', async (req, res) => {
  try {
    return req.session.destroy(() => res.json({ done: true })); // TODO: Check if I need to delete cookie myself
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export const logoutRouter = router;
