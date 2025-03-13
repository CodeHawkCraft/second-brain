import { Router } from "express";
import authRoute from './auth';
import contentRoute from './content';
import userRoute from './user';
const router = Router();
router.use('/auth',authRoute);
router.use('/content',contentRoute);
router.use('/user',userRoute);
export default router;