import { Response } from "express";

export const isAdmin = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != "ADMIN") {
    return res.status(401).json({ message: "Only admins are allowed " });
  }
  next();
};
