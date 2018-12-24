const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      //option for strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      console.log("callback is fired");
    }
  )
);
