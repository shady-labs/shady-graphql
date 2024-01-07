const { model, Schema } = require("mongoose");

const trackSchema = new Schema({
    name: String,
    trackImage: String,
    trackUrl: String,
    genre: Array,
    duration: Number,
    artistsId: [String],
    albumId: String, 
});

module.exports = model("Track", trackSchema);