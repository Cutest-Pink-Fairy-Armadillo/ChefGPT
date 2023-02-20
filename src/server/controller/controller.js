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

controller.generateChef = async (req, res, next) => {
  console.log("------------------------------------------------------------------- generateChef called -------------------------------------------------------------------");
  const response = await openai.createCompletion({ 
    model: "text-davinci-003", 
    prompt: req.body.prompt, 
    temperature: 0,
  });
  res.locals.chef = await response.data.choices[0].text;
  console.log("this is returned from openai: ", res.locals.chef);
  next();
  
  // try {
  //   const prompt = req.body; // Extract the string prompt from the request body
  //   const response = await axios({
  //     method: "post",
  //     url: "https://api.openai.com/v1/engines/davinci-codex/completions",
  //     headers: {
  //       Authorization: `Bearer ${apiKey}`, // Replace with your OpenAI API key
  //       "Content-Type": "application/json",
  //     },
  //     data: {
  //       prompt: prompt,
  //       max_tokens: 60, // Change this as needed
  //       n: 1,
  //       stop: "\n",
  //     },
  //   }) 
  //   res.locals.chef = response.data.choices[0].text;
  //   return next();
  // } catch (error) {
  //     return next(error);
  //   };  
}

module.exports = controller;
