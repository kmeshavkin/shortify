import { Router } from 'express';
import { LinkModel } from '../models/Link';

const router = Router();

router.get('/:code', async (req, res) => {
  try {
    const link = await LinkModel.findOne({ code: req.params.code });
    if (!link) return res.status(404).json('Link not found');

    if (link.clicksLeft === -1) return res.redirect(link.from);
    if (link.clicksLeft > 1) {
      link.clicksLeft--;
      await link.save();
      return res.redirect(link.from);
    }
    if (link.clicksLeft === 1) res.redirect(link.from);
    else res.status(404).json('Link not found');
    return link.remove();
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export const redirectRouter = router;
