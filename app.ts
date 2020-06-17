import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8080;
const MONGO_URL = '';

(async function start() {
  await mongoose.connect(MONGO_URL);
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
}());
