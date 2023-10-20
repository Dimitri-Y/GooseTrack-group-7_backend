const userField = (user) => {
  user.password = undefined;
  user.token = undefined;
  //   currentUser.verificationToken = undefined;
  console.log(user);
  return user;
};

export default userField;
