const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: String,
  id: Number,
  image: String,
});

const Ingredient = mongoose.model("ingredient", ingredientSchema);

module.exports = Ingredient;
