const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Card = require('./models/card.js');

const DeckSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    cards: [Card.schema],
});

DeckSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

module.exports = mongoose.model("Deck", DeckSchema);