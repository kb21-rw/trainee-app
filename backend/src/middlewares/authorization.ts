import { Response } from "express";
import { Role } from "../utils/types";

export const isAdmin = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != Role.ADMIN) {
    return res.status(401).json({ message: "Only admins are allowed " });
  }

  next();
};

export const isCoach = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != Role.COACH) {
    return res.status(401).json({ message: "Only coaches are allowed " });
  }

  next();
};

export const isAdminOrCoach = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != Role.ADMIN && role != Role.COACH) {
    return res
      .status(401)
      .json({ message: "Only coaches and admins are allowed" });
  }

  next();
};

export const isApplicant = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != Role.APPLICANT) {
    return res.status(401).json({ message: "Only applicants are allowed" });
  }

  next();
};
