const unirest = require('unirest'),
    Deck = require('../models/deck.js'),
    User = require('../models/user.js'),
    Card = require('../models/card.js');

module.exports = (app) => {
    
    //=============CREATE DECK=============\\
    app.post('/user/deck', (req, res) => {
        if (req.user) {
            let deck = new Deck;

            deck.save()
            .then((deck) => {
                return User.find({_id: req.user._id})
            })
            .then((user) =>{
                user.decks.unshift(deck);
                user.save();
                res.redirect('/user')
            })
            .catch((err) => {
                console.log(err)
            });
        };
    });
    //=============VIEW DECK=============\\
    app.get();
    //=============DELETE DECK=============\\
    app.delete();
};