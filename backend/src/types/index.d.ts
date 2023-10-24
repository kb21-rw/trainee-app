export {};

declare global {
  namespace Express {
    interface Request {
      params: string;
    }
  }
}