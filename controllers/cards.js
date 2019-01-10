const unirest = require('unirest'),
    Deck = require('../models/deck.js'),
    Card = require('../models/card.js'),
    KEY = process.env.APIKEY;

module.exports = (app) => {
    
    //=============ADD CARD=============\\
    app.post('/user/decks/:id/card/:cardName', (req, res) => {
        let dId = req.params.id;
        Deck.findOne({_id: dId})
        .exec(function (err, deck) {
            unirest.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/${req.params.cardName}`)
            .header("X-Mashape-Key", KEY)
            .header("Accept", "application/json")
            .end(function (result) {
                let info = result.body
                const card = new Card({
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
        });
    });
    //=============SEE CARD=============\\
    app.get();
    //=============REMOVE CARD=============\\
    app.delete();
};