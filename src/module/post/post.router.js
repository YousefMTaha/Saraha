import { validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import * as postController from "./controller/post.js";
import { Router } from "express";
import * as validator from "./post.validation.js";
const router = Router();

router.get("/add", validation(validator.add), asyncHandler(postController.add));
router.delete(
  "/delete/:postId",
  validation(validator.remove),
  asyncHandler(postController.deletePost)
);
router.put(
  "/update/:postId",
  validation(validator.update),
  asyncHandler(postController.update)
);
router.get(
  "/all",
  validation(validator.getAllPosts),
  asyncHandler(postController.getAllPosts)
);
router.post(
  "/allWithUser",
  validation(validator.getAllPosts),
  asyncHandler(postController.getAllPostsWithUsers)
);
router.get(
  "/sortDes",
  validation(validator.getAllPosts),
  asyncHandler(postController.sortDescending)
);

export default router;
