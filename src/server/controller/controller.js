const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const User = require("../models/userModel");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const controller = {};

controller.generateUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const userDoc = new User({
      id: userId,
      ingredients: [],
    });
    await userDoc.save();
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = controller;
