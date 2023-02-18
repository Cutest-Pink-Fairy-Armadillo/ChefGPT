import React, { useState } from "react";

const Bowl = () => {
  // const bowlArray = [];
  // for (let i = 0; i < ingredients.length; i++) {
  //   bowlArray.push(
  //   <Bowl
  //       key={i}
  //       changeBowl={setIngBowl}
  //       changeFridge={setIngFridge}
  //       setRecipe={setRecipe}
  //     />)
  // }

  return (
    <div>
      <h1>Bowl</h1>
      <div className="bowlBox">
        <img
          className="bowelBGImage"
          src="http://ginaspriggs.guru/wp-content/uploads/2018/09/emptybowl-1024x853.jpg"
        ></img>
        <button
          className="genRecipeButton"
          onClick={() => console.log("hello")}
        >
          Generate new recipe!
        </button>
      </div>
    </div>
  );
};
