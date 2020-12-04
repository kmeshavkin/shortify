import { LinkModel } from '../models/Link';

export const AfterAuthMiddleware = async (
  req: any,
  res: any,
  next
): Promise<void> => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    if (req.session.userId) {
      await LinkModel.updateMany(
        { owner: req.session.id },
        { $set: { owner: req.session.userId } },
        { multi: true }
      );
      return next();
    }
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
  return res.status(401).json({ message: 'Not authorized' });
};
