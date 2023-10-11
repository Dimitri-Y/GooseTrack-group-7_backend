const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(Error(error.message));
    }
    next();
  };

  return func;
};

module.exports = { validateBody };
