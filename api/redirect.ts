import { Router } from 'express';
import { LinkModel } from '../models/Link';

const router = Router();

router.get('/:code', async (req, res) => {
  try {
    const link = await LinkModel.findOne({ code: req.params.code });
    if (!link) return res.status(404).json('Link not found');
    if (link.clicksLeft === 0) {
      return res.status(500).json('No link clicks left'); // TODO: Delete if 0 left?
    }

    if (link.clicksLeft > 0) {
      link.clicksLeft--;
      await link.save();
    }
    return res.redirect(link.from);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export const redirectRouter = router;
