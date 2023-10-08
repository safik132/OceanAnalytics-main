import React, { useContext, useRef, useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import Footer from "../Sheet/Footer";
import Header from "../Headers/Header";
import Filter from "../Sheet/Filter";
import { Link, useLocation } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import Sidebar from "../SideBar/Sidebar";
import Menu from "../../Menu";
const Dashboard = () => {
  const dragItem = useRef();
  const [scopemap, setScopeMap] = useState();

  const {
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
    pathlocation,
    setPathLocation,
  } = useContext(GlobalContext);

  const dashboardParam = useParams().dashboard;

  const handleDrop = (index) => {
    const dragSheet = dragItem.current;
    const updatedDashboard = dashboards.find(
      (dashboard) => dashboard.name === dashboardParam
    );
    updatedDashboard.graphs[index] = dragSheet;
    const tempDashboards = dashboards.map((dashboard) =>
      dashboard.name === dashboardParam ? updatedDashboard : dashboard
    );
    setDashboards(tempDashboards);
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
      document.getElementById("myDIV").style.width = "1500px";
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
  };

  useEffect(() => {
    setSelectedDashboard(dashboards.find((s) => s.name === dashboardParam));
  }, [dashboardParam, selectedDashboard]);
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
        </select>
        <Filter />
      </div>
      <div className="Dashboard" style={{ height: "80vh" }}>
        <div className="Sheets">
          <p style={{ fontSize: "18px", padding: "8px", textAlign: "center" }}>
            Sheets
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
          className="AllSheets"
          id="myDIV"
          style={{
            margin: "2px",
            overflow: "hidden",
          }}
        >
          {selectedDashboard?.graphs.map((sheet, index) => (
            <div
              droppable
              onDrop={() => handleDrop(index)}
              onDragOver={(e) => e.preventDefault()}
              className="graphDrop"
              style={{
                border: "1px solid #ccc",
                width: "424px",
                height: "290px",
                overflow: "hidden",
                borderRadius: "8px",
                margin: "2px",
              }}
            >
              <Plot
                style={{
                  width: "426px",
                  height: "250px",
                }}
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
                  // width: 440,
                  height: 302,
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
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Dashboard;
