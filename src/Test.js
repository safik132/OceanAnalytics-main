import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SplitPane from "react-split-pane";

const DraggableBox = ({ id, title, handleDrop }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "box",
    item: { id, title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "8px",
        border: "1px dashed #000",
        backgroundColor: "lightgray",
        margin: "8px",
      }}
    >
      {title}
    </div>
  );
};

const DropTarget = ({ handleDrop, orientation, children }) => {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: "box",
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div
      ref={dropRef}
      style={{
        height: orientation === "vertical" ? "100%" : "auto",
        width: orientation === "horizontal" ? "100%" : "auto",
        display: orientation === "horizontal" ? "flex" : "block",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        background: isActive ? "green" : "black",
        color: "white",
      }}
    >
      {children}
    </div>
  );
};

const Test = () => {
  const [items, setItems] = useState([
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
  ]);

  const [droppedItems, setDroppedItems] = useState([]);
  const [dropOrientation, setDropOrientation] = useState("vertical");

  const handleDrop = (item) => {
    setDroppedItems([...droppedItems, item]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {items.map((item) => (
          <DraggableBox
            key={item.id}
            id={item.id}
            title={item.title}
            handleDrop={handleDrop}
          />
        ))}
      </div>
      <SplitPane
        split={dropOrientation === "vertical" ? "vertical" : "horizontal"}
        defaultSize={600}
        onChange={() =>
          setDropOrientation(
            dropOrientation === "vertical" ? "horizontal" : "vertical"
          )
        }
      >
        <DropTarget handleDrop={handleDrop} orientation={dropOrientation}>
          {/* Content of the second pane */}
          {droppedItems.length > 0
            ? droppedItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    border: "10px solid white",
                    textAlign: "center",
                    padding: "8px",
                    margin: "8px",
                  }}
                >
                  {item.title}
                </div>
              ))
            : "Drag and drop items here"}
        </DropTarget>
      </SplitPane>
    </DndProvider>
  );
};

export default Test;
