import { Router } from "express";
import { logOut, signIn, signUp } from "../controller/authController";

const router=Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/logout', logOut);

export default router;