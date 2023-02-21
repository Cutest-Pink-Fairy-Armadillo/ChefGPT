import React, { useEffect, useState } from "react";
import Fridge from "./components/fridge";
import Recipe from "./components/recipe";
import "./styles.scss";
import Login from "./components/login";
import { ingredients } from "./components/default_Ingredients";

//initially we get ingredients from user database
//then we set the ingredientsFridge state using ingredients
//as we drag and drop from fridge to bowl we can set the states of both fridge and bowl
//when generate recipe is clicked, set recipe state to the generated recipe
//when button is clicked, onclick function sends the api call and sets the recipe state to the response

const App = () => {
  const [recipe, setRecipe] = useState("");
  const [ingredientsList, setIng] = useState([]);
  const [bowl, setBowl] = useState([]);
  const [fridge, setFridge] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    // setIng(ingredients);
    if (!loggedIn) setFridge(ingredients);
  });

  const addIngredient = (event) => {
    event.preventDefault();
    if (!userId) alert("LOG IN TO ADD INGREDIENTS");
    const inputIngredient = document.getElementById("ingredientInput").value;
    let ingredientMatch;
    for (const ingredient of ingredients) {
      if (ingredient.name === inputIngredient) ingredientMatch = ingredient;
    }
    // console.log(ingredientMatch);
    fetch("/api/ingredient/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, ingredient: ingredientMatch }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setFridge(data.ingredients);
      });
  };

  const deleteIngredient = (event) => {
    event.preventDefault();
    if (!userId) alert("LOG IN TO DELETE INGREDIENTS");
    const inputIngredient = document.getElementById("ingredientInput").value;
    let ingredientMatch;
    for (const ingredient of ingredients) {
      if (ingredient.name === inputIngredient) ingredientMatch = ingredient;
    }
    // console.log(ingredientMatch);
    fetch("/api/ingredient/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, ingredient: ingredientMatch }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setFridge(data.ingredients);
      });
  };

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
        let prompt = `Give me a brief recipe for ${recipeName}, using `;
        for (let i = 0; i < bowl.length; i++) {
          if (i === bowl.length - 1) prompt += bowl[i].name + ".";
          else if (i === bowl.length - 2) prompt += bowl[i].name + ", and ";
          else prompt += bowl[i].name + ", ";
        }
        console.log("This is the generated prompt: ", prompt);
        // Make an API call to chatGPT
        setRecipe("Asking Chef GPT for a recipe...\n");
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
            console.log(
              "This is the response from the server after a call to chatGPT: ",
              response
            );
            setRecipe(`${recipeName}\n\n${response}`);
          })
          .catch((err) => console.log("err", err));
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div>
      <div className="logo-box">
        <img
          src="https://cdn.dealspotr.com/io-images/logo/chefgpt.jpg?aspect=center&snap=false&width=500&height=200"
          className="logo"
        ></img>
      </div>
      <div className="container">
        <Login
          setFridge={setFridge}
          setLoggedIn={setLoggedIn}
          setUserId={setUserId}
        />
      </div>
      <br></br>
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
        <form className="form">
          <input
            type="text"
            id="ingredientInput"
            placeholder="Enter an ingredient..."
          ></input>
          <button className="addBtn" type="button" onClick={addIngredient}>
            Add to Fridge
          </button>
          <button
            className="deleteBtn"
            type="button"
            onClick={deleteIngredient}
          >
            Delete from Fridge
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
