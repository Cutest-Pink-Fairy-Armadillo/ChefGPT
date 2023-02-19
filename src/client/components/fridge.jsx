import React, { useState, useRef } from "react";

const Fridge = ({ ing, bowl, fridge, setBowl, setFridge }) => {
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log("drag starting...", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setDragging(true);
  };

  const handleDragEnter = (e, targetItem) => {
    console.log("Entering a drag target", targetItem);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("Target is not the same!");
      set;
    }
  };

  const handleDragEnd = () => {
    console.log("Ending drag...");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  return (
    <div className="drag-n-drop">
      <div className="bowlBox">
        Bowl
        <img
          onDragEnter={
            dragging && !bowl.length ? (e) => handleDragEnter(e, bowl) : null
          }
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
      <div className="fridgeBox">
        Fridge
        {ing.map((ing) => (
          <div
            className="dnd-item"
            draggable
            key={ing.id}
            onDragStart={(e) => handleDragStart(e, ing.id)}
            onDragEnter={dragging ? (e) => handleDragEnter(e, ing.id) : null}
          >
            <img className="IngredientImage" src={ing.url} alt={ing.name}></img>
          </div>
        ))}
        <img
          className="fridgeBGImage"
          src="https://thumbs.dreamstime.com/b/inside-empty-refrigerator-fridge-clean-new-large-white-showing-shelves-draw-100504391.jpg"
        ></img>
      </div>
    </div>
  );
};

export default Fridge;
