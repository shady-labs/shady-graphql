const { model, Schema } = require("mongoose");


const albumSchema = new Schema({
  name: String,
  albumArt: String,
  tracks:[String],
  tracksId: [String],
  artistsId: [String],
  genre: String,
});


module.exports = model("Album", albumSchema);
