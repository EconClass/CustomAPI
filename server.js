//=================================INITIAL=================================\\
require('dotenv').config();
const cookieParser = require('cookie-parser'),
    express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    expressValidator = require('express-validator');

//=================================MIDDLEWARE=================================\\

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