//=================================INITIAL=================================\\
require('dotenv').config();
const cookieParser = require('cookie-parser'),
    express = require('express'),
    app = express(),
    path = require('path'),
    exphbs = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: 'main',
    extname: 'hbs'
    }),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    expressValidator = require('express-validator');

//=================================MIDDLEWARE=================================\\

// Cookie Parser
app.use(cookieParser());

// Handlebars
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add after body parser initialization!

// Method Override
app.use(methodOverride('_method'));

// Set db
require('./data/api-db.js');

app.listen(port);