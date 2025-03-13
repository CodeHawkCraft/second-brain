import { Router } from "express";
import { getProfile } from "../controller/userController";
import { userMiddleware } from "../middleware";

const router=Router();
router.get('/',userMiddleware, getProfile);


export default router;