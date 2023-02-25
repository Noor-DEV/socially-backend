const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const secret = process.env.JWT_SECRET;
const User = require("../models/User");

const MY_JWT_STRATEGY = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  },
  (jwtPayload, done) => {
    const { _id } = jwtPayload;
    User.findById(_id)
      .then((user) => {
        if (!user) {
          return done(null, null);
        }
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  }
);

passport.use(MY_JWT_STRATEGY);
