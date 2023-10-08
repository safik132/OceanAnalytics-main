import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { pickBy, keys, max, isEmpty } from "lodash";
import * as XLSX from "xlsx";
import { GlobalContext } from "../../GlobalProvider";
import "../../App.css";
import { useParams } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import axios from "axios";

function getDataRange(data) {
  const dataWithValues = pickBy(data, (value, key) => !!value.v);
  const cellNamesWithValues = keys(dataWithValues);
  const cellsWithValues = cellNamesWithValues.map((cell) =>
    XLSX.utils.decode_cell(cell)
  );
  const maxRow = max(cellsWithValues.map((cell) => cell.r));
  const maxColumn = max(cellsWithValues.map((cell) => cell.c));
  // console.log(maxRow, maxColumn);
  const lastCellName = XLSX.utils.encode_cell({ c: maxColumn, r: maxRow });
  return `A1:${lastCellName}`;
}

const ImportExcel = (props) => {
  const [switchSheet, setswitchSheet] = useState(1);
  const [switchDashboard, setswitchDashboard] = useState(1);
  const [switchStory, setswitchStory] = useState(1);
  const [addedFile, setAddedFile] = useState(false);
  const [work, setworksheet] = useState();
  const [datas, setalldata] = useState([]);

  let { nullCount, setNullCount } = useContext(GlobalContext);
  const {
    setColumns,
    sheets,
    setSheets,
    selectedSheet,
    setSelectedWB,
    setSelectedWBSheet,
    setDashboards,
    setNumberofRows,
    setNumberofColumns,
    numberofRows,
    numberofColumns,
    setallUnique,
    setDataFormat,
    setDataType,
    setStorys,
    loading,
    setLoading,
    setBufferingModal,
    fileName,
    setFileName,
  } = useContext(GlobalContext);

  const sheetParam = useParams().sheet;
  const dashboardParam = useParams().dashboard;

  const acceptableFileName = ["xlsx", "xls", "csv", "owbx"];

  const isFileSupported = (name) => {
    return acceptableFileName.includes(
      name
        .split(".")
        .pop()
        .toLowerCase()
    );
  };

  const getFileName = (file) =>
    file.name
      .split(".")
      .slice(0, -1)
      .join(".");
  const processData = (wsname, dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const keys = dataStringLines[0].split(",");
    const values = dataStringLines;
    values.shift();
    let obj = {};
    for (let i = 0; i < values.length; i++) {
      let k = 0;
      const element = values[i].split(",");
      for (let inele = 0; inele < element.length; inele++) {
        let each = element[inele];
        if (!isNaN(Number(each))) each = Number(each);
        let old = obj[keys[k]];
        if (old !== undefined) {
          old.push(each);
          obj[keys[k]] = old;
        } else obj[keys[k]] = [each];
        k++;
      }
    }
    let eachSheet = {};
    eachSheet[wsname] = { ...obj };
    setDataFormat(obj);
    setLoading(false);
    return obj;
  };
  const readDataFromExcel = (data) => {
    const wb = XLSX.read(data);
    var mySheetData = {};
    let nulla = [];
    //Loop through the sheets
    for (var i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i];
      const worksheet = wb.Sheets[sheetName];
      worksheet["!ref"] = getDataRange(worksheet);
      var range = XLSX.utils.decode_range(worksheet["!ref"]);
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        header: 1,
        cellDates: true,
        dateNF: "dd.mm.yyyy",
      });
      const reelData = XLSX.utils.sheet_to_csv(worksheet, {
        raw: false,
        header: 1,
        cellDates: true,
        dateNF: "dd.mm.yyyy",
      });
      processData(sheetName, reelData);
      mySheetData[sheetName] = jsonData;
      /* This is to get number of null values*/
      for (const cell in worksheet) {
        // console.log(cell);
        if (cell[0] === "!") continue;
        const value = worksheet[cell].v;
        if (value === null) {
          console.log(`Found null value at ${cell}`);
        }
      }
      jsonData.forEach((element, index) => {
        for (let i = 0; i < element.length; i++) {
          if (typeof element[i] === "undefined") {
            setNullCount((nullCount += 1));
          }
        }
      });

      setColumns(jsonData[0]);
      setNumberofColumns(range.e.c);
      setNumberofRows(range.e.r);
      setworksheet(range);
    }
    return mySheetData;
  };

  const processAgainFile = (jsondata, worksheet) => {
    setBufferingModal(false);
    setLoading(false);
    let sheet = jsondata.sheetParam;
    let dashboard = jsondata.dashboardParam;
    let story = jsondata.storyParam;
    if (sheet) {
      let totalSheetSize = sheet.length;
      let numberToSwitch = sheet.substring(totalSheetSize);
      if (sheet === undefined) setswitchSheet(1);
      setswitchSheet(Number(numberToSwitch));
    }
    if (dashboard) {
      let totalDashboardSize = dashboard.length;
      let numberToSwitchDashboard = dashboard.substring(totalDashboardSize);
      if (dashboard === undefined) setswitchDashboard(1);
      setswitchDashboard(Number(numberToSwitchDashboard));
    }
    if (story) {
      let totalStorySize = story.length;
      let numberToSwitchStory = story.substring(totalStorySize);
      if (story === undefined) setswitchStory(1);
      setswitchStory(Number(numberToSwitchStory));
    }
    // setColumns(jsondata.columns);
    setSheets(jsondata.globalData);
    setDashboards(jsondata.dashboards);
    setStorys(jsondata.storys);
    setSelectedWB(jsondata.allSheetsData);
    setAddedFile(true);
  };
  const sendFileToBackend = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(
        "https://python-api-productionserver.onrender.com/api/uploadfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // console.log('File uploaded successfully:', res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };
  const handleUploadFile = async (e) => {
    const myFile = e.target.files[0];
    setFileName(myFile.name);
    setLoading(true);
    setBufferingModal(true);
    var idx = myFile.name.lastIndexOf(".");
    var filetype = idx < 1 ? "" : myFile.name.substr(idx + 1);
    sendFileToBackend(myFile);
    if (filetype === "owbx") {
      const reader = new FileReader();
      reader.onload = (event) => {
        let text = event.target.result;
        const PARSEDTEXT = JSON.parse(text);
        processAgainFile(PARSEDTEXT);
      };
      reader.readAsText(e.target.files[0]);
    } else {
      //Read Xlsx file
      const data = await myFile.arrayBuffer();
      const tdata = await myFile.text();
      let CdataType = [];
      const mySheetData = readDataFromExcel(data);
      const realData = processData(myFile.name, tdata);
      const tempSheets = sheets.map((sheet) =>
        sheet.name === sheetParam
          ? {
              ...sheet,
              workbooks: [
                ...sheet.workbooks,
                {
                  fileName: getFileName(myFile),
                  workbook: mySheetData,
                  numberofRows: numberofRows,
                  numberofColumns: numberofColumns,
                  nullCount: nullCount,
                },
              ],
              realData: realData,
            }
          : sheet
      );
      for (const key in realData) {
        let unique = realData?.[key].filter(
          (item, i, ar) => ar.indexOf(item) === i
        );

        realData?.[key].forEach((element, index) => {
          for (let i = 0; i < element.length; i++) {
            if (element === 0) {
              // setNullCount((nullCount += 1));
            }
          }
        });
        setallUnique((prev) => [...prev, unique]);

        if (typeof realData[key][0] === "string") {
          CdataType.push("Categorical");
          setDataType(CdataType);
        } else {
          //show in measures...
          CdataType.push("Numerical");
          setDataType(CdataType);
        }
      }
      setSheets(tempSheets);
      setSelectedWB(mySheetData);
      setSelectedWBSheet(Object.keys(mySheetData)[0]);
    }
    if (!myFile) return;
    if (!isFileSupported(myFile.name)) {
      alert("Invalid file type");
      return;
    }
  };
  const handleWorkBookChange = (event, data) => {
    const wb = selectedSheet.workbooks.find(
      (wb) => wb.fileName === event.target.value
    );
    setSelectedWB(wb.workbook);
    setSelectedWBSheet(Object.keys(wb.workbook)[0]);
  };
  const handleSheetChange = (event) => {
    setSelectedWBSheet(event.target.value);
  };

  return (
    <Row>
      <Col>
        {/* <input
          type="file"
          accept="xlsx,xls,csv"
          onChange={(e) => handleUploadFile(e)}
          style={{ display: "block" }}
        /> */}
        <label class="custom-file-upload">
          <input
            type="file"
            accept="xlsx,xls,csv"
            onChange={(e) => handleUploadFile(e)}
          />
          Import Data
        </label>

        <div
          className="fileName"
          style={{ display: "block", cursor: "pointer" }}
        >
          {!isEmpty(selectedSheet) &&
            !isEmpty(selectedSheet.workbooks) &&
            selectedSheet.workbooks.map((wb, index) => (
              <button
                className="fileName"
                style={{ display: "block", cursor: "pointer" }}
                onClick={handleWorkBookChange}
                key={index}
                value={wb.fileName}
              >
                {wb.fileName}
              </button>
            ))}
        </div>
      </Col>
    </Row>
  );
};

export default ImportExcel;
