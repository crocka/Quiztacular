// load .env data into process.env
require("dotenv").config();
const db = require("./lib/db.js");
const cookieSession = require('cookie-session');

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const apisRoutes = require("./routes/apis");
const quizRoutes = require("./routes/quizzes");
const resultRoutes = require("./routes/result");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/api", apisRoutes(db));
app.use("/quiz", quizRoutes(db));
app.use("/result", resultRoutes(db));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
