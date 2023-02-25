const express = require("express");

const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const path = require("path");
const allRoutes = require("./routes/index");
require("dotenv").config();
const app = express();
app.use(express.json({ extended: true /*limit: "30mb"*/ }));
app.use(express.urlencoded({ extended: false /*limit: "30mb"*/ }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//HAS_AN_ERROR_CHECKOUT B4 UNCOMMENTING
app.use(
  cookieSession({
    maxAge: 5 * 24 * 60 ** 60 * 60,
    keys: [process.env.SESSION_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use("/assets", express.static(path.join(__dirname, "public", "assets")));
//STORAGE.CONFIG
//STORAGE.CONFIG
//ROUTES....

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "index.html"));
});

app.use(allRoutes);

module.exports = app;
