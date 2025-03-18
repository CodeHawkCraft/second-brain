import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { userSchemaValidations } from "../utils/validation";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiReponse";
const COOKIE_EXPIRY = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const result = userSchemaValidations.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(400, result.error.issues[0].message);
  } else {

    const userFound = await UserModel.findOne({ username: req.body.username });
    if(userFound){
        throw new ApiError(409,"User already exists");
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await UserModel.create(req.body);
    await user.save();
    const token = await user.getJWT();
    res.cookie("token", token, {
        expires: COOKIE_EXPIRY,
        httpOnly: true,
        secure:true,
        sameSite: "none",
      });
    res.status(201).json(new ApiResponse(201, "User registered successfully",{token,username:user.username}));
  } 
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
    const result = userSchemaValidations.safeParse(req.body);
    if (!result.success) {
      throw new ApiError(400, result.error.issues[0].message);
    } else {
      const user = await UserModel.findOne(
        { username: req.body.username },
      );
      if (!user) {
        res.status(404).json({ message: "Invalid credentials" });
      } else {
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect) {
          res.status(401).json({ message: "password is incorrect" });
        } else {
          const token = await user.getJWT();
          res.cookie("token", token, {
            expires: COOKIE_EXPIRY,
            httpOnly: true,
            secure:true,
            sameSite: "none",
          });
          res.status(201).json(new ApiResponse(201, "user logged in successfully",{token,username:user.username}));
        }
      }
    }
});

export const logOut= asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json(new ApiResponse(200, "Logged out successfully"));
}); 