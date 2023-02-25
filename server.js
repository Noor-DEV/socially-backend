const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");

require("dotenv").config();

require("./SSO/passportGoogle");
require("./SSO/passportJwt");
const config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 8000,
};
const server = http.createServer(app);
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`LISTENING ON PORT:${config.PORT} -- UP&RUNING.......`);
    });
  });
