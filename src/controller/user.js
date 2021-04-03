const loginCheck = (username, password) => {
  if (username === "zssz" && password === "123") return true;
  return false;
};

module.exports = {
  loginCheck,
};
