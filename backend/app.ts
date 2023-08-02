import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import ConnectMongo from 'connect-mongo';
import config from 'config';
import session from 'express-session';
import compression from 'compression';
import { authRouter } from './api/auth';
import { linkRouter } from './api/link';
import { redirectRouter } from './api/redirect';
import { pingRouter } from './api/ping';

const { name, secret, maxAge } = config.get<{name: string; secret: string; maxAge: number}>('session');

const app = express();
app.use(express.json());
app.use(compression());
app.use(
  session({
    name,
    secret,
    resave: true,
    saveUninitialized: true,
    store: ConnectMongo.create({ mongoUrl: config.get('mongoURL') }),
    cookie: { maxAge, sameSite: true, secure: 'auto' },
  })
);

// Routes setup
app.use('/api/auth', authRouter);
app.use('/api/link', linkRouter);
app.use('/t', redirectRouter);
app.use('/info/ping', pingRouter);

if (process.env.NODE_ENV !== 'development') {
  app.use('/', express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// Mongo setup and project run point
(async function start() {
  await mongoose.connect(config.get('mongoURL'));

  // TODO: Somehow access sessions schema and add hook to remove all links linked to expired session
  // mongoose.model('sessions').collection.watch().stream().on('data', (data) => {
  //     console.log(data.operationType);
  // });
  const PORT = config.get('port');
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
})();
