const router = require("express").Router();
const { upload } = require("../../config/imgUpload");
const { isUserAuthenticated } = require("../../middleware/permissions.auth");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  getPost,
} = require("./posts.controller");

router.get("/", isUserAuthenticated, getFeedPosts); //............................................................
// router.get("/:userId/", verifyToken, getUserPosts); //MOVED_TO_USER_ROUTES -- it kinda is user specific

// router.get("/:postId", getPost);

// WRITE ROUTES
router.post("/", upload.single("picture"), isUserAuthenticated, createPost); //..............................

// router.delete("/:postId", verifyToken, removePost);
// router.patch("/:postId", upload.single("post"), verifyToken, updatePost);

router.patch("/:postId/like", isUserAuthenticated, likePost); //..................

module.exports = router;
