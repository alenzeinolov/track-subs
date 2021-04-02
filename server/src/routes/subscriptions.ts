import { Router } from "express";
import { Subscription } from "../entities/Subscription";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.get("/", isAuth, async (req, res) => {
  const subscriptions = await Subscription.find({
    where: { userId: req.session.userId },
  });

  return res.json({
    status: "success",
    data: subscriptions,
  });
});

export default router;
