const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

let server;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
// mongoose.connect(config.mongoose.url, {useNewUrlParser: true,useUnifiedTopology: true});
// app.listen(config.port,()=>logger.info(`Server started at ${config.port}`));

mongoose.connect(config.mongoose.url, config.mongoose.options).then(()=>{
  logger.info("Connect to MongoDB");
  server = app.listen(config.port, ()=>{
    logger.info(`Listening to port ${config.port}`);
  });
});

// ------------- Don't Modify  -------------
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
