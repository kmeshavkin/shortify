import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import config from 'config';
import session from 'express-session';
import { authRouter } from './api/auth';
import { linkRouter } from './api/link';
import { redirectRouter } from './api/redirect';

const MongoStore = connectMongo(session);
const app = express();
app.use(express.json());
app.use(
  session({
    name: config.get('sessionName'),
    secret: config.get('sessionSecret'),
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 3600000, sameSite: true },
  })
);

// Routes setup
// TODO: should be also 'secure: true' (production only, read here: https://github.com/expressjs/session#cookiesecure)
app.use('/api/auth', authRouter);
app.use('/api/link', linkRouter);
app.use('/t', redirectRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// Mongo setup and project run point
const PORT = config.get('port');

(async function start() {
  await mongoose.connect(config.get('mongoURL'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  // TODO: Somehow access sessions schema and add hook to remove all links linked to expired session
  // mongoose.model('sessions').collection.watch().stream().on('data', (data) => {
  //     console.log(data.operationType);
  // });
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
})();
