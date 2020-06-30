import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { loginRouter } from './api/login';
import { registerRouter } from './api/register';
import { linkRouter } from './api/link';

const app = express();
app.use(express.json());
app.use('/api', loginRouter);
app.use('/api', registerRouter);
app.use('/api/link', linkRouter);

const PORT = config.get('port');

(async function start() {
  await mongoose.connect(config.get('mongoURL'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
}());
