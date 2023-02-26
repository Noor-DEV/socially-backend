const User = require("../models/User");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const verifyCb = async (accessToken, refreshToken, profile, done) => {
  console.log(profile, ".....................profile................");
  if (!profile) {
    console.log("NO_PROFILE_TO_USE_WAS_PASSED");
    return;
  }
  const foundUser = await User.findOne({ google_id: profile.id }).catch(
    (err) => {
      console.log(
        err,
        "......error querying db to find user...hence other functionalities are blocked...."
      );
      done(err, null);
    }
  );
  if (!foundUser) {
    const extractedUser = {
      google_id: profile.id,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile.emails[0].value,
      picture_path: profile.photos[0].value,
      //   friends: null, //NOT SURE HOW TO DO IT
      location: null,
      occupation: null,
      viewed_profile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    };
    const createdUser = await User.create(extractedUser).catch((err) => {
      console.log(err, "........error creating user..........");
      done(err, null);
    });
    done(null, createdUser);
  } else {
    done(null, foundUser);
  }
};

const passportGoogleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  verifyCb
);
passport.use(passportGoogleStrategy);

passport.serializeUser((user, done) => {
  console.log(
    "SERIALIZED....................",
    user._id,
    "-------------",
    user
  );
  return done(null, user._id);
});

passport.deserializeUser(async (user_id, done) => {
  User.findById(user_id)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
    })
    .catch((err) => {
      console.log(".........error desiUser........", err);
      return done(err, null);
    });
});
