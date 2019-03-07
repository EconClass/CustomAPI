const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = { limit: 3 };

const DeckSchema = new Schema({
  deckname: String,
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }]
},
{ timestamps: true });

DeckSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Deck", DeckSchema);