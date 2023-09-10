const { model, Schema } = require("mongoose");

const artistSchema = new Schema({
  name: String,
  image: String,
  description: String,
  genre: String,
  tracksId: [{ type: Schema.Types.ObjectId, ref: "Track" }],
  tracksName: [{ type: Schema.Types.String, ref: "Track" }],
});


module.exports = model('Artist', artistSchema);
