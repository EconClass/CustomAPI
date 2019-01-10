const unirest = require('unirest'),
    Deck = require('../models/deck.js'),
    User = require('../models/user.js');

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
        } else {
            return res.status(401);
        };
    });

    //=============VIEW DECK=============\\
    app.get('/user/deck/:id', (req, res) => {
        Deck.findOne({_id: req.params.id})
        .then((deck) => {
            res.send(deck)
        })
        .catch((err) => {
            console.log(err)
        });
    });
    
    //=============DELETE DECK=============\\
    app.delete('/user/deck/:id', (req, res) => {
        Deck.findOneAndDelete({_id: req.params.id})
        .then((deck) => {
            res.redirect('/user');
        })
        .catch((err) => {
            console.log(err)
        });
    });
};