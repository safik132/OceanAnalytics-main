import React, { useContext, useRef, useState, useEffect } from "react";
import { GlobalContext } from "../../GlobalProvider";
import Footer from "../Sheet/Footer";
import Header from "../Headers/Header";
import ImportExcel from "../Sheet/ImportExcel";
import { BsArrowDownCircleFill } from "react-icons/bs";
import Bufferingwindow from "../Sheet/Bufferingwindow";
import { pickBy, keys, max, isEmpty } from "lodash";
import "../../App.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import Weatherapi from "./Weatherapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL_NODE } from "../../apiconfig";
const Datasource = () => {
  const dragItem = useRef();
  const {
    t, //as a transaltor
    selectedWBSheet,
    selectedWB,
    setSelectedWB,
    setSelectedWBSheet,
    dbname,
    serverDetails,
    sheets,
    dbTableNames,
    setSheets,
    setdbTableNames,
    databaseNames,
    setdatabaseName,
    loading,
    setLoading,
    setBufferingModal,
  } = useContext(GlobalContext);
  const [value, setValue] = useState(50);
  const [sheet1, setSheet1] = useState();
  const [sheet2, setSheet2] = useState();
  const [interSection, setInterSection] = useState();

  const handleSheetChange = (e) => {
    setSelectedWBSheet(e.target.value);
  };
  const dragValue = dragItem.current;

  const handleDrop = (e) => {
    e.preventDefault();
    const dragValue = dragItem.current;
    if (!sheet1) setSheet1(dragValue);
    else {
      setSheet2(dragValue);
      getJoinedData(selectedWB, sheet1, dragValue);
    }
  };

  const getInter = () => {
    var x = document.getElementById("interSection");
    if (x.style.display === "none") {
      getIntersection(selectedWB, sheet1, dragValue);
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };
  const getIntersection = (wb, sh1, sh2) => {
    if (wb && sh1 && sh2) {
      const commonCol = wb[sh1][0].filter((value) =>
        wb[sh2][0].includes(value)
      );
      const sh1ColIndex = wb[sh1][0].findIndex((col) => col === commonCol);

      const sh2ColIndex = wb[sh2][0].findIndex((col) => col === commonCol);
      let joinedSheets = [];
      commonCol.forEach((sh1Row, index) => {
        if (sh1ColIndex === sh2ColIndex);
        joinedSheets.push([...new Set([commonCol])]);
      });
      setInterSection(joinedSheets);
      // setWorkbook(joinedSheets);
    }
  };

  const getJoinedData = (wb, sh1, sh2) => {
    if (wb && sh1 && sh2) {
      const commonCol = wb[sh1][0].filter((value) =>
        wb[sh2][0].includes(value)
      )[0];
      const sh1ColIndex = wb[sh1][0].findIndex((col) => col === commonCol);
      const sh2ColIndex = wb[sh2][0].findIndex((col) => col === commonCol);
      const joinedSheet = [];
      wb[sh1].forEach((sh1Row, index) =>
        wb[sh2].forEach((sh2Row) => {
          if (sh2Row[sh2ColIndex] === wb[sh1][index][sh1ColIndex])
            joinedSheet.push([...new Set([...sh1Row, ...sh2Row])]);
        })
      );
      const updatedWorkbook = { ...wb };
      updatedWorkbook[`${sh1}_${sh2}`] = joinedSheet;
      setSelectedWB(updatedWorkbook);
    }
  };
  const handleUnion = (e) => {
    var x = document.getElementById("Union");
    if (x.style.display === "none") {
      getJoinedData(selectedWB, sheet1, dragValue);
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  };

  const handleConnectivity = (e) => {
    const databaseName = {
      connectivity: serverDetails,
      databaseName: e.target.value,
    };
    setdatabaseName(e.target.value);
    axios
      .post(
        // "http://localhost:5001/api/users/database",
        `${BASE_URL_NODE}/api/users/database`,
        databaseName
      )
      .then((res) => {
        const t = res.data;
        const col = Object.keys(t);
        const yo = [];
        const x = res.data.map((pop) => {
          const y = Object.values(pop);
          yo.push(y);
        });
        // setdbNames(yo);
        setdbTableNames(yo);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const handleTableConnectivity = (e) => {
    const dbandTable = {
      connectivity: serverDetails,
      databaseName: databaseNames,
      databaseTableName: e.target.value,
    };
    axios
      .post(
        // "http://localhost:5001/api/users/databaseTable",
        `${BASE_URL_NODE}/api/users/databaseTable`,
        dbandTable
      )
      .then((res) => {
        const t = res.data[0];
        const col = Object.keys(t);
        const yo = [col];
        const x = res.data.map((pop) => {
          const y = Object.values(pop);
          yo.push(y);
        });
        const mySheetData = yo;
        const realData = res.data;
        const tempSheets = sheets.map((sheet) =>
          sheet.name === "sheet"
            ? {
                ...sheet,
                workbooks: [
                  ...sheet.workbooks,
                  {
                    fileName: e.target.value,
                    workbook: {
                      Sheet1: yo,
                    },
                  },
                ],
                realData: realData,
              }
            : sheet
        );
        const obj = {
          Sheet1: yo,
        };
        setSheets(tempSheets);
        setSelectedWB(obj);
        setSelectedWBSheet("Sheet1");
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const notify = () => toast("No More Rows");

  function handleSeeMore() {
    if (selectedWB[selectedWBSheet].length < value) {
      notify();
    } else {
      setValue(value + 100);
      setLoading(true);
    }
  }
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);
  return (
    <>
      <Header />
      <Sidebar />
      <Weatherapi />
      <div className="dataSource" style={{ height: "87vh" }}>
        <div className="dataSourcesheets">
          <p>{t("Sheets")}</p>
          <hr></hr>
          <ImportExcel />
          <ToastContainer />
          <hr />
          <select
            id="schema"
            style={{ display: "block" }}
            onChange={handleConnectivity}
          >
            {!isEmpty(dbname) &&
              dbname.map((database) => (
                <option key={database} value={database}>
                  {database}
                </option>
              ))}
          </select>
          <select
            id="schema"
            style={{ display: "block" }}
            onChange={handleTableConnectivity}
          >
            {!isEmpty(dbTableNames) &&
              dbTableNames.map((database) => (
                <option key={database} value={database}>
                  {database}
                </option>
              ))}
          </select>
          {/* {dbname.map((x) => x)} */}
          {!isEmpty(selectedWB) && (
            <div className="fileName" style={{ display: "block" }}>
              {Object.keys(selectedWB).map((sheet, idx) => (
                <div key={idx}>
                  <input
                    type="checkBox"
                    checked={sheet === selectedWBSheet}
                    name="sheetName"
                    value={sheet}
                    onChange={handleSheetChange}
                  ></input>
                  <span
                    draggable
                    onDragStart={() => (dragItem.current = sheet)}
                  >
                    {sheet}
                  </span>
                </div>
              ))}
            </div>
          )}
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "70px",
              cursor: "pointer",
              fontSize: "15px",
              borderRadius: "10px",
            }}
            onClick={handleUnion}
          >
            <img
              src="./images/union.png"
              style={{ width: "30px", height: "30px" }}
            />
            {t("Union")}
          </button>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "70px",
              cursor: "pointer",
              fontSize: "15px",
              borderRadius: "10px",
              marginTop: "5px",
            }}
            onClick={getInter}
          >
            <img
              src="./images/union.png"
              style={{ width: "30px", height: "30px" }}
            />
            {t("InterSection")}
          </button>
        </div>

        <div className="dropFile">
          {/* <div
            droppable
            className="dropBlock"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            File Drop box
          </div> */}
          <div className="UnionFiles" id="Union">
            <div
              className="UnionFile1"
              droppable
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {/* <span>UnionFiles</span> */}
              <span>{sheet1}</span>
            </div>
            <div className="interSection" id="interSection">
              {interSection}
            </div>
            <div
              className="UnionFile2"
              droppable
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {/* <span>Sheet2:</span> */}
              <span style={{ height: "300px" }}>{sheet2}</span>
            </div>
          </div>
          <Scrollbars>
            {selectedWB && selectedWB[selectedWBSheet] && (
              <div className="table">
                <table className="headerKeys">
                  <thead>
                    <tr className="header">
                      {selectedWB[selectedWBSheet][0].map((h, idx) => (
                        <th className="Keys" key={idx}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <Bufferingwindow />
                    ) : (
                      selectedWB[selectedWBSheet]
                        .slice(1, value)
                        .map((row, index) => (
                          <tr key={index} className="Keys">
                            {row.map((c, idx) => (
                              <td className="Keys" key={idx}>
                                {c}
                              </td>
                            ))}
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
                <button onClick={handleSeeMore} style={{ width: "auto" }}>
                  See more
                  {/* <FaRegUserCircle /> */}
                  <BsArrowDownCircleFill />
                </button>
              </div>
            )}
          </Scrollbars>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Datasource;
