import Joi from "joi";
import { Types } from "mongoose";
import { StatusCodes } from "http-status-codes";

const validateObjectId = (value, helper) =>
  Types.ObjectId.isValid(value) ? true : helper.message("In-valid objectId");

export const generalFields = {
  name: Joi.string().min(3).max(20),
  password: Joi.string().regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  ),
  id: Joi.string().custom(validateObjectId),
  email: Joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments: 4,
    tlds: { allow: ["com", "net"] },
  }),
};

export const idValidator = {
  body: Joi.object({}).required(),
  params: Joi.object({
    id: generalFields.id.required(),
  }).required(),
  query: Joi.object({}).required(),
};

export const validation = (schema) => {
  return (req, res, next) => {
    const validateFields = ["body", "query", "params"];
    const validateError = [];
    let validationResult;
    for (const field of validateFields) {
      validationResult = schema[field].validate(req[field], {
        abortEarly: false,
      });
      if (validationResult.error) {
        validateError.push(validationResult.error);
      }
    }
    if (validateError.length)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "validation error", ...validateError });
    next();
  };
};
