import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (controller: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
