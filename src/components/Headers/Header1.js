import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { useNavigate, useParams, Link } from "react-router-dom";
import { saveAs } from "file-saver";
import ImportExcel from "../Sheet/ImportExcel";

const Header = () => {
  const sheetParam = useParams().sheet;
  const dashboardParam = useParams().dashboard;
  const storyParam = useParams().story;

  const {
    storys,
    dashboards,
    sheets,
    selectedWB,
    selectedWBSheet,
    matchedUser,
    disableComponenet,
    setDisableComponent,
  } = useContext(GlobalContext);
  let navigate = useNavigate();
  function fileInput(e) {
    if (e.target.value === "Exit") {
      navigate("/", { replace: true });
    }
    if (e.target.value === "open") {
    }
    if (e.target.value === "Save") {
      let obj = {};
      let allSheetsData = selectedWB;
      obj["sheetParam"] = sheetParam;
      obj["dashboardParam"] = dashboardParam;
      obj["storyParam"] = storyParam;
      // obj["columns"] = columns;
      obj["allworksheetData"] = allSheetsData;
      obj["globalData"] = sheets;
      obj["dashboards"] = dashboards;
      obj["realdata"] = selectedWB[selectedWBSheet];
      obj["storys"] = storys;
      let content = JSON.stringify(obj);
      let blob = new Blob([content], { type: "application/json" });

      saveAs(blob, "File.owbx");
    }
  }
  useEffect(() => {
    if (matchedUser === "Basic") {
      setDisableComponent(true);
      document.getElementById("disableAnalytics").style.pointerEvents = "none";
      document.getElementById("disableAnalytics").style.opacity = 0.1;
    }
    if (matchedUser === "Standard") {
      document.getElementById("disableAnalytics").style.pointerEvents = "none";
      document.getElementById("disableAnalytics").style.opacity = 0.1;
    }
  });
  return (
    <>
      <div className="First-line">
        <select onClick={fileInput}>
          <option type="file">Files</option>
          <option value="open">Open</option>
          <option>Save</option>
          <option>Exit</option>
        </select>
        <button className="HeaderBtn">
          <Link className="HeaderLink " to={"/dataSource"}>
            Datasource
          </Link>
        </button>
        <button className="HeaderBtn">
          <Link className="HeaderLink " to={"/sheet/sheet"}>
            Sheet
          </Link> 
        </button>
        <button className="HeaderBtn">
          <Link className="HeaderLink" to={"/dashboard/dashboard"}>
            Dashboard
          </Link>
        </button>
        <button className="HeaderBtn" disabled={disableComponenet}>
          <Link className="HeaderLink" to={"/story/story"} id="disableStory">
            Story
          </Link>
        </button>
        <button className="HeaderBtn" disabled={disableComponenet}>
          <Link
            className="HeaderLink"
            id="disableAnalytics"
            to={"/AnalyticsMain"}
          >
            Analytics
          </Link>
        </button>
      </div>
      <hr></hr>
    </>
  );
};
export default Header;
