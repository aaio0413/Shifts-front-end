const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //option for strategy
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: "https://shiftz-jp.herokuapp.com/auth/google/redirect" //this exact path for deployment
      callbackURL: "/auth/google/redirect" //this is for local
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      //   console.log("callback is fired");
      //   console.log("where is ID?", profile);
      //check if user is already in our database

      User.findOne({ googleId: profile.id }).then(userExsist => {
        if (userExsist) {
          console.log("user found", userExsist);
          done(null, userExsist);
        } else {
          new User({
            userName: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
