const Post = require("../../models/Post");
const User = require("../../models/User");
const { uploadImg } = require("../../config/imgUpload");

//CREATE
module.exports.createPost = async (req, res) => {
  try {
    const { user_id, description } = req.body;
    console.log(req.file, ":.............req.file..................:");
    const [err, uploadedImg] = await uploadImg(req.file.path);
    if (err) {
      return res.json({ msg: "ERROR UPLOADING IMG 2 CLOUDINARY....." });
    }

    const user = await User.findOne({ _id: user_id });

    const newPost = new Post({
      user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      location: user.location,
      description,
      user_picture_path: user.picture_path,
      picture_path: uploadedImg.secure_url,
      // likes: {},
      // comments: {},
    });
    await newPost.save();

    const posts = await Post.find();
    res.status(201).json({ amount: posts.length, posts });
  } catch (err) {
    console.log(err, "-------err-creating-post---------");
    res.status(409).json({
      msg: err.message,
      clue: "conflict status: error creating post.....",
    });
  }
};
//READ
module.exports.getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({ amount: posts.length, posts: posts });
  } catch (err) {
    res
      .status(500)
      .json({ msg: err.message, clue: "Error getting Feed Posts" });
  }
};
module.exports.getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const userPosts = await Post.find({ user_id: userId });
    res.status(200).json({ posts: userPosts });
  } catch (err) {
    res
      .status(500)
      .json({ msg: err.message, clue: "Error getting posts for the user" });
  }
};
module.exports.getPost = (req, res) => {};

//UPDATE
module.exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { user_id } = req.body;

  try {
    const post = await Post.findById(postId);

    const isLiked = post.likes.get(user_id);

    if (isLiked) {
      post.likes.delete(user_id);
    } else {
      post.likes.set(user_id, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json({ updatedPost });
  } catch (err) {
    res
      .status(500)
      .json({ msg: err.message, clue: "Error getting posts for the user" });
  }
};

// module.exports.removePost = (req, res) => {};
// module.exports.updatePost = (req, res) => {};
