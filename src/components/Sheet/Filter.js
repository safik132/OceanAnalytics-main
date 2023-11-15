import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { GlobalContext } from "../../GlobalProvider";
import "../../App.css";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Filter() {
  const {
    t,
    selectedSheet,
    setFilterValue,
    setFilterOperator,
    setFilterType,
    modalIsOpenFilter,
    setIsOpenFilter,
    selectValue,
    setSelectValue,
  } = useContext(GlobalContext);
  let subtitle;
  const [x, setX] = useState();

  function openModal(e) {
    setIsOpenFilter(true);
    setFilterType(e.target.value);
    let str = selectedSheet?.row?.values.map((d) => (
      <option className="filterOptions" value={d}>
        {d}
      </option>
    ));
    setSelectValue(str);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "black";
    subtitle.style.fontSize = "15px";
  }

  function closeModal() {
    setIsOpenFilter(false);
  }
  function filterOperators(e) {
    e.preventDefault();
    setFilterOperator(e.target.value);
    if (e.target.value === "select") {
      setFilterOperator(null);
      setFilterValue(null);
      setFilterType(null);
    }
  }
  const filterCheck = (e) => {
    // if (e.which == 13) {
    //   e.preventDefault();
    //   //do something
    // }
    // e.preventDefault();
    setFilterValue(e.target.value);
    // return false;
  };
  const handleApply = (e) => {
    setIsOpenFilter(false);
  };
  return (
    <div>
      <select onClick={openModal} className="all-component-btn">
        <option value="filter">{t("Filters")}</option>
      </select>
      <Scrollbars>
        <Modal
          isOpen={modalIsOpenFilter}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h2 className="title">{t("Filter Data")}</h2>
            <button onClick={closeModal} style={{ cursor: "pointer" }}>
              X
            </button>
          </div>
          <hr></hr>

          {/* <form> */}
          <label>
            {t("Target")}:{selectedSheet?.row?.key}
          </label>
          <br></br>
          <label>{t("Operator")}:</label>
          <select onClick={filterOperators} id="filter">
            <option value="">select</option>
            <option value="select">Null</option>
            <option value="=">=</option>
            <option value="<">{"<"}</option>
            <option value="<=">{"<="}</option>
            <option value=">=">{">="}</option>
            <option value=">">{">"}</option>
          </select>
          <br></br>
          <label onClick={(e) => setFilterValue(e.target.value)}>
            {t("Value")}:
            <input
              type="text"
              placeholder="enter value"
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <select>{selectValue}ss</select>
          </label>
          <br></br>
          <button className="modalApplyBtn" onClick={handleApply}>
            Apply
          </button>
          {/* </form> */}
        </Modal>
      </Scrollbars>
    </div>
  );
}
export default Filter;
