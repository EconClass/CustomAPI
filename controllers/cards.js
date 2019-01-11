const unirest = require('unirest'),
    Deck = require('../models/deck.js'),
    Card = require('../models/card.js'),
    KEY = process.env.APIKEY;

module.exports = (app) => {

    //=============ADD CARD=============\\
    app.post('/user/deck/:id/card/:cardName', (req, res) => {
        let dId = req.params.id;
        Deck.findOne({_id: dId})
        .exec(function (err, deck) {
            unirest.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/${req.params.cardName}`)
            .header("X-Mashape-Key", KEY)
            .header("Accept", "application/json")
            .end(function (result) {
                let info = result.body
                let card = new Card({
                    name: info.name,
                    attack: info.attack,
                    health: info.health,
                    cost: info.cost,
                    description: info.text,
                    imgurl: info.img,

                });
                deck.cards.unshift(card);
                deck.save();
                return res.redirect(`/user/decks/${dId}`)
            });
        }).catch((err) => {
            console.log(err);
        });
    });

    //=============SEE A CARD=============\\
    app.get('/user/cards/:cardName', (req, res) => {
        unirest.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/${req.params.cardName}`)
        .header("X-Mashape-Key", KEY)
        .header("Accept", "application/json")
        .end(function (result) {
            res.send(result.body);
        });
    });

    //=============REMOVE CARD=============\\
    app.delete('/user/deck/:id/card/:cardName', (req, res) => {
        let dId = req.params.id;
        Deck.findOne({_id: dId})
        .then(deck => {
            Card.findOneAndDelete({name: req.params.cardName})
            .then(card => {
                res.redirect(`/user/deck/${dId}`)
            });
        }).catch((err) => {
            console.log(err);
        });
    });
};