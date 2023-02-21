import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Fridge = ({ genRecipeClick, setBowl, setFridge, fridge, bowl }) => {
  // a little function to help us with reordering the result
  const reorder = (arr, startIndex, endIndex) => {
    const [removed] = arr.splice(startIndex, 1);
    arr.splice(endIndex, 0, removed);

    return arr;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    // const sourceClone = Array.from(source);
    // const destClone = Array.from(destination);
    // console.log("inside move function")
    const [removed] = source.splice(droppableSource.index, 1);
    destination.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = source;
    result[droppableDestination.droppableId] = destination;

    return result;
  };

  const match_id_2_State = {
    fridgeDroppable: fridge,
    bowlDroppable: bowl,
  };

  const getState = (id) => {
    return match_id_2_State[id];
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // if dropped outside the list, just return
    if (!destination) return;
    // if the item moved stayed within its container
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        // Grabs the fridge or bowl, whichever the item came from and was dropped back into
        getState(source.droppableId),
        source.index,
        destination.index
      );
      // updating the state of the fridge/bowl
      // items === updated fridge/bowl array
      if (source.droppableId === "fridgeDroppable") setFridge(items);
      else setBowl(items);
    }
    // if the item was moved outside of its container
    else {
      const result = move(
        getState(source.droppableId),
        getState(destination.droppableId),
        source,
        destination
      );
      // updating the state of the fridge/bowl
      // result === updated fridge/bowl arrays
      setFridge(result.fridgeDroppable);
      setBowl(result.bowlDroppable);
    }
  };

  return (
    <div className="dragDropArea">
      <DragDropContext className="kitchen" onDragEnd={onDragEnd}>
        {/* Bowl Start here -------------------------------------------------------*/}
        <div className="bowlBox">
          <Droppable droppableId="bowlDroppable">
            {/* Provided argument includes info and references to code that the library needs to work properly */}
            {(provided) => (
              <ul
                className="bowl"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {/* Creating each ingredient item to be rendered */}
                {bowl.map(({ id, name, url }, index) => {
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
          <img
            className="bowelBGImage"
            src="https://m.media-amazon.com/images/I/31MR7vLhOJL._AC_.jpg"
          ></img>
          <button className="genRecipeButton" onClick={() => genRecipeClick()}>
            Generate new recipe!
          </button>
        </div>
        <div className="fridgeBox">
          {/* Fridge Start here --------------------------------------------------*/}
          {/* Droppable area starts here */}
          <Droppable droppableId="fridgeDroppable">
            {/* Provided argument includes info and references to code that the library needs to work properly */}
            {(provided) => (
              <ul
                className="ing"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {/* Creating each ingredient item to be rendered */}
                {fridge.map(({ id, name, url }, index) => {
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
          <img
            className="fridgeBGImage"
            src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/12-fridge-interior-allan-swart.jpg"
          ></img>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Fridge;
