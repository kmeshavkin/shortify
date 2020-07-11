import config from 'config';
import shortid from 'shortid';
import { Router } from 'express';
import { LinkModel } from '../models/Link';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/generate', AuthMiddleware, async (req: any, res) => {
  try {
    const baseUrl = config.get('baseURL');
    const { from, clicksLeft } = req.body;

    const code = shortid.generate();
    const to = `${baseUrl}/t/${code}`;

    const link = new LinkModel({
      code,
      to,
      from,
      owner: req.user.userId,
      clicksLeft,
    });
    await link.save();
    return res.status(201).json({ link });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/', AuthMiddleware, async (req: any, res) => {
  try {
    const links = await LinkModel.find({ owner: req.user.userId });
    return res.json(links);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/:id', AuthMiddleware, async (req, res) => {
  try {
    const link = await LinkModel.findById(req.params.id);
    return res.json(link);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export const linkRouter = router;
