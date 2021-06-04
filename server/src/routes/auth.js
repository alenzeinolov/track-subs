import { Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import User from "../models/User";

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "7d",
    }
  );
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY, {
    algorithms: ["HS256"],
  });
};

const router = Router();

router.post(
  "/login",
  checkSchema({
    username: {
      in: ["body"],
      isAlphanumeric: true,
      isLength: {
        options: {
          min: 4,
        },
      },
      trim: true,
      escape: true,
    },
    password: {
      in: ["body"],
      isLength: {
        options: {
          min: 8,
        },
      },
      trim: true,
      escape: true,
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const error = {
      message: "Incorrect username or password.",
    };
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json(error);
    }
    const checkPassword = await argon2.verify(user.password, password);
    if (!checkPassword) {
      return res.status(400).json(error);
    }

    return res.status(200).json({
      ...user,
      token: createToken(user),
    });
  }
);

router.post("/register", (req, res) => {});

export default router;
