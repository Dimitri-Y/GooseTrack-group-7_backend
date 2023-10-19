const userField = (user) => {
  currentUser.password = undefined;
  currentUser.token = undefined;
//   currentUser.verificationToken = undefined;

  return user;
};

export default userField;
