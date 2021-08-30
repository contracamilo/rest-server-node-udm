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
};

const categorySchemaValidations = {
  name: {
    isEmpty: false,
    errorMessage: "Name is required",
  },
};

module.exports = {
  userSchemaValidations,
  categorySchemaValidations,
};
