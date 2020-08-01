import { Router } from 'express';
import config from 'config';

const router = Router();
router.post('/session', async (req, res) => {
  try {
    if (req.session.userId && req.session.cookie.expires > new Date(Date.now())) return res.json({ loggedIn: true });
  } catch (e) { }
  return req.session.destroy(() => {
    res.clearCookie(config.get('sessionName'));
    return res.json({ loggedIn: false });
  });
});

export const sessionRouter = router;
