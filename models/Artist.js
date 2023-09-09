const { model, Schema } = require("mongoose");
const Track = require("./Track");


const artistSchema = new Schema({
  name: String,
  image: String,
  description: String,
  genre: String,
  createdTracks: {
    type: Schema.Types.ObjectId,
    ref: 'Track'
  }
});


module.exports = model('Artist', artistSchema);
