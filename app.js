const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

/// Swagger Documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

/// Morgan middleware(Logger)
app.use(morgan("tiny"));

/// Regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// Cookie and file middleware

app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

/// Import all routers here
const home = require("./routes/home");
const user = require("./routes/user");

/// Use router middleware
app.use("/api/v1", home);
app.use("/api/v1", user);

/// Export app js
module.exports = app;
