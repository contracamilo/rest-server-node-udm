const bcrypt = require("bcryptjs");

const encryptPass = (psw) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(psw, salt);
};

module.exports = {
  encryptPass,
};
