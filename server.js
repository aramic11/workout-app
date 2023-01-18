const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
//------
require('./utils/auth');
//-------
const sequelize = require('./config/connection');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//------Middleware function
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
//-------
//have secret in env
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//-------------GOOGLE LOGIN-------------------------------------------------
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile']})
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure',
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate');
});


//-------------GOOGLE LOGIN------------------------------------------------------

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  // Ask for help on setting up secret
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//----
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
