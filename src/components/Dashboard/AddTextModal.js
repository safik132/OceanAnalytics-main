import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import { SketchPicker } from "react-color";

const DraggableText = ({ text, initialPosition, index }) => {
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="draggable"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {text}
    </div>
  );
};

const AddTextModal = () => {
  const [textValue, setTextValue] = useState("");
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedOption, setSelectedOption] = useState("12"); // Default font size
  const dashboardParam = useParams().dashboard;

  const {
    selectedDashboard,
    setDashboards,
    dashboards,
    addTextmodal,
    setAddTextModal,
  } = useContext(GlobalContext);

  const openModal = () => {
    setAddTextModal(true);
  };

  const closeModal = () => {
    setAddTextModal(false);
    setTextValue("");
  };

  const handleOk = () => {
    const updatedDashboard = dashboards.find(
      (dashboard) => dashboard.name === dashboardParam
    );

    updatedDashboard.text?.push({
      value: textValue,
      position: { x: position.x, y: position.y },
      fontSize: selectedOption + "px",
      fontWeight: "bolder",
      fontFamily: "sans-serif",
      fontPosition: "left",
    });

    const tempDashboards = dashboards.map((dashboard) =>
      dashboard.name === dashboardParam ? updatedDashboard : dashboard
    );

    setDashboards(tempDashboards);
    closeModal();
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCustomTextChange = () => {
    setSelectedOption("custom");
  };

  const fontSizeOptions = [
    "9",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "26",
    "32",
    "72",
  ]; // Add more options as needed

  return (
    <>
      {selectedDashboard &&
        selectedDashboard?.text?.map((text, index) => (
          <DraggableText key={index} text={text.value} />
        ))}
      <Modal
        isOpen={addTextmodal}
        className="modalStyle"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modalTitle">
          <h4 className="modalHeader">Add Text</h4>
          <button className="modalButton" onClick={closeModal}>
            X
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <select>
            <option>Font</option>
            <option>Sans Serif</option>
            <option>Roboto</option>
          </select>
          <select value={selectedOption} onChange={handleOptionChange}>
            {fontSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            style={{
              fontWeight: "900",
              margin: "5px",
              borderRadius: "10px",
            }}
          >
            B
          </button>
          <button
            style={{
              fontWeight: "900",
              margin: "5px",
              borderRadius: "10px",
            }}
          >
            I
          </button>
          <div>
            <button
              style={{
                fontWeight: "900",
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              U
            </button>
            <button
              style={{
                fontWeight: "900",
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              L
            </button>
            <button
              style={{
                fontWeight: "900",
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              C
            </button>{" "}
            <button
              style={{
                fontWeight: "900",
                margin: "5px",
                borderRadius: "10px",
              }}
            >
              R
            </button>
          </div>
        </div>
        <textarea
          placeholder="Add your text here"
          style={{
            fontSize: selectedOption + "px",
            width: "100%",
            height: "175px",
            verticalAlign: "top",
            resize: "none",
          }}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="all-component-btn" onClick={handleOk}>
            ok
          </button>
          <button className="all-component-btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};
export default AddTextModal;
