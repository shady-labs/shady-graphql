const { model, Schema } = require("mongoose");

const artistSchema = new Schema({
  name: String,
  image: String,
  description: String,
  genre: String,
});

artistSchema.index({ name: 'text' });
artistSchema.index({ '$**': 'text'});

module.exports = model('Artist', artistSchema);
