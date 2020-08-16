import express from "express";
import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import config from "config";
import session from "express-session";
import { authRouter } from "./api/auth";
import { linkRouter } from "./api/link";
import { redirectRouter } from "./api/redirect";

const MongoStore = connectMongo(session);
const app = express();
app.use(express.json());
app.use(
  session({
    name: config.get("sessionName"),
    secret: config.get("sessionSecret"), // TODO: hide
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 3600000, sameSite: true },
  })
);

// Routes setup
// TODO: should be also 'secure: true' (production only, read here: https://github.com/expressjs/session#cookiesecure)
app.use("/api/auth", authRouter);
app.use("/api/link", linkRouter);
app.use("/t", redirectRouter);

// Mongo setup and project run point
const PORT = config.get("port");

(async function start() {
  await mongoose.connect(config.get("mongoURL"), {
    // TODO: hide
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
})();
