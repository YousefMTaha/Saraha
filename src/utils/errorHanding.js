import { ErrorClass } from "./ErrorClass.js";

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((err) => {
      return next(new ErrorClass(err, 500));
    });
  };
};

export const globalErrorHandling = (error, req, res, next) => {
  return res.status(error.status || 500).json({
    message: "catch Error",
    errMsg: error.message,
  });
};
