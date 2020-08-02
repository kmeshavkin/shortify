import { Router } from 'express';

const router = Router();
router.post('/session', async (req, res) => {
  try {
    if (req.session.userId) return res.json({ loggedIn: true });
  } catch (e) {
    return res.json({ loggedIn: false });
  }
  return res.json({ loggedIn: false });
});

export const sessionRouter = router;
