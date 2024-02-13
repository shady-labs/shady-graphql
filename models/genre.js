const { model, Schema } = require("mongoose");

const genreSchema = new Schema({
    name: String,
});

module.exports = model("Genre", genreSchema);