const { model, Schema } = require("mongoose");

const artistSchema = new Schema({
  name: String,
  image: String,
  description: String,
  genre: String,
  tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
});


module.exports = model('Artist', artistSchema);
