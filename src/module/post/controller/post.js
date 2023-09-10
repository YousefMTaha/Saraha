import { StatusCodes } from "http-status-codes";
import postModel from "../../../../DB/model/post.model.js";
import userModel from "../../../../DB/model/user.model.js";
import { ErrorClass } from "../../../utils/ErrorClass.js";

export const add = async (req, res, next) => {
  const checkUser = await userModel.findById(req.body.userId);
  if (!checkUser)
    return next(new ErrorClass("invalid user id", StatusCodes.NOT_FOUND));

  const post = await postModel.create(req.body);
  await userModel.findOneAndUpdate(
    { _id: req.body.userId },
    { $push: { post: post._id } },
    { new: true }
  );
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", post });
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const user = await userModel.findByIdAndUpdate(userId, {
    $pull: { post: postId },
  });
  if (!user)
    return next(new ErrorClass("invalid user id", StatusCodes.NOT_FOUND));

  const post = await postModel.findOneAndDelete({
    _id: postId,
    userId: userId,
  });
  if (!post)
    return next(
      new ErrorClass(
        "invalid post id or you don't have permission",
        StatusCodes.NOT_FOUND
      )
    );
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", post });
};

export const update = async (req, res, next) => {
  const { postId } = req.params;
  const { title, content, userId } = req.body;
  const user = await userModel.findById(userId);
  if (!user)
    return next(new ErrorClass("invalid user id", StatusCodes.NOT_FOUND));

  const post = await postModel.findOneAndUpdate(
    {
      _id: postId,
      userId: userId,
    },
    { title, content },
    { new: true }
  );
  if (!post)
    return next(new ErrorClass("invalid user id", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", post });
};

export const getAllPosts = async (req, res, next) => {
  const posts = await postModel.find();
  if (!posts.length)
    return next(new ErrorClass("no exist posts", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", posts });
};

export const getAllPostsWithUsers = async (req, res, next) => {
  const posts = await postModel.find().populate([
    {
      path: "userId",
    },
  ]);
  if (!posts.length)
    return next(new ErrorClass("no exist posts", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", posts });
};

export const sortDescending = async (req, res, next) => {
  const posts = await postModel.find().sort({ createdAt: -1 });
  if (!posts.length)
    return next(new ErrorClass("no exist posts", StatusCodes.NOT_FOUND));
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", posts });
};
