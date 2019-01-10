const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    name: { type: String, required: true },
    attack: { type: Number, required: true },
    health: { type: Number, required: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true },
    imgurl: { type: String, required: true },
});

module.exports = mongoose.model("Card", CardSchema);