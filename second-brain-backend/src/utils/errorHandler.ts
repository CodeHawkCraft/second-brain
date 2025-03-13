import { ErrorRequestHandler, NextFunction } from "express";
import { Request, Response } from "express";
import ApiError from "./apiError";
const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('error is -----> ',error);
  
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      message: error.message,
      success: false,
    });
    return;
  }

  res.status(500).send("Something went wrong");
};

export default errorHandler;
