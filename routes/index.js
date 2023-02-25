const router = require("express").Router();
const passport = require("passport");
const authRoutes = require("./auth/auth.router");
const userRoutes = require("./users/users.router");
const postRoutes = require("./posts/posts.router");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/permissions.auth");
const { extractFriends, formatOutPut } = require("../utils/utils");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://socially-backend.onrender.com/login/no",
    successRedirect: "https://socially-noor-dev.vercel.app/",
    authInfo: true,
  })
  // async (req, res) => {
  //   const token = await jwt.sign(
  //     { sub: req.user._id, iat: Date.now(), email: req.user.email },
  //     process.env.JWT_SECRET
  //   );
  //   const extractedFriends = await extractFriends(req.user.friends);
  //   res.status(201).json({
  //     token,
  //     user: { ...formatOutPut(req.user), friends: extractedFriends },
  //   });
  // }
);
router.get("/login/no", (req, res) => {
  res.json({ msg: "LOGIN WITH GOOGLE FAILED" });
});
router.get("/login/ok", (req, res) => {
  console.log(req.user, ".................req.user..............");
  res.json({
    msg: "LOGIN_WITH_GOOGLE_SUCCEEDED",
    user: req.user || "NO_USER_2_DISPLAY",
  });
});
router.get("/isAuth", (req, res) => {
  if (req.user && req.isAuthenticated()) {
    return res.json({ msg: "AUTHENTICATED", isAuth: true, user: req.user });
  }
  return res.json({ isAuth: false, user: null });
});
module.exports = router;
