
const Express = require("express");

const APP = Express();
const ROOT_PATH = process.cwd();

APP.use("/", Express.static(ROOT_PATH + "/dist/", {
  maxAge: "1y",
}));

APP.listen(process.env.PORT || 8081);
