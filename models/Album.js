const { model, Schema } = require("mongoose");


const albumSchema = new Schema({
  name: String,
  albumArt: String,
  artists: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
  },
  tracks:{
    type: Schema.Types.ObjectId,
    ref: "Track"
  },
  genre: String,
});


module.exports = model("Album", albumSchema);
