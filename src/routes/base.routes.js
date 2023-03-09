const { Router } = require("express");

class BaseRoutes {
  path = "/";
  router = Router();

  constructor() {
    this.initBaseRoutes();
  }

  /* initBaseRoutes */
  initBaseRoutes() {
    this.router.get(`${this.path}`, (req, res) => {
      res.status(200).json({ ok: true, message: "Connected to API" });
    });
  }
}

module.exports = BaseRoutes;
