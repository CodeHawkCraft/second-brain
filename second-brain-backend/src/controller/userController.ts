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

export const updateUserName = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId; 
  const { username } = req.params;

  if (!username) {
      throw new ApiError(400, "Username must be present");
  }

  const existingUser = await UserModel.findOne({ 
      username, 
      _id: { $ne: userId }
  });

  if (existingUser) {
      throw new ApiError(400, "Username is already taken");
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username },
      { new: true } 
  );

  if (!updatedUser) {
      throw new ApiError(404, "User not found");
  }

  res.status(200).json(
      new ApiResponse(200, "Username updated successfully")
  );
});