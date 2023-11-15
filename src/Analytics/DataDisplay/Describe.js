import React, { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { pickBy, keys, max, isEmpty } from "lodash";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaTrash } from "react-icons/fa";

const Describe = () => {
  let { nullCount, setNullCount, t } = useContext(GlobalContext);
  const {
    selectedWB,
    selectedWBSheet,
    numberofColumns,
    numberofRows,
    setNumberofColumns,
    setNumberofRows,
    dataType,
    allUnique,
  } = useContext(GlobalContext);
  function handleNullDelete() {
    selectedWB[selectedWBSheet].forEach((element, index) => {
      for (let i = 0; i < element.length; i++) {
        if (typeof element[i] === "undefined") {
          const s = selectedWB[selectedWBSheet].splice(index, 1);
          const sa = selectedWB[selectedWBSheet].filter((test) =>
            console.log(typeof test[i])
          );
        }
      }
    });
    alert(`${nullCount} rows deleted`);
    setNumberofRows(numberofRows - nullCount);
    setNumberofColumns(numberofColumns);
    setNullCount(0);
  }

  return (
    <>
      <div className="NumberOfRowsnColumns">
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0px",
            fontSize: "18px",
          }}
        >
          {t("No of Rows")}:{numberofRows}
          || {t("No of Columns")}:{numberofColumns + 1}
          || {t("No of Null Values")}:{nullCount}
          <FaTrash
            style={{
              cursor: "pointer",
            }}
            id="row"
            onClick={handleNullDelete}
          />
        </p>
        <Scrollbars>
          <div
            style={{
              alignItems: "center",
            }}
          >
            {/* Table */}
            {selectedWB && selectedWB[selectedWBSheet] && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <table
                  style={{
                    border: "1px solid black",
                    fontSize: "18px",
                    background: "none",
                    width: "70%",
                    height: "400px",
                    padding: "5px",
                    marginTop: "18px",
                  }}
                >
                  <thead
                    className="header"
                    style={{
                      margin: "1px 1px 1px 1px",
                      border: "1px solid blue",
                    }}
                  >
                    <th style={{ border: "2px solid black", width: "230px" }}>
                      Fields
                    </th>
                    <th style={{ border: "2px solid black" }}>DataType</th>
                    <th style={{ border: "2px solid black" }}>Null</th>
                    <th style={{ border: "2px solid black" }}>Unique</th>
                  </thead>
                  <tbody
                    style={{
                      fontSize: "15px",
                      marginLeft: "20px",
                      width: "10px",
                    }}
                  >
                    <th
                      style={{
                        borderRight: "3px solid black",
                      }}
                    >
                      <tr className="analyticsTR0">
                        {selectedWB[selectedWBSheet][0].map((h, idx) => (
                          <tr className="analyticsTR" key={idx}>
                            {h}
                          </tr>
                        ))}
                      </tr>
                    </th>
                    <th
                      style={{
                        borderRight: "3px solid black",
                      }}
                    >
                      <tr className="analyticsTR0">
                        {dataType.map((h, idx) => (
                          <tr className="analyticsTR" key={idx}>
                            {h}
                          </tr>
                        ))}
                      </tr>
                    </th>
                    <th
                      style={{
                        borderRight: "3px solid black",
                      }}
                    >
                      <tr className="analyticsTR0">
                        {allUnique.map((h, idx) => (
                          <tr className="analyticsTR" key={idx}>
                            {h.length}
                          </tr>
                        ))}
                      </tr>
                    </th>
                    <th
                      style={{
                        borderRight: "3px solid black",
                      }}
                    >
                      <tr className="analyticsTR0">
                        {allUnique.map((h, idx) => (
                          <tr className="analyticsTR" key={idx}>
                            {h.length}
                          </tr>
                        ))}
                        {/* {allUnique.map((h, idx) => (
                          <select className="analyticsTR" key={idx}>
                            {h.map((x) => (
                              <option>{x}</option>
                            ))}
                          </select>
                        ))} */}
                      </tr>
                    </th>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Scrollbars>
      </div>
    </>
  );
};
export default Describe;
