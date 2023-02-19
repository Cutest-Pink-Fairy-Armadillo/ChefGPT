import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const Fridge = ({ ingredientsList, setBowl, setFridge, fridge, bowl }) => {
  
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
    console.log("inside move function")
    const [removed] = source.splice(droppableSource.index, 1);
    destination.splice(droppableDestination.index, 0, removed);
  
    const result = {};
    result[droppableSource.droppableId] = source;
    result[droppableDestination.droppableId] = destination;
  
    return result;
  };

  const drop_id_2_Array = {
    fridgeDroppable: fridge,
    bowlDroppable: bowl
  };

  function getList(id) {
    return drop_id_2_Array[id];
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // if dropped outside the list, just return
    if (!destination) {
      return;
    }
    // if the item moved stayed within its container
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        // Grabs the fridge or bowl, whichever the item came from and was dropped back into
        getList(source.droppableId),
        source.index,
        destination.index
      );
      // updating the state of the fridge/bowl
      // items === updated fridge/bowl array
        if (source.droppableId === "fridgeDroppable") {
          setFridge(items);
        } else {
          setBowl(items);
        }

    }
    // if the item was moved outside of its container
    else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
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
    <div className="Kitchen">
      <div className="dragDropArea">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Bowl Start here -------------------------------------------------------*/}
          <div className="bowlBox">
            Bowl
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
              src="http://ginaspriggs.guru/wp-content/uploads/2018/09/emptybowl-1024x853.jpg"
            ></img>
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
              src="https://thumbs.dreamstime.com/b/inside-empty-refrigerator-fridge-clean-new-large-white-showing-shelves-draw-100504391.jpg"
            ></img>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};



// const Fridge = ({ initial, changeBowl, changeFridge }) => {
//   return (
//     <div className="fridgeBox">
//       Fridge
//       <div className="fridgeingrediants">
//         {initial.map((ingredient) => (
//           <img
//             key={ingredient.id}
//             className="IngredientImage"
//             src={ingredient.url}
//             alt={ingredient.name}
//           ></img>
//         ))}
//       </div>
//       <img
//         className="fridgeBGImage"
//         src="https://thumbs.dreamstime.com/b/inside-empty-refrigerator-fridge-clean-new-large-white-showing-shelves-draw-100504391.jpg"
//       ></img>
//     </div>
//   );
// };

export default Fridge;
