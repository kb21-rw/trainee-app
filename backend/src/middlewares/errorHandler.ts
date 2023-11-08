/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomError from "./customError";

export const errorHandler = (
  error: { name: string; details: any; statusCode: number; errorCode: any },
  req: any,
  res: any,
  next: any,
) => {
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  }

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
