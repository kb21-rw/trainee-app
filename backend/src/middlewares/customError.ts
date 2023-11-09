class CustomError extends Error {
  errorCode: string | number;
  statusCode: number;

  constructor(
    errorCode: string | number,
    message: string | undefined,
    statusCode: number,
  ) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

export default CustomError;
