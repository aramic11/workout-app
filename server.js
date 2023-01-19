const express = require('express');
const path = require('path');
const routes = require('./controllers');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// import sequelize connection

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3005;
const app = express();

const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Cookies',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10, 
    expiration: 1000 * 60 * 30 
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Used to call information from the database
app.use(routes);
app.use(express.static(path.join(__dirname, '/public')));

sequelize.sync().then(() => {
  
    app.listen(PORT, () => {
      console.log(`App listening on http://localhost:${PORT}/`);
    });
  });
