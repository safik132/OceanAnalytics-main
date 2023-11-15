import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  createRef,
} from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import Footer from "../Sheet/Footer";
import Header from "../Headers/Header";
import Filter from "../Sheet/Filter";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useScreenshot } from "use-react-screenshot";
import Sidebar from "../SideBar/Sidebar";
import Menu from "../../Menu";
import { saveAs } from "file-saver";
import AddTextModal from "./AddTextModal";

const Dashboard = () => {
  const dragItem = useRef();
  const [scopemap, setScopeMap] = useState();
  const [height, setHeight] = useState(false);
  // const [plotWidth, setPlotWidth] = useState(0);
  // const [plotHeight, setPlotHeight] = useState(0);
  // const [gridTemplateColumns, setGridTemplateColumns] = useState();

  // const [dashboardText, setDashboardText] = useState(); // State to store dynamically created Plot components
  // const [numDrops, setNumDrops] = useState(0);

  const {
    t,
    sheets,
    dashboards,
    setDashboards,
    sort,
    sortType,
    filterType,
    filterOperator,
    filterValue,
    selectedDashboard,
    setSelectedDashboard,
    selectedSheet,
    setPathLocation,
    plotWidth,
    setPlotHeight,
    setPlotWidth,
    plotHeight,
    gridTemplateColumns,
    setGridTemplateColumns,
    dashboardText,
    setAddTextModal,
    numDrops,
    setNumDrops,
  } = useContext(GlobalContext);
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();

  const dashboardParam = useParams().dashboard;

  const handleDrop = (index) => {
    if (selectedDashboard.drops === 6) {
      alert(`No more sheets can be added`);
      return;
    } else {
      const dragSheet = dragItem.current;
      const updatedDashboard = dashboards.find(
        (dashboard) => dashboard.name === dashboardParam
      );
      // updatedDashboard.graphs[index] = dragSheet;
      updatedDashboard.graph.push(dragSheet);
      updatedDashboard.drops += 1;
      const tempDashboards = dashboards.map((dashboard) =>
        dashboard.name === dashboardParam ? updatedDashboard : dashboard
      );
      setDashboards(tempDashboards);
      setNumDrops(updatedDashboard.drops);
    }
  };
  function mobileView() {
    document.getElementById("myDIV").style.width = "470px";
    document.getElementById("myDIV").style.display = "block";
    document.getElementById("myDIV").style.overflow = "auto";
  }
  function TabletView() {
    document.getElementById("myDIV").style.width = "920px";
    document.getElementById("myDIV").style.display = "grid";
    document.getElementById("myDIV").style.gridTemplateColumns = "1fr 1fr";
    document.getElementById("myDIV").style.overflow = "auto";
  }
  function DashboardView() {
    document.getElementById("myDIV").style.width = "1500px";
    document.getElementById("myDIV").style.display = "grid";
    document.getElementById("myDIV").style.gridTemplateColumns = "1fr 1fr 1fr";
    document.getElementById("myDIV").style.overflow = "hidden";
  }
  const handleDashboardView = (e) => {
    if (e.target.value === "dashboard") {
      setHeight(false);
      document.getElementById("myDIV").style.width = "100%"; //1500px
      document.getElementById("myDIV").style.display = "grid";
      document.getElementById("myDIV").style.gridTemplateColumns =
        "1fr 1fr 1fr";
      document.getElementById("myDIV").style.overflow = "hidden";
    }
    if (e.target.value === "mobile") {
      document.getElementById("myDIV").style.width = "470px";
      document.getElementById("myDIV").style.display = "block";
      document.getElementById("myDIV").style.overflow = "auto";
    }
    if (e.target.value === "tablet") {
      document.getElementById("myDIV").style.width = "920px";
      document.getElementById("myDIV").style.display = "grid";
      document.getElementById("myDIV").style.gridTemplateColumns = "1fr 1fr";
      document.getElementById("myDIV").style.overflow = "auto";
    }
    if (e.target.value === "1") {
      setHeight(true);
      // document.getElementById("plotDiv").style.width = "100%";
      // document.getElementById("plotDiv").style.height = "100%";
      // document.getElementById("myDIV").style.width = "100%";
      document.getElementById("myDIV").style.display = "grid";
      document.getElementById("myDIV").style.gridTemplateColumns = "1fr";
    }
    if (e.target.value === "1:2") {
      document.getElementById("plotDiv").style.width = "100%";
      document.getElementById("plotDiv").style.height = "100%";
      document.getElementById("myDIV").style.width = "100%";
      document.getElementById("myDIV").style.display = "grid";
      document.getElementById("myDIV").style.gridTemplateColumns = "1fr 1fr";
      setHeight(true);
    }
  };
  useEffect(() => {
    setSelectedDashboard(dashboards.find((s) => s.name === dashboardParam));
  }, [dashboardParam, selectedDashboard]);
  useEffect(() => {
    // Handle width changes when numDrops changes
    if (selectedDashboard.drops === 1) {
      setPlotWidth(1250);
      setPlotHeight(570);
      setGridTemplateColumns("1fr");
    } else if (selectedDashboard.drops === 2) {
      setPlotWidth("100%");
      setPlotHeight("100%");
      setGridTemplateColumns("1fr 1fr");
    } else if (selectedDashboard.drops === 3) {
      setPlotWidth(425);
      setPlotHeight("100%");
      setGridTemplateColumns("1fr 1fr 1fr");
    } else if (selectedDashboard.drops === 4) {
      setPlotWidth(450);
      setPlotHeight(276);
      setGridTemplateColumns("1fr 1fr 1fr");
    } else if (selectedDashboard.drops > 6) {
      alert("no more sheets can be added  ");
      return;
    } else {
      setPlotWidth(450);
      setPlotHeight(276);
      setGridTemplateColumns("1fr 1fr 1fr");
    }
  }, [numDrops, selectedDashboard]);
  const getImage = async () => {
    const image = await takeScreenshot(ref.current);
    return image;
  };

  const downloadImage = async () => {
    try {
      const image = await getImage();
      if (image) {
        saveAs(image, "dashboard.jpg");
      } else {
        alert("Image not available for download.");
      }
    } catch (error) {
      alert("Error downloading image:", error);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Menu />
      <div className="sheet-btn">
        <select
          id="Filter"
          className="all-component-btn"
          onChange={handleDashboardView}
        >
          <option value="null">View</option>
          <option value="mobile">Mobile</option>
          <option value="tablet">Tablet</option>
          <option value="dashboard">Dashboard</option>
          <option value="1">1:1</option>
          <option value="1:2">1:2</option>
        </select>
        <Filter />
        {/* <button
          onClick={() => setAddTextModal(true)}
          className="all-component-btn"
        >
          Add Text
        </button> */}

        <button className="all-component-btn" onClick={downloadImage}>
          Download
        </button>
      </div>

      <div className="Dashboard" style={{ height: "80vh" }}>
        <div className="Sheets">
          <p style={{ fontSize: "18px", padding: "8px", textAlign: "center" }}>
            {t("Sheets")}
          </p>
          <hr></hr>
          <br></br>
          {sheets.map((sheet, index) => (
            <p
              key={index}
              className="sheetName"
              style={{
                width: "auto",
                height: "30px",
                padding: "5px",
                margin: "3px",
                background: "#5d6d7e",
                color: "white",
                fontSize: "13px",
              }}
              draggable
              onDragStart={() => (dragItem.current = sheet)}
            >
              {sheet.name}
            </p>
          ))}
        </div>

        <div
          onDrop={(e) => {
            e.preventDefault();
            handleDrop();
          }}
          ref={ref}
          onDragOver={(e) => e.preventDefault()}
          style={{
            width: "100%",
            margin: "4px",
            display: "grid",
            gridTemplateColumns: gridTemplateColumns,
          }}
          id="myDIV"
        >
          {selectedDashboard?.graph?.map((sheet, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "2px",
              }}
            >
              <Plot
                data={[
                  sheet.graph === "pie"
                    ? {
                        type: sheet?.graph,
                        values: sheet?.row?.values,
                        labels: sheet?.col?.values,
                      }
                    : sheet.graph === "donut"
                    ? {
                        type: "pie",
                        values: sheet?.row?.values,
                        labels: sheet?.col?.values,
                        hole: 0.4,
                      }
                    : sheet.graph === "box"
                    ? {
                        type: sheet?.graph,
                        x: sheet?.col?.values,
                        y: sheet?.row?.values,
                        transforms: [
                          {
                            type: "groupby",
                            groups: sheet?.groupby?.values,
                          },
                          {
                            type: filterType,
                            target: "y",
                            operation: filterOperator,
                            value: filterValue,
                          },
                        ],
                      }
                    : sheet.graph === "funnel"
                    ? {
                        type: sheet?.graph,
                        y: sheet?.col?.values,
                        x: sheet?.row?.values,
                        hoverinfo: "x+percent previous+percent initial",
                        transforms: [
                          {
                            type: "aggregate",
                            aggregations: [
                              {
                                target: "x",
                                func: "sum",
                              },
                            ],
                          },
                          {
                            type: "groupby",
                            groups: sheet?.groupby?.values,
                          },
                          {
                            type: "sort",
                            target: sheet?.row?.values,
                            order: "descending",
                          },
                        ],
                      }
                    : sheet.graph === "scatter"
                    ? {
                        type: sheet?.graph,
                        x: sheet?.col?.values,
                        y: sheet?.row?.values,
                        mode: "markers", //only for the mode scatter has to be written in a diffrent object.
                        transforms: [
                          {
                            type: "aggregate",
                            aggregations: [
                              {
                                target: "y",
                                func: "sum",
                              },
                            ],
                          },
                          {
                            type: filterType,
                            target: "y",
                            operation: filterOperator,
                            value: filterValue,
                          },

                          {
                            type: "groupby",
                            groups: sheet?.groupby?.values,
                          },
                        ],
                      }
                    : sheet.graph === "table"
                    ? {
                        type: sheet?.graph,
                        columnorder: [1, 9],
                        columnwidth: [40, 40],
                        header: {
                          values: [sheet?.col?.key, sheet?.row?.key],
                          align: "center",
                          font: {
                            family: "Roboto",
                            size: 15,
                            color: "Black",
                          },
                        },
                        cells: {
                          values: [sheet?.col?.values, sheet?.row?.values],
                          height: 20,
                          font: {
                            family: "Roboto",
                            size: 13,
                            color: "Black",
                          },
                        },
                      }
                    : sheet.graph === "scattermapbox"
                    ? {
                        type: sheet?.graph,
                        lon: sheet?.col?.values,
                        lat: sheet?.row?.values,
                        mode: "markers",
                        marker: {
                          size: 12,
                        },
                        text: sheet?.text?.values,
                        transforms: [
                          {
                            type: "groupby",
                            groups: sheet?.groupby?.values,
                          },
                        ],
                      }
                    : sheet.graph === "scattergeo"
                    ? {
                        type: sheet?.graph,
                        lon: sheet?.col?.values,
                        lat: sheet?.row?.values,
                        locationmode: {
                          enumerated:
                            "ISO-3" |
                            "Saudi Arabia" |
                            "USA-states" |
                            "country names",
                        },
                        default: "ISO-3",
                        mode: "markers",
                        marker: {
                          size: 12,
                        },
                        text: sheet?.text?.values,
                        transforms: [
                          {
                            type: "groupby",
                            groups: sheet?.groupby?.values,
                          },
                        ],
                      }
                    : sheet.graph === "treemap"
                    ? {
                        type: "treemap",
                        labels: sheet?.row?.values,
                        parents: sheet?.col?.values,
                      }
                    : {
                        type: sheet?.graph,
                        x: sheet?.col?.values,
                        y: sheet?.row?.values,
                        barmode: "stack",
                        transforms: [
                          {
                            type: "aggregate",
                            aggregations: [
                              {
                                target: "y",
                                func: "sum",
                                enabled: true,
                              },
                            ],
                          },

                          {
                            type: filterType,
                            target: "y",
                            operation: filterOperator,
                            value: filterValue,
                          },
                          {
                            type: sort,
                            target: sheet?.row?.values,
                            order: sortType,
                          },
                          {
                            type: "groupby",
                            groups: sheet?.groupby?.values,
                          },
                        ],
                      },
                ]}
                layout={{
                  // autosize: true,
                  xaxis: { title: { text: sheet?.col?.key } },
                  yaxis: { title: { text: sheet?.row?.key } },
                  width: plotWidth,
                  height: plotHeight,
                  fontSize: 2,
                  mapbox: { style: "open-street-map" },
                  title: sheet.name,
                  barmode: "relative",
                  hovermode: "closest",
                  geo: {
                    scope: scopemap,
                    showlakes: true,
                    lakecolor: "rgb(255,255,255)",
                  },
                }}
              />
            </div>
          ))}
          {/* <AddTextModal /> */}
        </div>

      </div>
      <Footer />
    </>
  );
};
export default Dashboard;
