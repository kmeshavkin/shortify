export const AuthMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    if (req.session.userId) return next();
  } catch (e) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  return res.status(401).json({ message: 'Not authorized' });
};
