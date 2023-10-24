import { Schema, model } from "mongoose";
import Joi from "joi";
import { handlleSaveError } from "../hooks.js";

const reviewSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    comment: {
      type: String,
    },
    rating:{
      type: String,
    }
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post("save", handlleSaveError);

export const addSchema = Joi.object({
  name: Joi.string().required(),
  comment: Joi.string().required(),
});

export const changeSchema = Joi.object({
  name: Joi.string(),
  comment: Joi.string(),
}).or("name", "comment");

export const Review = model("review", reviewSchema);
