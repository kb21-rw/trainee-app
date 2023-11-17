/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

import CustomError from "./customError";
interface ErrorObject {
  keyValue: any;
  code: number;
  name: string;
  details?: any;
  statusCode: number;
  errorCode: number | string;
}

export const errorHandler = (
  error: ErrorObject,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  } else if (error.name === "NotFoundError") {
    return res.status(404).send({
      type: "NotFoundError",
      details: error.details,
    });
  } else if (error.code === 11000) {
    return res.status(400).send({
      type: "DuplicateError",
      details: `duplicate ${Object.keys(error.keyValue)}`,
    });
  }

  console.log({ error });
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      errorMessage: error.message,
    });
  }

  return res
    .status(500)
    .json({ error: "Something Went Wrong. Our team is working on it" });
};
