const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  ingredients: Array,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
