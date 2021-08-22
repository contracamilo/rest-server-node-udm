require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8081;

class Server {
  constructor() {
    this.app = express();
    this.port = port;
    this.usersPath = "/api/users";

    //middlewares
    this.middlewares();

    //app routes
    this.routes();
  }

  middlewares() {
    const { app } = this;

    //body read - parse
    app.use(express.json());

    app.use(cors());
    app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;