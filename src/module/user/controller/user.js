import { StatusCodes } from "http-status-codes";
import userModule from "../../../../DB/model/User.model.js";
import { ErrorClass } from "../../../utils/ErrorClass.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { userName, email, phone, password } = req.body;

  let checkUser = await userModule.findOne({ userName });
  if (checkUser)
    return next(new ErrorClass("userName already exist", StatusCodes.CONFLICT));

  checkUser = await userModule.findOne({ email });
  if (checkUser)
    return next(new ErrorClass("email already exist", StatusCodes.CONFLICT));

  checkUser = await userModule.findOne({ phone });
  if (checkUser)
    return next(new ErrorClass("phone already exist", StatusCodes.CONFLICT));

  const hashedPassword = bcryptjs.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );

  const user = await userModule.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName,
    email,
    phone,
    password: hashedPassword,
    gander: req.body.gander,
    age: req.body.age,
  });
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", user });
};

export const signin = async (req, res, next) => {
  const { userName, email, password, phone } = req.body;

  const user = await userModule.findOne({
    $or: [{ userName }, { email }, { phone }],
  });

  if (!user)
    return next(new ErrorClass("wrong information", StatusCodes.NOT_FOUND));
  const checkPassword = bcryptjs.compareSync(password, user.password);

  if (!checkPassword)
    return next(new ErrorClass("wrong information", StatusCodes.NOT_FOUND));

  return res.status(StatusCodes.ACCEPTED).json({
    message: `welcome ${user.firstName} ${user.lastName}`,
    user,
  });
};

export const update = async (req, res, next) => {
  const { _id } = req.params;
  const checkUser = await userModule.findById(_id);
  if (!checkUser)
    return next(new ErrorClass("invalid id", StatusCodes.NOT_FOUND));

  const { firstName, lastName, age } = req.body;
  await userModule.updateOne({ _id }, { firstName, lastName, age });
  return res.status(StatusCodes.ACCEPTED).json({ message: "done" });
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await userModule.deleteOne({ _id: id });
  return !user.deletedCount
    ? next(new ErrorClass("invalid id", StatusCodes.NOT_FOUND))
    : res.status(StatusCodes.ACCEPTED).json({ message: "done" });
};

//search for user where his name start with "X" and age less than Y => using like for characters
export const search1 = async (req, res, next) => {
  const { age, char } = req.query;
  const charInRegex = new RegExp("^" + char, "i");
  const user = await userModule.find({
    age: { $lt: age },
    userName: { $regex: charInRegex },
  });
  return !user.length
    ? next(new ErrorClass("no users matched"))
    : res.status(StatusCodes.ACCEPTED).json({ message: "done", user });
};

//search for user where his age is between X and Y
export const search2 = async (req, res, next) => {
  const { minAge, maxAge } = req.query;
  const user = await userModule.find({
    age: { $gt: minAge, $lt: maxAge },
  });
  return !user.length
    ? next(new ErrorClass("no users matched"))
    : res.status(StatusCodes.ACCEPTED).json({ message: "done", user });
};

export const getAllUser = async (req, res, next) => {
  const users = await userModule.find();

  return !users.length
    ? next(new ErrorClass("no data matched", StatusCodes.NOT_FOUND))
    : res.status(StatusCodes.ACCEPTED).json({ message: "done", users });
};

export const getProfile = async (req, res, next) => {
  const { id } = req.params;
  const user = await userModule.findById(id).populate([
    {
      path: "message",
    },
  ]);

  return !user
    ? next(new ErrorClass("user ID not found", StatusCodes.NOT_FOUND))
    : res.status(StatusCodes.ACCEPTED).json({ message: "done", user });
};
