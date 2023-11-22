/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

import CustomError from "./customError";
interface ErrorObject {
  message: string;
  kind: string;
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
    return res.status(400).json({
      type: "ValidationError",
      errorMessage: error.details[0].message,
    });
  } else if (error.name === "NotFoundError") {
    return res.status(404).json({
      type: "NotFoundError",
      errorMessage: error.details,
    });
  } else if (error.code === 11000) {
    return res.status(400).json({
      type: "DuplicateError",
      errorMessage: `duplicate ${Object.keys(error.keyValue)}`,
    });
  } else if (error.kind == "ObjectId") {
    return res.status(400).json({
      type: "InvalidDocumentId",
      errorMessage: error.message,
    });
  } else if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      type: error.errorCode,
      errorMessage: error.message,
    });
  }

  return res.status(500).json({
    type: "ServerError",
    errorMessage: "Something Went Wrong. Our team is working on it",
  });
};
