import { Request, Response, NextFunction } from "express";

// 404 Not found error
export const error404 = (req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("Not Found");
  error.status = 404;
  next(error);
};

// All errors
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
};
