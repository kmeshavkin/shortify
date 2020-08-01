export const AuthMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    if (req.session.userId && req.session.cookie.expires > new Date(Date.now())) return next();
  } catch (e) {
    // TODO: also should destroy cookie if cookie expired so React can check "no cookie = redirect to /"
    return res.status(401).json({ message: 'Not authorized' });
  }
  return res.status(401).json({ message: 'Not authorized' });
};
