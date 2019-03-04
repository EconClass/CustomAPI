//=================================INITIAL=================================\\
if (!process.env.PORT) {
    require('dotenv').config()
    process.env.NODE_ENV = "dev"
}

const cookieParser = require('cookie-parser'),
    express = require('express'),
    app = express(),
    path = require('path'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    expressValidator = require('express-validator');

//=================================MIDDLEWARE=================================\\

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Cookie Parser
app.use(cookieParser());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add after body parser initialization!

// Method Override
app.use(methodOverride('_method'));

// Set db
require('./data/api-db.js');

// Controllers
require('./controllers/auth.js')(app);
require('./controllers/decks.js')(app);
require('./controllers/cards.js')(app);

// Port
app.listen(port);