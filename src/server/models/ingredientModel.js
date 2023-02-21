const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  id: String,
  name: String,
  url: String,
});

const Ingredient = mongoose.model("ingredient", ingredientSchema);

module.exports = Ingredient;
