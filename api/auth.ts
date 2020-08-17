import bcrypt from "bcryptjs";
import { Router } from "express";
import { validationResult, check } from "express-validator";
import { UserModel } from "../models/User";

const router = Router();
router.post(
  "/login",
  [
    check("email", "Email cannot be empty").exists({ checkFalsy: true }),
    check("email", "Wrong email format").isEmail(),
    check("password", "Password cannot be empty").exists({ checkFalsy: true }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login credentials",
        });
      }

      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(400).json({ message: "Email not found" });

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      // TODO: use req.session.regenerate(() => { ... }); here?
      req.session.userId = user.id;

      return res.json({ done: true }); // TODO: needs .json() response for some reason?
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post("/logout", async (req, res) => {
  try {
    return req.session.destroy(() => res.json({ done: true })); // TODO: Check if I need to delete cookie myself
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post(
  "/register",
  [
    check("email", "Email cannot be empty").exists({ checkFalsy: true }),
    check("email", "Wrong email format").isEmail(),
    check("password", "Password length should be at least 6").isLength({
      min: 6,
    }),
    check("password", "Password length should be less than 40").isLength({
      max: 40,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect credentials",
        });
      }

      const { email, password } = req.body;
      const candidate = await UserModel.findOne({ email });
      if (candidate)
        return res.status(400).json({ message: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync());
      const user = new UserModel({ email, password: hashedPassword });
      await user.save();

      return res.status(201).json({ done: true });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post("/session", async (req, res) => {
  try {
    if (req.session.userId) return res.json({ loggedIn: true });
  } catch (e) {
    return res.json({ loggedIn: false });
  }
  return res.json({ loggedIn: false });
});

export const authRouter = router;
