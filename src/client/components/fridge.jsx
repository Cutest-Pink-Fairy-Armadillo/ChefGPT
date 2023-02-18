import React, { useState } from "react";

const Fridge = ({ initial, changeBowl, changeFridge }) => {
  return (
    <div className="fridgeBox">
      Fridge
      <div className="fridgeingrediants">
        {initial.map((ingredient) => (
          <img
            key={ingredient.id}
            className="IngredientImage"
            src={ingredient.url}
            alt={ingredient.name}
          ></img>
        ))}
      </div>
      <img
        className="fridgeBGImage"
        src="https://thumbs.dreamstime.com/b/inside-empty-refrigerator-fridge-clean-new-large-white-showing-shelves-draw-100504391.jpg"
      ></img>
    </div>
  );
};

export default Fridge;
