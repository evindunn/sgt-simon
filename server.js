const express = require("express");
const logger = require("morgan");
const path = require("path");

const port = process.env.PORT || 8080;
const app = express();

app.use(logger(process.env.NODE_ENV == "production" ? "tiny" : "dev"));
app.use("/", express.static(path.join(__dirname, "public")));

app.listen(port, () => { console.log("Listening on port " + port + "..."); });
