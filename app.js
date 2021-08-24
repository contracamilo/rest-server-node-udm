require("dotenv").config();
const { Server } = require("./models");

const server = new Server();

// server.routes;
server.listen();
