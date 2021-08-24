const userSchemaValidations = {
  name: {
    isEmpty: false,
    errorMessage: "Name is required",
  },
  password: {
    isEmpty: false,
    isLength: {
      options: { min: 6 },
      errorMessage: "Password should be at least 6 chars long",
    },
  },
  /*// 
  email: {
    isEmail: true,
    errorMessage: "must be a valid email",
  }, */
  /*// code of reference roles will be validated against the DB
  role: {
    isIn: {
      options: [["USER_ROLE", "ADMIN_ROLE"]],
    },
    errorMessage: "invalid role",
  },*/
};

module.exports = {
  userSchemaValidations,
};
