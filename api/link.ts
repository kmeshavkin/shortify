import config from "config";
import { Router } from "express";
import { LinkModel } from "../models/Link";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { generateSentence } from "../utils/generateId";

const router = Router();

router.post("/generate", AuthMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get("baseURL");
    const { from, clicksLeft } = req.body;

    const code =
      (await generateSentence(11, 5)) + Math.floor(Math.random() * 100);
    const to = `${baseUrl}/t/${code}`;

    const link = new LinkModel({
      code,
      to,
      from,
      owner: req.session.userId,
      clicksLeft,
    });
    await link.save();
    return res.status(201).json({ link });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", AuthMiddleware, async (req, res) => {
  try {
    const links = await LinkModel.find({ owner: req.session.userId });
    return res.json(links);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/:id", AuthMiddleware, async (req, res) => {
  try {
    const link = await LinkModel.findById(req.params.id);
    return res.json(link);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/delete/:id", AuthMiddleware, async (req, res) => {
  try {
    await LinkModel.deleteOne({ _id: req.params.id });
    const links = await LinkModel.find({ owner: req.session.userId });
    return res.json(links);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export const linkRouter = router;
