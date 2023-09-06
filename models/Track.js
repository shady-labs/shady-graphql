const { model, Schema } = require("mongoose");

const trackSchema = new Schema({
    name: String,
    artists: String,
    trackImage: String,
    trackUrl: String
});

module.exports = model("Track", trackSchema);