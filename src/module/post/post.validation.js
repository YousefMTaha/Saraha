import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const add = {
  body: Joi.object({
    title: Joi.string().max(50).required(),
    content: Joi.string().max(1000).required(),
    userId: generalFields.id.required(),
  }).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required(),
};

export const update = {
  body: Joi.object({
    title: Joi.string().max(50),
    content: Joi.string().max(1000),
    userId: generalFields.id.required(),
  }).required(),
  params: Joi.object({
    postId: generalFields.id.required(),
  }).required(),
  query: Joi.object({}).required(),
};

export const remove = {
  body: Joi.object({
    userId: generalFields.id.required(),
  }).required(),
  params: Joi.object({
    postId: generalFields.id.required(),
  }).required(),
  query: Joi.object({}).required(),
};

export const getAllPosts = {
  body: Joi.object({}).required(),
  params: Joi.object({}).required(),
  query: Joi.object({}).required(),
};
