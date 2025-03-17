import { Router } from "express";
import { getProfile ,updateUserName} from "../controller/userController";
import { userMiddleware } from "../middleware";

const router=Router();
router.get('/',userMiddleware, getProfile);
router.patch('/:username',userMiddleware, updateUserName);

export default router;