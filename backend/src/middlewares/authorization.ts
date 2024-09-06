import { Response } from "express";
import { Role } from "../utils/types";

export const isAdmin = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != Role.Admin) {
    return res.status(401).json({ message: "Only admins are allowed " });
  }

  next();
};

export const isCoach = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != Role.Coach) {
    return res.status(401).json({ message: "Only coaches are allowed " });
  }

  next();
};

export const isAdminOrCoach = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != Role.Admin && role != Role.Coach) {
    return res
      .status(401)
      .json({ message: "Only coaches and admins are allowed" });
  }

  next();
};

export const isApplicant = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != Role.Applicant) {
    return res.status(401).json({ message: "Only applicants are allowed" });
  }

  next();
};

export const isProspect = (req: any, res: Response, next: () => void) => {
  const { role } = req.user;
  if (role != Role.Prospect) {
    return res.status(401).json({ message: "Only prospects are allowed" });
  }

  next();
};
