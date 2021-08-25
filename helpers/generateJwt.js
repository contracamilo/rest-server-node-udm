require("dotenv").config();
const jwt = require("jsonwebtoken");

const { PRIVATE_KEY } = process.env;

const generateJwt = async (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      PRIVATE_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("unable to generate a token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJwt,
};
