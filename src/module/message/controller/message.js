import { StatusCodes } from "http-status-codes";
import messageModel from "../../../../DB/model/Message.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { ErrorClass } from "../../../utils/ErrorClass.js";

export const add = async (req, res, next) => {
  const checkUser = await userModel.findById(req.body.userId);
  if (!checkUser)
    return next(new ErrorClass("invalid user id", StatusCodes.NOT_FOUND));

  const message = await messageModel.create(req.body);
  await userModel.findOneAndUpdate(
    { _id: req.body.userId },
    { $push: { message: message._id } },
    { new: true }
  );
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", message });
};

export const deleteMessage = async (req, res, next) => {
  const { messageId } = req.params;
  const { userId } = req.body;

  const user = await userModel.findByIdAndUpdate(userId, {
    $pull: { message: messageId },
  });
  if (!user)
    return next(new ErrorClass("invalid user id", StatusCodes.NOT_FOUND));

  const message = await messageModel.findOneAndDelete({
    _id: messageId,
    userId: userId,
  });
  if (!message)
    return next(
      new ErrorClass(
        "invalid message id or you don't have permission",
        StatusCodes.NOT_FOUND
      )
    );
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", message });
};

export const update = async (req, res, next) => {
  const { messageId } = req.params;
  const { title, content, userId } = req.body;
  const user = await userModel.findById(userId);
  if (!user)
    return next(new ErrorClass("invalid user id", StatusCodes.NOT_FOUND));

  const message = await messageModel.findOneAndUpdate(
    {
      _id: messageId,
      userId: userId,
    },
    { title, content },
    { new: true }
  );
  if (!message)
    return next(new ErrorClass("invalid user id", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", message });
};

export const getAllMessages = async (req, res, next) => {
  const messages = await messageModel.find();
  if (!messages.length)
    return next(new ErrorClass("no exist messages", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", messages });
};

export const getAllMessagesWithUsers = async (req, res, next) => {
  const messages = await messageModel.find().populate([
    {
      path: "userId",
    },
  ]);
  if (!messages.length)
    return next(new ErrorClass("no exist messages", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", messages });
};

export const sortDescending = async (req, res, next) => {
  const messages = await messageModel.find().sort({ createdAt: -1 });
  if (!messages.length)
    return next(new ErrorClass("no exist messages", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", messages });
};
