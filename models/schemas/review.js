import { Schema, model } from "mongoose";
import Joi from "joi";
import { handlleSaveError } from "../hooks.js";

const reviewSchema = new Schema(
  {

    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
reviewSchema.post("save", handlleSaveError);

export const addSchema = Joi.object({
  comment: Joi.string().required(),
  rating: Joi.number().required(),
});

export const changeSchema = Joi.object({
  comment: Joi.string(),
  rating: Joi.number(),
}).or("comment", "rating");

export const Review = model("review", reviewSchema);
