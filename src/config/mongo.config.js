const { connect } = require("mongoose");
const { DB_HOST, DB_PORT, DB_NAME, DB_CNN } = require("./env.config");

const configConnection = {
  url: DB_CNN ?? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const mongoDBconnection = async () => {
  try {
    await connect(configConnection.url, configConnection.options);
    console.log(`* ~ file: mongo.config.js:15 ~ mongoDBconnection ~ URL: ${configConnection.url.substring(0, 25)}`);
  } catch (error) {
    console.log("* ~ file: mongo.config.js:17 ~ mongoDBconnection ~ error:", error);
    throw new Error(error);
  }
};

module.exports = {
  configConnection,
  mongoDBconnection,
};
