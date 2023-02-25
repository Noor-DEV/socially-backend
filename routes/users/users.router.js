const router = require("express").Router();
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAllUsers,
} = require("./users.controller");
const { getUserPosts } = require("../posts/posts.controller");
const { isUserAuthenticated } = require("../../middleware/permissions.auth");

//READ ROUTES
router.get("/", getAllUsers);
router.get("/:userId", isUserAuthenticated, getUser);
router.get("/:userId/friends", isUserAuthenticated, getUserFriends);
router.get("/:userId/posts", isUserAuthenticated, getUserPosts);

//WRITE ROUTES
router.patch("/:userId/:friendId/", isUserAuthenticated, addRemoveFriend);
module.exports = router;
