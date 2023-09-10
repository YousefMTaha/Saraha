import { idValidator, validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import * as userController from "../user/controller/user.js";
import * as validator from "./user.validation.js";
import { Router } from "express";
const router = Router();

router.post(
  "/signup",
  validation(validator.signup),
  asyncHandler(userController.signup)
);
router.post(
  "/signin",
  validation(validator.login),
  asyncHandler(userController.signin)
);
router.put(
  "/update/:_id",
  validation(validator.update),
  asyncHandler(userController.update)
);
router.delete(
  "/delete/:id",
  validation(idValidator),
  asyncHandler(userController.deleteUser)
);
router.post(
  "/search1",
  validation(validator.search1),
  asyncHandler(userController.search1)
);
router.post(
  "/search2",
  validation(validator.search2),
  asyncHandler(userController.search2)
);
router.post(
  "/all",
  validation(validator.getAllUser),
  asyncHandler(userController.getAllUser)
);
router.post(
  "/profile/:id",
  validation(idValidator),
  asyncHandler(userController.getProfile)
);
export default router;
