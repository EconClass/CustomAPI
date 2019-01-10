const unirest = require('unirest'),
    Deck = require('../models/deck.js'),
    User = require('../models/user.js');

module.exports = (app) => {
    //=============ADD CARD=============\\
    app.post();
    //=============SEE CARD=============\\
    app.get();
    //=============REMOVE CARD=============\\
    app.delete();
};