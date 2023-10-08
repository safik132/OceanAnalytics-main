import React, { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";
import Modal from "react-modal";

const Weatherapi = () => {
  const [to, setTo] = useState([]);
  const [wedata, setWedata] = useState({
    date: "",
    temperature: "",
  });
  const api = {
    key: "5140ce738ad6e15903ea35381152d6b6",
    base: "https://pro.openweathermap.org/data/2.5/",
  };
  const {
    serchwithCity,
    setSearchwithCity,
    sheets,
    setSelectedWB,
    setSelectedWBSheet,
    setSheets,
    queryW,
    setQueryW,
    sequelQuery,
    setSequelQuery,
    setLatforWeather,
    lonforWeather,
    latforWeather,
    setLonforWeather,
    modalforWeather,
    setModalforWeather,
  } = useContext(GlobalContext);
  function closeModal() {
    setModalforWeather(false);
  }
  const fetchData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latforWeather}&lon=${lonforWeather}&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        const z = result.list[0];
        const temp = [];
        const dt = [];
        const col = Object.keys(z);
        const yo = [col];
        const zx = result.list.map((x, index) => {
          var date = new Date(x.dt * 1000);
          const st = date.toString().substr(0, 15);
          const you = x.main.temp - 273;
          const removeDecimal = you.toFixed(2);
          const weather = x.weather[0].main;
          const clouds = x.clouds.all;
          const wind = x.wind.speed;
          const visibility = x.visibility;
          const pop = x.pop;
          const sys = x.sys.pod;
          const country = result.city.country;
          yo.push([
            st,
            removeDecimal,
            weather,
            clouds,
            wind,
            visibility,
            pop,
            sys,
            country,
          ]);
        });
        // yo.push(dt);
        // yo.push(temp);
        // setTo(yo);
        const obj1 = {
          date: dt,
          temperature: temp,
        };
        // setWedata(obj);
        const tempSheets = sheets.map((sheet) =>
          sheet.name === "sheet"
            ? {
                ...sheet,
                workbooks: [
                  ...sheet.workbooks,
                  {
                    fileName: result.city.name,
                    workbook: {
                      Sheet1: yo,
                    },
                  },
                ],
              }
            : sheet
        );
        const obj = {
          Sheet1: yo,
        };
        setSheets(tempSheets);
        setSelectedWB(obj);
        setSelectedWBSheet("Sheet1");
      });
  };
  const fetchDataforSingleCity = () => {
    fetch(
      // `https://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&appid=a78e115673106c6bd2caf5be94523cd6`
      `https://api.openweathermap.org/data/2.5/weather?q=${serchwithCity}&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        const z = result;
        const col = Object.keys(z);
        const yo = [col];
        const zxs = result;
        const coord = result.coord.lon;
        const weather = result.weather[0].main;
        const base = result.base;
        var date = new Date(result.dt * 1000);
        const stDate = date.toString().substr(0, 15);
        const temp = result.main.temp - 273;
        const removeDecimal = temp.toFixed(2);
        const visibility = result.visibility;
        const wind = result.wind.speed;
        const sys = result.sys.country;
        const timezone = result.timezone;
        const id = result.id;
        const name = result.name;
        const clouds = result.clouds.all;
        const cod = result.cod;
        yo.push([
          coord,
          weather,
          base,
          removeDecimal,
          visibility,
          wind,
          clouds,
          stDate,
          sys,
          timezone,
          id,
          name,
          cod,
        ]);
        const tempSheets = sheets.map((sheet) =>
          sheet.name === "sheet"
            ? {
                ...sheet,
                workbooks: [
                  ...sheet.workbooks,
                  {
                    fileName: result.name,
                    workbook: {
                      Sheet1: yo,
                    },
                  },
                ],
              }
            : sheet
        );
        const obj = {
          Sheet1: yo,
        };
        setSheets(tempSheets);
        setSelectedWB(obj);
        setSelectedWBSheet("Sheet1");
      });
  };
  const handleSubmit = (e) => {
    var current = document.getElementById("Current");
    var forecast = document.getElementById("forecast");
    if (e.target.value === "current weather") {
      if (current.style.display === "none") {
        current.style.display = "flex";
        forecast.style.display = "none";
      }
    }
    if (e.target.value === "forecast") {
      if (forecast.style.display === "none") {
        forecast.style.display = "flex";
        current.style.display = "none";
      }
    }
  };
  return (
    <>
      <Modal
        isOpen={modalforWeather}
        className="sqlquerymodalStyle"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modalTitle">
          <h4 className="modalHeader">Fetch Weather Data</h4>
          <button className="modalButton">X</button>
        </div>
        <div>
          <select onChange={handleSubmit}>
            <option value="">select</option>

            <option value="forecast">Forecast</option>
            <option value="current weather">Current Weather</option>
          </select>
          <div id="forecast" style={{ display: "none" }}>
            <input
              value={latforWeather}
              onChange={(e) => setLatforWeather(e.target.value)}
              type="number"
              placeholder="latitude"
            />
            <input
              value={lonforWeather}
              onChange={(e) => setLonforWeather(e.target.value)}
              type="number"
              placeholder="longitude"
            />
            <button
              style={{ float: "right", width: "auto" }}
              className="HeaderBtn"
              onClick={fetchData}
            >
              Submit
            </button>
          </div>
          <br></br>
          <div id="Current" style={{ display: "none" }}>
            <input
              value={serchwithCity}
              onChange={(e) => setSearchwithCity(e.target.value)}
              type="text"
              placeholder="City Name"
            />
            <button
              style={{ float: "right", width: "auto" }}
              className="HeaderBtn"
              onClick={fetchDataforSingleCity}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Weatherapi;
