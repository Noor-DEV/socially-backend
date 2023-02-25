const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const verifyCb = async (username, password, done) => {
  console.log(username, password, "......received.data..........");

  const foundUser = await User.findOne({ email: username }).catch((err) => {
    console.log(err, ".......error finding user....");
    done(err, null);
  });

  if (!foundUser) {
    console.log("user_NON_EXITENT...........");
    done(null, null);
  }
  //PASTED........

  const isMatch = await bcrypt
    .compare(password, foundUser.password)
    .catch((err) => {
      console.log(err, ".........error_IN_BCRYPT_COMPARE.........");
    });

  if (!isMatch) {
    console.log("Pwds DONT_MATCH.........");
    return done(null, null);
  }
  return done(null, foundUser);
  //   const extractedFriends = await extractFriends(user.friends);
  //   return res.status(200).json({
  //     token,
  //     user: {
  //       _id: user._id,
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       email: user.email,
  //       picture_path: user.picture_path,
  //       friends: extractedFriends,
  //       location: user.location,
  //       occupation: user.occupation,
  //       viewed_profile: user.viewed_profile,
  //       impressions: user.impressions,
  //     },
  //   });
  //PASTED........

  //   console.log({ email, password }, "OK..........");
};
passport.use(new LocalStrategy({ usernameField: "email" }, verifyCb));
