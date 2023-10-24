import taskSchema from "../models/schemas/task-schema.js";

import validateBody from "../decorators/validateBody.js";

const addTaskValidate = validateBody(taskSchema);
const putTaskValidate = validateBody(taskSchema);
const patchTaskValidate = validateBody(taskSchema);

export default {
  addTaskValidate,
  putTaskValidate,
  patchTaskValidate,
};
