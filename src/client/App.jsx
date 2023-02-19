import React, { useEffect, useState } from "react";
// import Bowl from "./components/bowl";
import Fridge from "./components/fridge";
import Recipe from "./components/recipe";
import "./styles.scss";

const ingredients = [
  { id: "1", name: "eggs", url: "https://i.imgur.com/L7fa1qX.png" },
  { id: "2", name: "milk", url: "https://i.imgur.com/7B85UY4.png" },
  { id: "3", name: "salt", url: "https://i.imgur.com/Kulk6Le.png" },
];

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
    // setBowl(ingredients);
  });

  return (
    <div className="appBox">
      <Recipe recipe={recipe} />
      <Fridge
        ingredientsList={ingredientsList}
        setBowl={setBowl}
        setFridge={setFridge}
        fridge={fridge}
        bowl={bowl}
      />
    </div>
  );
};

export default App;
