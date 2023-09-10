import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signup = {
  body: Joi.object({
    userName: generalFields.name.required(),
    firstName: generalFields.name.required(),
    lastName: generalFields.name.required(),
    password: generalFields.password.required(),
    email: generalFields.email.required(),
    phone: Joi.string().required(),
    gander: Joi.string().valid("Male", "Female"),
    age: Joi.number().min(8).max(80),
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required(),
};

export const login = {
  body: Joi.object({
    userName: generalFields.name,
    email: generalFields.email,
    phone: Joi.string(),
    password: generalFields.password.required(),
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required(),
};

export const update = {
  body: Joi.object({
    firstName: generalFields.name,
    lastName: generalFields.name,
    age: Joi.number().min(8).max(80),
  }).required(),
  params: Joi.object({
    _id: generalFields.id.required(),
  }).required(),
  query: Joi.object({}).required(),
};

export const search1 = {
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({
    age: Joi.number(),
    char: Joi.string(),
  }).required(),
};

export const search2 = {
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({
    minAge: Joi.number(),
    maxAge: Joi.number(),
  }).required(),
};

export const getAllUser = {
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required(),
};
