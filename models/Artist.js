const { model, Schema } = require("mongoose");

const artistSchema = new Schema({
  name: String,
  image: String,
  description: String,
  genre: String,
  tracksId: [String],
  albumsId: [String],
});


module.exports = model('Artist', artistSchema);
