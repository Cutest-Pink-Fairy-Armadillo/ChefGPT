import React, { useState } from "react";

const Fridge = ({ ing, setBowl, setFridge }) => {
  return (
    <div className="fridgeBox">
      Fridge
      <div className="fridgeingrediants">
        {ing.map((ing) => (
          <img
            key={ing.id}
            src={ing.url}
            alt={ing.name}
            className="IngredientImage"
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
