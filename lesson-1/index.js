require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const pino = require("pino-http");
const corsOptionsDelegate = require("./src/config/corsOptionsDelegate");
const {
  errorHandler,
  customErrorHandler,
} = require("./src/middleware/error-handler");
const authRoute = require("./src/routes/auth.route");

// initialize the http app from express
const app = express();

app.use(cors(corsOptionsDelegate));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  pino({
    level: process.env.LOG_LEVEL,
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  })
);
// use the static files
app.use(express.static(path.join(__dirname, "src", "public")));

// routes are defined here
app.use("/", require("./src/routes/root"));
app.use("/api/auth", authRoute);

// error handler middleware
app.use(errorHandler);

app.all("*", (req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "src", "views", "not-found.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for connection
    app.listen(process.env.PORT, () => {
      console.log(`process started on port ${process.env.PORT}`);
      // pino().logger.info(`process started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
