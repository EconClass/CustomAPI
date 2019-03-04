"use strict";

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = {
  limit: 3 // how many records on each page
};

const DeckSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  deckname: {type: String, required: true},
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }]
},
{ timestamps: true });

DeckSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Deck", DeckSchema);