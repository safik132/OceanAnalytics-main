import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalProvider";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";

const Menu = ({ x, y, showMenu }) => {
  const sheetParam = useParams().sheet;
  const dashboardParam = useParams().dashboard;
  const [updateName, setUpdateName] = useState(sheetParam);
  const {
    selectedDashboard,
    pathlocation,
    selectedStory,
    setShowMenu,
    selectedSheet,
    openRenameModal,
    setRenameModal,
    dashboards,
  } = useContext(GlobalContext);
  const openModal = (e) => {
    setRenameModal(true);
    if (e.target.value === "if else") {
      setRenameModal(true);
    }
  };
  function closeModal() {
    setRenameModal(false);
  }
  const style = () => {
    return {
      height: 110,
      width: 120,
      borderRadius: 10,
      backgroundColor: "#d9e1ea",
      color: "",
      display: "flex",
      flexDirection: "column",
      border: "1px solid grey",
      boxShadow: "1px 2px #8888",
      padding: 10,
      marginLeft: 120,
      margin: 10,
      position: "relative",
      display: showMenu ? "flex" : "none",
      fontSize: 15,
      cursor: "pointer",
    };
  };

  const handleRename = () => {
    setRenameModal(false);
    setUpdateName(null);
  };
  const closeMenu = () => {
    showMenu && setShowMenu(false);
  };

  // useEffect(() => {
  //   selectedSheet.name = updateName;
  // }, [selectedSheet]);
  const handleChangingName = (e) => {
    setUpdateName(e.target.value);
    console.log(updateName);
    console.log(pathlocation);
    if (pathlocation === "Sheet") {
      console.log("DDDDDDDDDDDDDDDDD");
      selectedSheet.name = updateName;
    }
    if (pathlocation === "dashboard") {
      console.log("dashbaord");
      selectedDashboard.name = updateName;
    }
    if (pathlocation === "story") {
      selectedStory.name = updateName;
    }
  };
  return (
    <div style={style()} className="menu">
      <ul className="contextMenuBox" onClick={openModal}>
        Rename
        <hr></hr>
      </ul>
      <ul onClick={closeMenu}>Close</ul>
      <hr></hr>
      <Modal
        isOpen={openRenameModal}
        className="RenameModal"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modalTitle">
          <h4 className="modalHeader">Rename </h4>
          <button className="modalButton" onClick={closeModal}>
            X
          </button>
        </div>
        <input
          type="text"
          value={updateName}
          placeholder="Re-name..."
          onChange={handleChangingName}
          className="renameInput"
        />
        <div
          className=""
          style={{
            display: "flex",
            margin: "10px",
            justifyContent: "space-evenly",
          }}
        >
          <button
            className="HeaderBtn"
            onClick={closeModal}
            style={{ backgroundColor: "#b7b7b7", width: "auto" }}
          >
            Cancel
          </button>
          <button
            className="HeaderBtn"
            onClick={handleRename}
            style={{ width: "50px" }}
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
