import React, { useEffect, useState } from "react";
import Fridge from "./components/fridge";
import Recipe from "./components/recipe";
import "./styles.scss";
import Login from "./components/login";
import { ingredients } from "./components/default_Ingredients";

const App = () => {
  const [recipe, setRecipe] = useState("");
  const [ingredientsList, setIng] = useState([]);
  const [bowl, setBowl] = useState([]);
  const [fridge, setFridge] = useState([]);

  //initially we get ingredients from user database
  //then we set the ingredientsFridge state using ingredients
  //as we drag and drop from fridge to bowl we can set the states of both fridge and bowl
  //when generate recipe is clicked, set recipe state to the generated recipe
  //when button is clicked, onclick function sends the api call and sets the recipe state to the response

  useEffect(() => {
    setIng(ingredients);
    setFridge(ingredients);
  });

  const genRecipeClick = () => {
    console.log(bowl);
    // Make query string for API call, made up of the ingredients in the bowl
    let queryString = ``;
    for (let i = 0; i < bowl.length; i++) {
      if (i === bowl.length - 1) queryString += bowl[i].name;
      else queryString += bowl[i].name + ",+";
    }
    console.log("This is the generated query string: ", queryString);
    const apiKey = "&apiKey=5651fb4d5ce1400a8d7c9d38a2875409";
    let recipeName = "";
    // Make an API call to the Recipe API, using the state of the bowl
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&number=1${apiKey}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("This is the returned data", data)
        console.log("recipe title: ", data[0].title);
        //  Save the returned recipe name
        recipeName = data[0].title;
        // Using the recipe name and the ingredients, ask chatGPT for a recipe
        let prompt = `Give me a recipe for ${recipeName}, using `;
        for (let i = 0; i < bowl.length; i++) {
          if (i === bowl.length - 1) prompt += bowl[i].name + ".";
          else if (i === bowl.length - 2) prompt += bowl[i].name + ", and ";
          else prompt += bowl[i].name + ", ";
        }
        console.log("This is the generated prompt: ", prompt);
        // Make an API call to chatGPT
        fetch("http://localhost:3000/api/chef", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: prompt }),
        })
          .then((res) => res.json())
          .then((data) => {
            let response = "This is the response from chatGPT";
            response = data;
            // Update the recipe state with the returned recipe
            setRecipe(response);
          })
          .catch((err) => console.log("err", err));
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div>
      <Login />
      <br></br>
      {/* <div className="logo-box"><img src="https://cdn.dealspotr.com/io-images/logo/chefgpt.jpg?aspect=center&snap=false&width=500&height=500" className="logo"></img></div> */}
      <div className="appBox">
        <Recipe recipe={recipe} />
        <Fridge
          ingredientsList={ingredientsList}
          setBowl={setBowl}
          setFridge={setFridge}
          fridge={fridge}
          bowl={bowl}
          genRecipeClick={genRecipeClick}
        />
      </div>
    </div>
  );
};

export default App;
