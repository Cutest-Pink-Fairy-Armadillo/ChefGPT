import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Fridge = ({ ing, setBowl, setFridge }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const [recordedItem] = ing.splice(result.source.index, 1);
    ing.splice(result.destination.index, 0, recordedItem);
    setFridge(ing);
  };
  return (
    <div className="fridgeBox">
      Fridge
      <div className="fridgeingredients">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* Droppable area starts here */}
          <Droppable droppableId="ingredients">
            {/* Provided argument includes info and references to code that the library needs to work properly */}
            {(provided) => (
              <ul
                className="ing"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {/* Creating each ingredient item to be rendered */}
                {ing.map(({ id, name, url }, index) => {
                  return (
                    // Attaching the draggable tag to our ingredient
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          // attaching library specific attributes
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {/* Our actual ingredient component */}
                          <div className="ingredient">
                            <img
                              className="IngredientImage"
                              src={url}
                              alt={name}
                            ></img>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <img
        className="fridgeBGImage"
        src="https://thumbs.dreamstime.com/b/inside-empty-refrigerator-fridge-clean-new-large-white-showing-shelves-draw-100504391.jpg"
      ></img>
    </div>
  );
};

export default Fridge;
