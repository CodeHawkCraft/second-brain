import { Router } from "express";
import { createContent ,deleteContent,getContent, getSharableContent, shareContent} from "../controller/contentController";
import { userMiddleware } from "../middleware";

const router=Router();

router.post('/',userMiddleware,createContent);
router.get('/:filterOptions/:searchOption?/:searchWord?/:isDeepSearch?', userMiddleware, getContent);


router.delete('/:contentId', userMiddleware, deleteContent);

router.post('/share',userMiddleware,shareContent);
router.get('/:shareLink',getSharableContent);

export default router;