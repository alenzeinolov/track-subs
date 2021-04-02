import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({
      status: "fail",
      data: [
        {
          message: "You are not authenticated.",
        },
      ],
    });
  }

  return next();
};
