require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");
const fileUpload = require("express-fileupload");

const port = process.env.PORT || 8081;

class Server {
  constructor() {
    this.app = express();
    this.port = port;

    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      uploads: "/api/uploads",
      users: "/api/users",
    };

    //connect DB
    this.connectDB();

    //middlewares
    this.middlewares();

    //app routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    const { app } = this;

    //body read - parse
    app.use(express.json());

    app.use(cors());
    app.use(express.static("public"));

    // file upload
    app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    const { app, paths } = this;
    app.use(paths.auth, require("../routes/auth"));
    app.use(paths.categories, require("../routes/categories"));
    app.use(paths.products, require("../routes/products"));
    app.use(paths.search, require("../routes/search"));
    app.use(paths.uploads, require("../routes/upload"));
    app.use(paths.users, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
