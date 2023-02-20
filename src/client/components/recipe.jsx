import React, { useState } from "react";

const Recipe = (props) => {
  return <div className="recipeBox">
    <h1 className="recipe-name">Recipe</h1>
    <div className="recipe-text-area">
      <p className="recipe-text">{props.recipe}</p>
    </div>
  </div>;
};

export default Recipe;
