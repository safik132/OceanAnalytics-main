import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import {
  FaUnderline,
  FaBold,
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa";
import {
  MdFormatItalic,
  MdFormatColorFill,
  MdBorderColor,
} from "react-icons/md";
import ReactGPicker from "react-gcolor-picker";

const AddTextModal = () => {
  const [textValue, setTextValue] = useState("");
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedOption, setSelectedOption] = useState("12"); // Default font size
  const [fontList, setFontList] = useState([]);
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [width, setWidth] = useState(200); // Initial width
  const [height, setHeight] = useState(200); // Initial width
  const [fontBold, setFontBold] = useState(false);
  const [fontItalic, setFontItalic] = useState(false);
  const [underline, setTextUnderline] = useState(false);
  const [alignText, setAlignText] = useState();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [bgshowColorPicker, setShowBgColorPicker] = useState(false);

  const [color, setColor] = useState();
  const [bgColor, setBackgroundColor] = useState();

  const [colorPickerPosition, setColorpickerposition] = useState({
    x: 0,
    y: 0,
  });
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
    setAlignText();
    setTextUnderline(false);
    setSelectedOption("12");
    setFontItalic(false);
    setFontBold(false);
    setShowColorPicker(false);
    setColor("black");
  };

  const handleOk = () => {
    const updatedDashboard = dashboards.find(
      (dashboard) => dashboard.name === dashboardParam
    );

    updatedDashboard.text?.push({
      value: textValue,
      position: { x: position.x, y: position.y },
      fontSize: selectedOption + "px",
      fontWeight: fontBold ? 900 : "normal",
      fontFamily: `${selectedFont}`,
      fontStyle: fontItalic ? "italic" : "normal",
      textDecoration: underline ? "underline" : "",
      textAlign: alignText,
      color: color,
      backgroundColor: bgColor,
    });

    const tempDashboards = dashboards.map((dashboard) =>
      dashboard.name === dashboardParam ? updatedDashboard : dashboard
    );

    setDashboards(tempDashboards);
    closeModal();
  };
  useEffect(() => {
    const fetchFonts = async () => {
      console.log("first");
      try {
        const response = await fetch(
          "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBboK4gA55svd-uTrqCAmiLulsSU2637Bs"
        );
        const data = await response.json();
        if (data && data.items) {
          setFontList(data.items.map((font) => font.family));
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching fonts:", error);
      }
    };

    fetchFonts();
  }, []);
  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };
  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e, index) => {
    if (isDragging) {
      // selectedDashboard?.text[index].push("position");
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = (e, index) => {
    console.log("position");
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

  const hanldeInputChange = (e, index) => {
    setAddTextModal(true);
    console.log(e);
    let x = selectedDashboard?.text[index].value;
    console.log(x, selectedDashboard);
  };
  const hanldeDoubleClick = (e, index) => {
    setAddTextModal(true);
    let x = selectedDashboard?.text[index].value;
    setTextValue(x);
    console.log(x);
  };
  console.log(selectedDashboard);
  const handleFontBold = () => {
    setFontBold((prevFontBold) => !prevFontBold);
  };
  const handleTextAlign = (alignment) => {
    setAlignText(alignment);
  };
  const onChange = (value) => {
    setColor(value);
    setShowColorPicker(!showColorPicker);
  };
  const handleColorPicker = (e) => {
    setShowColorPicker(!showColorPicker);
    setShowBgColorPicker(false);
  };
  const handleBgColorPicker = (e) => {
    setShowBgColorPicker(!bgshowColorPicker);
    setShowColorPicker(false);
  };
  const onBackgroundColorChange = (value) => {
    setBackgroundColor(value);
    setShowBgColorPicker(!bgshowColorPicker);
  };
  return (
    <>
      {selectedDashboard &&
        selectedDashboard?.text?.map((text, index) => (
          <div
            key={index}
            className="draggable"
            style={{
              fontSize: text.fontSize,
              fontFamily: text.fontFamily,
              left: position.x,
              top: position.y,
              fontWeight: text.fontWeight,
              fontStyle: text.fontStyle,
              textDecoration: text.textDecoration,
              textAlign: text.textAlign,
              color: text.color,
              backgroundColor: text.backgroundColor,
              width: "500px",
              border: "1px solid black",
            }}
            contentEditable={true}
            onDoubleClick={(e) => hanldeDoubleClick(e, index)}
            onClick={handleMouseDown}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseUp={(e) => handleMouseUp(e, index)}
          >
            {text.value}
          </div>
        ))}

      <Modal
        isOpen={addTextmodal}
        className="modalStyles"
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
          <select
            id="fontSelect"
            value={selectedFont}
            onChange={handleFontChange}
          >
            {fontList?.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
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
              fontWeight: fontBold ? "bolder" : "normal",
            }}
            className="addtextmodalbtn"
            onClick={handleFontBold}
          >
            <FaBold />
          </button>
          <button
            style={{
              fontStyle: fontItalic ? "italic" : "normal",
            }}
            className="addtextmodalbtn"
            onClick={() => setFontItalic((prevFontBold) => !prevFontBold)}
          >
            <MdFormatItalic />
          </button>
          <div>
            <button
              className="addtextmodalbtn"
              style={{ textDecoration: underline ? "underline" : "" }}
              onClick={() =>
                setTextUnderline((prevTextUnderline) => !prevTextUnderline)
              }
            >
              <FaUnderline />
            </button>
            <button
              className="addtextmodalbtn"
              onClick={() => handleTextAlign("left")}
            >
              <FaAlignLeft />
            </button>
            <button
              className="addtextmodalbtn"
              onClick={() => handleTextAlign("center")}
            >
              <FaAlignCenter />
            </button>
            <button
              className="addtextmodalbtn"
              onClick={() => handleTextAlign("right")}
            >
              <FaAlignRight />
            </button>
            <button
              className="addtextmodalbtn"
              onClick={(e) => handleColorPicker(e)}
            >
              <MdBorderColor />
            </button>
            <button
              className="addtextmodalbtn"
              onClick={(e) => handleBgColorPicker(e)}
            >
              <MdFormatColorFill />
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
            fontFamily: `${selectedFont}`,
            fontWeight: fontBold ? 900 : "normal",
            fontStyle: fontItalic ? "italic" : "normal",
            textDecoration: underline ? "underline" : "",
            textAlign: alignText,
            color: color,
            backgroundColor: bgColor,
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
        {showColorPicker && (
          <div
            style={{
              position: "absolute",
              top: "28%",
              left: "55%",
            }}
          >
            <ReactGPicker value="red" onChange={onChange} />
          </div>
        )}
        {bgshowColorPicker && (
          <div
            style={{
              position: "absolute",
              top: "28%",
              left: "55%",
            }}
          >
            <ReactGPicker value="red" onChange={onBackgroundColorChange} />

            <p
              style={{
                width: "100%",
                borderTop: "none",
                borderRight: "1px solid black",
                borderLeft: "1px solid black",
                borderBottom: "1px solid black",
                color: "white",
                background: "black",
                marginBottom: "-140px",
                textAlign: "center",
              }}
            >
              Background
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};
export default AddTextModal;
