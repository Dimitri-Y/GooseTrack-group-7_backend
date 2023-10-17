import { Schema, model } from 'mongoose';
import { handlleSaveError } from './hooks.js';

const taskSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 250,
    },
    start: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
    end: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^\d{2}:\d{2}$/.test(value) && value > this.start;
        },
        message: 'End time must be in HH:mm format and greater than start time',
      },
    },
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    category: {
      type: String,
      required: true,
      enum: ['to-do', 'in-progress', 'done'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post('save', handlleSaveError);

const Task = model('task', taskSchema);

export default Task;
