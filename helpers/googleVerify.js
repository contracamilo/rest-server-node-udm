require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

const { GOOGLE_CLIENT_ID } = process.env;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleVerify = async (idToken = "") => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });

  const { name, picture: img, email } = ticket.getPayload();

  return { name, img, email };
};

module.exports = { googleVerify };
