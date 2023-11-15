import React, { useContext, useState } from "react";
import Footer from "../components/Sheet/Footer";
import Header from "../components/Headers/Header";
import MLModel from "./ML/MLModel";
import Sidebar from "../components/SideBar/Sidebar";
import Describe from "./DataDisplay/Describe";
import { GlobalContext } from "../GlobalProvider";
const AnalyticsMain = () => {
  const { t } = useContext(GlobalContext);
  const [selectanalytic, setselectanalytic] = useState();
  function handleDataDisplay(e) {
    setselectanalytic(e.target.value);
  }
  function handleMLModel(e) {
    setselectanalytic(e.target.value);
  }
  // const [display, setDisplay] = useState();
  return (
    <>
      <Header />
      <Sidebar />
      <div className="Analytics">
        <div className="typesOfAnalytics">
          <p>{t("Analytics")}</p>
          <hr></hr>

          <button
            className="Analytics_btn"
            onClick={handleDataDisplay}
            value="describe_data"
          >
            {t("Describe Data")}
          </button>
          <br></br>
          <button className="Analytics_btn" onClick={handleMLModel} value="ML">
            {t("ML Model")}
          </button>
          <br></br>
          {/* <button className="Analytics_btn">Insights</button>
  <button className="Analytics_btn">Deploy Model</button>*/}
        </div>
        {selectanalytic === "describe_data" ? (
          <Describe />
        ) : selectanalytic === "ML" ? (
          <MLModel />
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default AnalyticsMain;
