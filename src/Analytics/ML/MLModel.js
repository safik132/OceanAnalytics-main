import React, { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";
import LinearRegression from "./LinearRegression";
import AnalyzeData from "../DataDisplay/AnalyzeData";
import MultipleRegression from "./MultipleRegression";
import MLForm from "./MLForm";

const MLModel = () => {
  const { dataFormat } = useContext(GlobalContext);
  const [display, setDisplay] = useState();

  return (
    <>
      <div className="DataDisplay">
        <div className="display-btn">
          <button
            className="display_btn"
            onClick={(e) => setDisplay(e.target.value)}
            value="describe_data"
          >
            Regression
          </button>
          {/*<button
          className="display_btn"
          value="Multi_regression"
          onClick={(e) => setDisplay(e.target.value)}
        >
          Regression
        </button>
        <button
          className="display_btn"
          value="analyze_data"
          onClick={(e) => setDisplay(e.target.value)}
        >
          Algorithm
  </button>*/}
          <button
            className="display_btn"
            value="ml_form"
            onClick={(e) => setDisplay(e.target.value)}
          >
            Classification
          </button>
        </div>
        {display === "describe_data" ? (
          <LinearRegression />
        ) : display === "Multi_regression" ? (
          <MultipleRegression />
        ) : display === "analyze_data" ? (
          <AnalyzeData />
        ) : display === "ml_form" ? (
          <MLForm />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
export default MLModel;
