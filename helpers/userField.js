const userField = (user) => {
  user.password = undefined;
  return user;
};

export default userField;
