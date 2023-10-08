import React, { useEffect, useContext, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useParams, useLocation } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import Menu from "../../Menu";
import AlanTalk from "./AlanTalk";
import "../../App.css";
import Sheet from "../../images/1.png";
import Data from "../../images/2.png";
import Dash from "../../images/3.png";
import sty from "../../images/4.png";
import analytics from "../../images/5.png";
const Footer = () => {
  // const { x, y, showMenu } = useRightClickMenu();4
  const sheetParam = useParams().sheet;
  const dashboardParam = useParams().dashboard;
  const storyParam = useParams().story;

  const {
    sheets,
    setSheets,
    dashboards,
    setDashboards,
    storys,
    setStorys,
    showMenu,
    setShowMenu,
    matchedUser,
    disableComponenet,
    setDisableComponent,
    setRenameModal,
    selectedSheet,
    pathlocation,
    setPathLocation,
    selectedDashboard,
    selectedStory,
    setSelectedSheet,
  } = useContext(GlobalContext);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  let location = useLocation();
  // const [selectedSheet, setSelectedSheet] = useState(null);
  const handleAddSheet = () => {
    const newSheet = { name: `sheet${sheets.length}`, workbooks: [], rows: [] };
    setSheets((prev) => [...prev, newSheet]);
  };

  const handleAddDashboard = () => {
    const newDashboard = {
      name: `dashboard${dashboards.length}`,
      graphs: [0, 1, 2, 3, 4, 5],
    };
    setDashboards((prev) => [...prev, newDashboard]);
  };
  const handleAddStory = (index) => {
    const newStory = {
      name: `story${storys.length}`,
      storysPlot: [],
      buttonContain: [],
    };
    setStorys((prev) => [...prev, newStory]);
  };

  const updateSheetname = (e, sheet) => {
    e.preventDefault();
    // setSelectedSheet(sheet); // Store the selected sheet
    setContextMenuVisible(true);
    const x = e.clientX;
    const y = e.clientY;
    const contextMenuHeight = 140;
    const topPosition = y - contextMenuHeight;
    setContextMenuPosition({ x, y: topPosition });
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };
  const handleClick = () => {
    showMenu && setShowMenu(false);
  };
  useEffect(() => {
    if (matchedUser === "Basic") {
      setDisableComponent(true);
      document.getElementById("disableFooterStory").style.pointerEvents =
        "none";
      document.getElementById("disableFooterAnalytics").style.pointerEvents =
        "none";
      document.getElementById("disableFooterStory").style.opacity = 0.1;
      document.getElementById("disableFooterAnalytics").style.opacity = 0.1;
    }
    if (matchedUser === "Standard") {
      document.getElementById("disableFooterAnalytics").style.pointerEvents =
        "none";
      document.getElementById("disableFooterAnalytics").style.opacity = 0.1;
    }
    document.addEventListener("click", handleCloseContextMenu);
  }); //
  const handleRename = () => {
    setRenameModal(true);
  };
  const handleDuplicate = () => {
    if (pathlocation === "Sheet") {
      const clone = structuredClone(selectedSheet);
      clone.name = `${clone.name}-D`;
      setSheets((prev) => [...prev, clone]);
    }
    if (pathlocation === "dashboard") {
      const cloneDashboard = structuredClone(selectedDashboard);
      cloneDashboard.name = `${cloneDashboard.name}-D`;
      setDashboards((prev) => [...prev, cloneDashboard]);
    }
    if (pathlocation === "story") {
      const cloneStory = structuredClone(selectedStory);
      cloneStory.name = `${cloneStory.name}-D`;
      setStorys((prev) => [...prev, cloneStory]);
    }
  };
  const handleDelete = () => {
    if (pathlocation === "Sheet") {
      const tempSheets = sheets.filter((s, index) =>
        s.name === sheetParam ? s != sheets[index] : s
      );
      setSheets(tempSheets);
    }
    if (pathlocation === "dashboard") {
      const tempDashboards = dashboards.filter((s, index) =>
        s.name === dashboardParam ? s != dashboards[index] : s
      );
      setDashboards(tempDashboards);
    }
    if (pathlocation === "story") {
      const tempStorys = storys.filter((s, index) =>
        s.name === storyParam ? s != storys[index] : s
      );
      setStorys(tempStorys);
    }
  };
  useEffect(() => {
    setPathLocation(location.pathname.split("/")[1]);
  }, []);
  return (
    <>
      <hr></hr>
      <AlanTalk />
      <div className="footer">
        <button className="footer-button">
          <img src={Sheet} className="icon-footer" />
          <Link to="/Datasource" className="icon-names">
            Data Source
          </Link>
        </button>

        {sheets.map((sheet, idx) => (
          <button key={idx} className="footer-button">
            <Link
              to={`/Sheet/${sheet.name}`}
              onContextMenu={updateSheetname}
              contextmenu="mymenu"
            >
              <img src={Data} className="icon-footer" />
              {sheet.name}
            </Link>
          </button>
        ))}
        <button onClick={handleAddSheet}>
          <FaPlusCircle className="button-plus" id="disableFooterStory" />
        </button>
        {dashboards.map((dashboard, idx) => (
          <button key={idx} className="footer-button">
            <Link
              to={`/dashboard/${dashboard.name}`}
              onContextMenu={updateSheetname}
              contextmenu="mymenu"
            >
              <img src={Dash} className="icon-footer" />
              {dashboard.name}
            </Link>
          </button>
        ))}
        <button onClick={handleAddDashboard} disabled={disableComponenet}>
          <FaPlusCircle className="button-plus" id="disableFooterStory" />
        </button>
        {storys.map((story, idx) => (
          <button
            key={idx}
            disabled={disableComponenet}
            className="footer-button"
            onContextMenu={updateSheetname}
            contextmenu="mymenu"
          >
            <Link to={`/story/${story.name}`} id="disableFooterStory">
              <img src={sty} className="icon-footer" />
              {story.name}
            </Link>
          </button>
        ))}
        <button onClick={handleAddStory} disabled={disableComponenet}>
          <FaPlusCircle className="button-plus" id="disableFooterStory" />
        </button>
        <button disabled={disableComponenet} className="footer-button">
          <Link to={"/AnalyticsMain"} id="disableFooterAnalytics">
            <img src={analytics} className="icon-footer" />
            Analytics
          </Link>
        </button>
      </div>
      {contextMenuVisible && (
        <div
          className="context-menu"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          {/* Context menu content */}
          <div>
            <img
              src={"../images/Copy.png"}
              alt="copy"
              style={{ height: "15px", width: "15px" }}
            />
            Copy
          </div>
          <div onClick={handleDelete}>
            <img
              src={"../images/Paste.png"}
              alt="paste"
              style={{ height: "15px", width: "15px" }}
            />
            Delete
          </div>
          <div onClick={handleDuplicate}>
            <img
              src={"../images/Duplicate.png"}
              alt="Duplicate"
              style={{ height: "15px", width: "15px" }}
            />
            Duplicate
          </div>
          <div onClick={handleRename}>
            <img
              src={"../images/Rename.png"}
              alt="Rename"
              style={{ height: "15px", width: "15px" }}
            />
            Rename
          </div>
        </div>
      )}
      <hr></hr>
    </>
  );
};

export default Footer;
