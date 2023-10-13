import taskSchema from "../schemas/task-schema.js";

import validateBody from "../decorators/validateBody.js";

const addTaskValidate = validateBody(taskSchema.taskAddSchema);
const putTaskValidate = validateBody(taskSchema.taskPutSchema);
const patchTaskValidate = validateBody(taskSchema.taskUpdateSchema);

export default {
  addTaskValidate,
  putTaskValidate,
  patchTaskValidate,
};
