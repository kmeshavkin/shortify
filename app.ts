import express from 'express';
import mongoose from 'mongoose';
import { loginRouter } from './api/login';
import { registerRouter } from './api/register';
import { MONGO_URL } from './local-config';

const app = express();
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

const PORT = 8080;

(async function start() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
}());
