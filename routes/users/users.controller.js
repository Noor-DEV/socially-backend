const Post = require("../../models/Post");
const User = require("../../models/User");
const { extractFriends, formatOutPut } = require("../../utils/utils");

module.exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ msg: "USER DOES NOT EXIST" });
   
    const posts = await Post.find({ user_id: userId });
    res.status(200).json({
      user: {
        ...formatOutPut(user),
        friends: await extractFriends(user.friends),
      },
      postsData: {
        amount_of_posts: posts.length,
        posts,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      fullError: err,
      msg: "ERROR GETTING SPECIFIC USER",
    });
  }
};
module.exports.getUserFriends = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId });
  const friends = await Promise.all(
    user.friends.map(async (id) => {
      return await User.findOne({ _id: id });
    })
  );
  res.json({ friends: formatOutPut(friends) });
};
module.exports.addRemoveFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  const user = await User.findOne({ _id: userId });
  let isFriend = user.friends.includes(friendId);
  if (isFriend) {
    user.friends = user.friends.filter((id) => id !== friendId);
  } else {
    user.friends.push(friendId);
  }
  await user.save();

  const friends = await extractFriends(user.friends);

  res.json({
    friends_data: {
      no_of_friends: friends.length,
      friends,
    },
    user: formatOutPut(user),
  });
};

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  console.log(users.length, "-----length--------");
  console.log(users, "...................users...................");
  res.json({
    amount: users.length,
    users: users.map((user) => ({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      picture_path: user.picture_path,
      friends: user.friends,
      location: user.location,
      occupation: user.occupation,
      viewed_profile: user.viewed_profile,
      impressions: user.impressions,
    })),
  });
};
