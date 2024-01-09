const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  image: String,
  address: String,
  isArtist: Boolean,
  email: String,
  region: String
});


module.exports = model('User', userSchema);

