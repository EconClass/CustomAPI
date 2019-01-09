const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    adress: { type: String, required: true},
    photoRef: { type: String, required: true},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model("Place", PlaceSchema);