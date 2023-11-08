export const tryCatch =
  (controller: any) => async (req: any, res: any, next: any) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
