const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model.js");

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
      //   console.log("callback is fired");
      //   console.log("where is ID?", profile);
      //check if user is already in our database

      User.findOne({ googleId: profile.id }).then(userExsist => {
        if (userExsist) {
          console.log("user found", userExsist);
        } else {
          new User({
            userName: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created", newUser);
            });
        }
      });
    }
  )
);
