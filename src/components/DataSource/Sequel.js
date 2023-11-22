import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import axios from "axios";
import { BASE_URL_NODE } from "../../apiconfig";
const Sequel = () => {
  const {
    queryW,
    setQueryW,
    sequelQuery,
    setSequelQuery,
    setIsOpensql,
    serverDetails,
    setServerDetails,
  } = useContext(GlobalContext);
  function closeModal() {
    setSequelQuery(false);
  }
  const queryGenerator = (e) => {
    const query = {
      connectivity: serverDetails,
      requestQuery: queryW,
    };
    axios
      .post(
        // "http://localhost:5001/api/users/queryGeneration",
        `${BASE_URL_NODE}/api/users/Generation`,
        query
      )
      .then((res) => {})
      .catch((res) => {
        console.log(res);
      });
    setSequelQuery(false);
  };
  return (
    <>
      <Modal
        isOpen={sequelQuery}
        className="sqlquerymodalStyle"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modalTitle">
          <h4 className="modalHeader">SQL Query</h4>
          <button className="modalButton">X</button>
        </div>
        <div>
          <textarea
            type="text"
            onChange={(e) => setQueryW(e.target.value)}
            style={{
              height: "170px",
              width: "500px",
              padding: "10px",
              margin: "5px",
            }}
            placeholder="Enter Your Query"
          ></textarea>
          <br></br>
          <button
            style={{ float: "right" }}
            className="HeaderBtn"
            onClick={queryGenerator}
          >
            Run Query
          </button>
        </div>
      </Modal>
    </>
  );
};
export default Sequel;
