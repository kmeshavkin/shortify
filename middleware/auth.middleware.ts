import config from 'config';

export const AuthMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    if (req.session.userId && req.session.cookie.expires > new Date(Date.now())) return next();
  } catch (e) { }
  return req.session.destroy(() => {
    res.clearCookie(config.get('sessionName'));
    return res.status(401).json({ message: 'Not authorized' }); // TODO: why is .json required? status(200) doesn't work
  });
};
