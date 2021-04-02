import { Router } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../entities/User";
import argon2 from "argon2";
import { toErrorResponse } from "../utils/toErrorResponse";

declare module "express-session" {
  interface Session {
    userId?: number;
  }
}

const router = Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(toErrorResponse(errors.array()));
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await argon2.verify(user.password, password))) {
      return res.status(400).json({
        status: "fail",
        data: [
          {
            field: "email",
            message: "Email or password is incorrect.",
          },
        ],
      });
    }

    req.session.userId = user.id;

    return res.json({
      status: "success",
      data: user,
    });
  }
);

router.post("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.json({
      status: "success",
      data: null,
    });
  });
});

router.post(
  "/register",
  body("email").isEmail().withMessage("Enter valid email."),
  body("fullName")
    .isLength({ min: 2 })
    .withMessage("Must have at least 2 characters."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Must have at least 8 characters."),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(toErrorResponse(errors.array()));
    }

    const { email, fullName, password } = req.body;

    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) {
      return res.status(400).json({
        status: "fail",
        data: {
          field: "email",
          message: "User with given email already exists",
        },
      });
    }

    const hashedPassword = await argon2.hash(password);
    const user = User.create({
      email,
      fullName,
      password: hashedPassword,
    });
    await user.save();

    req.session.userId = user.id;

    return res.json({
      data: user,
    });
  }
);

export default router;
