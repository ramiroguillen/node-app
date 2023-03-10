const express = require("express");
const cors = require("cors");
const displayRoutes = require("express-routemap");

const { API_VERSION, NODE_ENV, PORT } = require("./config/env.config");
const corsConfig = require("./config/cors.config");
const { mongoDBconnection } = require("./config/mongo.config");

class App {
  app;
  env;
  port;
  server;

  constructor(routes) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = Number(PORT) || 8080;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  /* Server */
  getServer() {
    return this.app;
  }

  closeServer(done) {
    this.server = this.app.listen(this.port, () => {
      done();
    });
  }

  /* connection To Database */
  async connectToDatabase() {
    await mongoDBconnection();
  }
  
  /* Middlewares */
  initializeMiddlewares() {
    this.app.use(cors(corsConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/static", express.static(`${__dirname}/public`));
  }

  /* Routes */
  initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(`/api/${API_VERSION}`, route.router);
    });
  }

  /* listen */
  listen() {
    this.app.listen(this.port, () => {
      displayRoutes(this.app);
      console.log(`* ~ Running on "${this.env}"`);
      console.log(`* ~ App listening on the port ${this.port}`);
    });
  }
}

module.exports = App;
