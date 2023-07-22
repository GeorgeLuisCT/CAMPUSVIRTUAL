const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const pasport = require('passport');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');


handlebars.registerHelper('ifEqual', function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

//Initializations
const app = express();
require('./config/passport');

//Setings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: [
    path.join(app.get('views'), 'partials')
  ],
  extname: '.hbs',
  helpers: {
    eq: function (a, b) {
      return a === b;
    }
  }
}).engine);

app.set('view engine', '.hbs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

//Midleawars
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(pasport.initialize());
app.use(pasport.session());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Define una variable global para la ruta actual
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});


//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/menu.routes'))

app.use((req, res, next) => {
  res.status(404).send('La página solicitada no existe');
});


module.exports = app;
