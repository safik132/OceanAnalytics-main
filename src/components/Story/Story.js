import React, { useContext, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import Footer from "../Sheet/Footer";
import Header from "../Headers/Header";
import { pickBy, keys, max, isEmpty } from "lodash";
import StoryPlot from "./StoryPlot";
import { useEffect } from "react";
import Sidebar from "../SideBar/Sidebar";
import Menu from "../../Menu";
//Second commit
const Story = () => {
  const dragItem = useRef();
  // const [selected, setSelected] = useState();

  const {
    sheets,
    dashboards,
    storys,
    setStorys,
    selectedStory,
    setSelectedStory,
    selected,
    setSelected,
  } = useContext(GlobalContext);

  const storyParam = useParams().story;
  console.log(storys, selected, selectedStory);
  const handleDrop = (index) => {
    const dragSheet = dragItem.current;
    const updatedStory = storys.find((story) => story.name === storyParam);
    updatedStory.buttonContain[index] = dragSheet;
    const tempStorys = storys.map((story) =>
      story.name === storyParam ? updatedStory : story
    );
    setStorys(tempStorys);
    setSelectedStory(storys.find((s) => s.name === storyParam));
  };
  function handleAddContainer() {
    const updatedStory = storys.find((story) => story.name === storyParam);
    updatedStory.buttonContain.push(updatedStory.buttonContain.length);
    const tempStorys = storys.map((story) =>
      story.name === storyParam ? updatedStory : story
    );
    setStorys(tempStorys);
  }
  useEffect(() => {
    setSelectedStory(storys.find((s) => s.name === storyParam));
  }, [storyParam, selectedStory]);
  return (
    <>
      <Header />
      <Sidebar />
      <Menu />
      <div className="storyPage">
        <div className="SheetNames">
          {/* <p style={{ fontSize: "18px", padding: "8px", textAlign: "center" }}>
            Story
          </p> */}
          <p
            className="sheetName"
            style={{
              display: "flex",
              padding: "8px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              textTransform: "uppercase",
              width: "100px",
              marginLeft: "30px",
              marginBottom: "10px",
            }}
          >
            {storyParam}
          </p>
          <hr></hr>
          <br></br>
          {sheets.map((sheet, index) => (
            <p
              key={index}
              className="sheetName"
              style={{
                width: "auto",
                height: "25px",
                padding: "5px",
                margin: "3px",
                fontSize: "12px",
                color: "black",
              }}
              draggable
              onDragStart={() => (dragItem.current = sheet)}
            >
              {sheet.name}
            </p>
          ))}
          {dashboards.map((dashboard, index) => (
            <p
              key={index}
              className="sheetName"
              style={{
                width: "auto",
                height: "25px",
                padding: "5px",
                margin: "3px",
                color: "black",
                fontSize: "12px",
              }}
              draggable
              onDragStart={() => (dragItem.current = dashboard)}
            >
              {dashboard.name}
            </p>
          ))}
        </div>

        <div className="StoryContainer">
          <div className="StoryContainerBtn">
            <div className="story">
              <div className="StoryContainerPlot">
                {selectedStory && selected && (
                  <StoryPlot
                    selectedStory={selectedStory}
                    selected={selected}
                    storyParam={storyParam}
                  />
                )}
              </div>
              {/* </Scrollbars> */}
            </div>

            <div className="storyDisplay">
              {storys.find((story) => story.name === storyParam) &&
                selectedStory?.buttonContain.map((sheet, index) => (
                  <div
                    droppable
                    onDrop={() => handleDrop(index)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <button
                      key={index}
                      onClick={() => setSelected(sheet.name)}
                      className="storyDropBlock"
                    >
                      {sheet.name}
                    </button>
                  </div>
                ))}

              <button
                onClick={handleAddContainer}
                className="Story-Container-Btn"
              >
                Add Here
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer handleAddContainer={handleAddContainer} />
    </>
  );
};
export default Story;
