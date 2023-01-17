//----------GOOGLE----------------------------------------------------------------------
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

//Put these in env----
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
//------

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //CHANGE TO HEROKU----------
    callbackURL: "http://localhost:3001/google/callback",
    passReqToCallback: true,
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function(user, done) {
  done(null, user)
});
//----------GOOGLE----------------------------------------------------------------------

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};


module.exports = withAuth;
