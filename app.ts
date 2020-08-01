import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import session from 'express-session';
import { loginRouter } from './api/login';
import { logoutRouter } from './api/logout';
import { registerRouter } from './api/register';
import { linkRouter } from './api/link';
import { redirectRouter } from './api/redirect';

const app = express();
app.use(express.json());
app.use(session({
  name: config.get('sessionName'),
  secret: config.get('sessionSecret'), // TODO: hide
  saveUninitialized: false,
  resave: true,
  cookie: { maxAge: 3600000 },
}));
// TODO: should be also 'secure: true' (only for production)
// TODO: also should be https only (!!!http-only option is for server side cookies!!!)
// TODO: also don't forget mongo store for production
app.use('/api', loginRouter);
app.use('/api', logoutRouter);
app.use('/api', registerRouter);
app.use('/api/link', linkRouter);
app.use('/t', redirectRouter);

const PORT = config.get('port');

(async function start() {
  await mongoose.connect(config.get('mongoURL'), { // TODO: hide
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
}());
