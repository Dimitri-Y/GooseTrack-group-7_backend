import HttpError from './httpError.js';

const taskEndValidate = (start, end) => {
  if (start < end) {
    return HttpError(412);
  }
};

export default taskEndValidate;
