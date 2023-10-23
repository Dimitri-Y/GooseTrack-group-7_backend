import { Schema, model } from "mongoose";
import { handlleSaveError } from "../hooks.js";
import defaultDateString from "../../helpers/defaultDate.js";

const taskSchema = Schema(
  {
    title: {
      type: String,
      maxlength: 250,
      required: true,
    },
    start: {
      type: String,
      default: "09:00",
      match: /^\d{2}:\d{2}$/,
      required: true,
    },
    end: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\d{2}:\d{2}$/.test(value) && value > this.start;
        },
        message: "End time must be in HH:mm format and greater than start time",
      },
      default: "23:00",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      required: true,
    },
    date: {
      type: String,
      default: defaultDateString,
      match: /^\d{4}-\d{2}-\d{2}$/,
      required: true,
    },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      default: "to-do",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post("save", handlleSaveError);

const Task = model("task", taskSchema);

export default Task;
