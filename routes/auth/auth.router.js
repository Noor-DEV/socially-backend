const router = require("express").Router();
const passport = require("passport");
const { upload } = require("../../config/imgUpload.js");
const { register, login, logout } = require("./auth.controller");
router.post("/register", upload.single("picture"), register);
router.post("/login", login);
router.get("/logout", logout);
module.exports = router;
