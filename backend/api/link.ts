import config from 'config';
import { Router } from 'express';
import { LinkModel } from '../models/Link';
import { generateSentence } from '../utils/generateId';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const session = req.session as any;
    const backendHost = config.get('backendHost');
    const { from, length, clicksLeft } = req.body;

    const code = await generateSentence(length, 5);
    const to = `${backendHost}/t/${code}`;

    const link = new LinkModel({
      code,
      to,
      from,
      owner: session.userId || session.id,
      clicksLeft,
    });
    await link.save();
    return res.status(201).json({ link });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/', async (req, res) => {
  try {
    const session = req.session as any;
    const links = await LinkModel.find({
      owner: session.userId || session.id,
    });
    return res.json(links);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

// Unused currently
router.post('/:id', async (req, res) => {
  try {
    const link = await LinkModel.findById(req.params.id);
    return res.json(link);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const session = req.session as any;
    await LinkModel.deleteOne({ _id: req.params.id });
    const links = await LinkModel.find({
      owner: session.userId || session.id,
    });
    return res.json(links);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export const linkRouter = router;
