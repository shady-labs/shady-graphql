const { model, Schema } = require("mongoose");
const Artist = require("./Artist")

const trackSchema = new Schema({
  name: String,
  artists: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
  },
  trackImage: String,
  trackUrl: String,
  genre: Array,
  duration: Number,
});

module.exports = model("Track", trackSchema);