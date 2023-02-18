import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Fridge = ({ ing, setBowl, setFridge, fridge, bowl }) => {
  state = {
    items: fridge,
    selected: bowl,
  };

  id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  const getList = (id) => state[id2List[id]];

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
      // updated fridge/bowl array
      let state = { items };
      //
      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }
      // updating the state of the fridge/bowl
      this.setState(state);
    }
    // if the item was moved outside of its container
    else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  return (
    <div className="Kitchen">
      <div className="dragDropArea">
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Bowl Start here -------------------------------------------------------*/}
          <div className="bowlBox">
            Bowl
            <Droppable droppableId="droppable2">
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
            <Droppable droppableId="droppable">
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

export default Fridge;

////////////////////////////////////////////////////
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Bowl = ({ bowl, setBowl, setFridge, setRecipe }) => {
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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const [recordedItem] = bowl.splice(result.source.index, 1);
    bowl.splice(result.destination.index, 0, recordedItem);
    setBowl(bowl);
  };

  return (
    <div className="bowlBox">
      Bowl
      <div className="bowlingredients">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* Droppable area starts here */}
          <Droppable droppableId="ingredients">
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
        </DragDropContext>
      </div>
      <img
        className="bowelBGImage"
        src="http://ginaspriggs.guru/wp-content/uploads/2018/09/emptybowl-1024x853.jpg"
      ></img>
      <button className="genRecipeButton" onClick={() => console.log("hello")}>
        Generate new recipe!
      </button>
    </div>
  );

  //   return (
  //     <div>
  //       <h1>Bowl</h1>
  //       <div className="bowlBox">
  //         <img
  //           className="bowelBGImage"
  //           src="http://ginaspriggs.guru/wp-content/uploads/2018/09/emptybowl-1024x853.jpg"
  //         ></img>
  //         <button
  //           className="genRecipeButton"
  //           onClick={() => console.log("hello")}
  //         >
  //           Generate new recipe!
  //         </button>
  //       </div>
  //     </div>
  //   );
};

// export default Bowl;
