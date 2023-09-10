import { validation } from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import * as messageController from "./controller/message.js";
import { Router } from "express";
import * as validator from "./message.validation.js";
const router = Router();

router.get("/add", validation(validator.add), asyncHandler(messageController.add));
router.delete(
  "/delete/:messageId",
  validation(validator.remove),
  asyncHandler(messageController.deleteMessage)
);
router.put(
  "/update/:messageId",
  validation(validator.update),
  asyncHandler(messageController.update)
);
router.get(
  "/all",
  validation(validator.getAllMessages),
  asyncHandler(messageController.getAllMessages)
);
router.post(
  "/allWithUser",
  validation(validator.getAllMessages),
  asyncHandler(messageController.getAllMessagesWithUsers)
);
router.get(
  "/sortDes",
  validation(validator.getAllMessages),
  asyncHandler(messageController.sortDescending)
);

export default router;
