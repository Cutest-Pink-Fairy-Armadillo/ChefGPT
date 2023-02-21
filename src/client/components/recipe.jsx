import React, { useState } from "react";

const Recipe = (props) => {
  // convert the newlines in the recipe string to <br> tags
  const pArray = [];
  let str = "";
  // for every new line start a new sub string with a <p> tag,
  // and push those sub strings into pArray
  for (let i = 0; i < props.recipe.length; i++) {
    str += props.recipe[i];
    if (props.recipe[i] === `\n`) {
      pArray.push(<p key={i}>{str}</p>);
      str = "";
    }
  }

  return (
    <div className="recipeBox">
      <h1 className="recipe-name"></h1>
      <div className="recipe-text-area">
        <div className="recipe-text">{pArray}</div>
      </div>
    </div>
  );
};

export default Recipe;
