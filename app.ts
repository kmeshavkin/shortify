import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { loginRouter } from './api/login';
import { registerRouter } from './api/register';
import { MONGO_URL } from './local-config';

const app = express();
app.use(express.json());
app.use('/api', loginRouter);
app.use('/api', registerRouter);

const PORT = config.get('port');

(async function start() {
  await mongoose.connect(config.get('mongoURL'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
}());
