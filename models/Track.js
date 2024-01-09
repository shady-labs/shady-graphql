const { model, Schema } = require("mongoose");
const Artist = require("./Artist")

const trackSchema = new Schema({
    name: String,
    trackImage: String,
    trackUrl: String,
    genre: Array,
    duration: Number,
    artistsId: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
    artistsName: [{
        type: Schema.Types.String, ref: "Artist"
    },
],
});

module.exports = model("Track", trackSchema);