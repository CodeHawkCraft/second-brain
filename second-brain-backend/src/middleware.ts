import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "./utils/asyncHandler";
import ApiError from "./utils/apiError";

export const userMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
      throw new ApiError(404, "Please Login");
    }
    const decodedObj = await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    if (typeof decodedObj === "string") {
      throw new ApiError(401, "Unauthorized");
    }

    req.userId = decodedObj.userId;

    next();
  }
);
