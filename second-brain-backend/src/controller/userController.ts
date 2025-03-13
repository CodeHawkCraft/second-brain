import ApiResponse from "../utils/apiReponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { UserModel } from "../models/user";
import ApiError from "../utils/apiError";
export const getProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const user = await UserModel.findById(userId,{password:0});
    if(!user){
        throw new ApiError(400,'User Not Found');
    }
    res.status(200).json(new ApiResponse(200,'Profile fetched successfully',{username:user.username,token:user.getJWT()}));
  }
);

