import { Schema, model } from 'mongoose';

const tasksSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    progress: {
      type: String,
      required: true,
    },
    importance: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model('task', tasksSchema);

export default Task;
