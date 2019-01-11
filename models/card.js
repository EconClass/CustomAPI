const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    name: { type: String, required: true },
    attack: Number,
    health: Number,
    cost: { type: Number, required: true },
    description: { type: String, required: true },
    imgurl: { type: String, required: true },
    amount: { type: Number, required: true }
});

module.exports = mongoose.model("Card", CardSchema);