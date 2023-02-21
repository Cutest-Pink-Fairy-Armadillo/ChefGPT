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
    const userDoc = await User.findOne({ id: userId });
    if (userDoc) {
      return res.status(200).json({ userDoc });
    }
    const newUserDoc = new User({
      id: userId,
      ingredients: [
        { id: "1", name: "eggs", url: "https://i.imgur.com/L7fa1qX.png" },
        { id: "2", name: "milk", url: "https://i.imgur.com/7B85UY4.png" },
        { id: "3", name: "salt", url: "https://i.imgur.com/Kulk6Le.png" },
        {
          id: "4",
          name: "cheese",
          url: "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/47670/cheese-wedge-emoji-clipart-xl.png",
        },
        {
          id: "5",
          name: "bread",
          url: "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f35e.png",
        },
        {
          id: "6",
          name: "brocolli",
          url: "https://emojis.wiki/emoji-pics/facebook/broccoli-facebook.png",
        },
        {
          id: "7",
          name: "carrot",
          url: "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/56575/carrot-emoji-clipart-xl.png",
        },
        {
          id: "8",
          name: "eggplant",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Twemoji_1f346.svg/1200px-Twemoji_1f346.svg.png",
        },
        {
          id: "9",
          name: "onion",
          url: "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f9c5.png",
        },
        {
          id: "10",
          name: "potato",
          url: "https://em-content.zobj.net/thumbs/120/samsung/349/potato_1f954.png",
        },
        {
          id: "11",
          name: "avocado",
          url: "https://brixxpizza.com/wp-content/themes/Brixxpizza/images/dist/quiz-3.png",
        },
        {
          id: "12",
          name: "lettuce",
          url: "https://images.emojiterra.com/twitter/v13.1/512px/1f96c.png",
        },
        {
          id: "13",
          name: "cucumber",
          url: "https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/512/32365-cucumber-icon.png",
        },
        {
          id: "14",
          name: "corn",
          url: "https://cdn.pixabay.com/photo/2013/07/13/01/22/corn-155613_640.png",
        },
        {
          id: "15",
          name: "tomato",
          url: "https://cdn3d.iconscout.com/3d/premium/thumb/tomato-4452967-3688408.png",
        },
        {
          id: "16",
          name: "mushroom",
          url: "https://img.icons8.com/emoji/600/000000/mushroom-emoji.png",
        },
        {
          id: "17",
          name: "pepper",
          url: "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/47194/hot-pepper-emoji-clipart-xl.png",
        },
        {
          id: "18",
          name: "ham",
          url: "https://em-content.zobj.net/source/skype/289/meat-on-bone_1f356.png",
        },
        {
          id: "19",
          name: "beef",
          url: "https://assets.wprock.fr/emoji/joypixels/512/1f969.png",
        },
        {
          id: "20",
          name: "chicken",
          url: "https://em-content.zobj.net/thumbs/120/facebook/65/poultry-leg_1f357.png",
        },
      ],
    });
    await newUserDoc.save();
    return res.status(200).json({ userDoc: newUserDoc });
  } catch (error) {
    return next(error);
  }
};

controller.generateChef = async (req, res, next) => {
  console.log(
    "------------------------------------------------------------------- generateChef called -------------------------------------------------------------------"
  );
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.prompt,
    temperature: 0,
    max_tokens: 500,
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
};

module.exports = controller;
