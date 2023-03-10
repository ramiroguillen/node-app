const { ORIGIN } = require("./env.config");

const corsConfig = {
  allowedHeaders: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  origin: ORIGIN,
};

module.exports = corsConfig;
