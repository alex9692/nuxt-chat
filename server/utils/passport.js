const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;

const { cookieExtractor } = require("./cookieExtractor");
const User = require("../models/user");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "secret"
    },
    async function(jwt_payload, done) {
      try {
        const user = await User.findById(jwt_payload.id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

module.exports.passport = passport;
