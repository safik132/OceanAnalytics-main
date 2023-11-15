import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../GlobalProvider";
import Modal from "react-modal";
import axios from "axios";
const MLForm = () => {
  const {
    setIsOpe,
    modalIsOpen,
    setIsOpen,
    selectCondition,
    setSelectedCondition,
    setDropValue,
  } = useContext(GlobalContext);
  const [response, setResponse] = useState();
  const [term, setTerm] = useState();

  const [formData, setFormData] = useState({
    Area_Service: "",
    Age: "",
    Gender: "",
    Cultural_group: "",
    Admission_type: "",
    Surg_Description: "",
    EmergencyDept_yes_No: "",
    Tot_charg: "",
    Tot_cost: "",
    Payment_Typology: "",
  });
  const handleChange = (e) => {
    let { id, value } = e.target;
    if (e.target.type === "number") {
      value = parseFloat(e.target.value);
    }
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      Area_Service: formData.Area_Service,
      Age: formData.Age,
      Gender: formData.Gender,
      Cultural_group: formData.Cultural_group,
      Admission_type: formData.Admission_type,
      Surg_Description: formData.Surg_Description,
      EmergencyDept_yes_No: formData.EmergencyDept_yes_No,
      Tot_charg: formData.Tot_charg,
      Tot_cost: formData.Tot_cost,
      Payment_Typology: formData.Payment_Typology,
    };
    // postFormData(newData);
    axios
      .post(
        "https://python-api-productionserver.onrender.com/ml/data/",
        newData
      )
      // .post("http://localhost:8000/ml/data/", newData)
      .then((res) => {
        if (res.data === 1) {
          setTerm("Genuine");
        } else {
          setTerm("Fake");
        }
      })
      .catch((err) => console.log(err));
    openModal();
  };
  const openModal = (e) => {
    const x = document.getElementById("outputbox");
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <form className="ML_Form">
        <div className="two-fields-container">
          <div className="form-group">
            <label className="ML_Form_label">Area Service</label>
            <select
              id="Area_Service"
              className="ML_Form_Dropdown"
              onChange={handleChange}
            >
              <option value="">Area_Service</option>
              <option value="Hudson Valley">Hudson Valley </option>
              <option value="Western NY">Western NY </option>
              <option value="Central NY ">Central NY </option>
              <option value="Capital/Adirond">Capital/Adirond</option>
              <option value="Finger Lakes">Finger Lakes</option>
              <option value="New York City">New York City</option>
              <option value="Southern Tier ">Southern Tier</option>
            </select>
          </div>
          <div className="form-group">
            <label className="ML_Form_label">Age</label>
            <input
              type="number"
              id="Age"
              value={formData.Age}
              onChange={handleChange}
              className="ML_Form_Input"
            />
          </div>
        </div>
        <div className="two-fields-container">
          <div className="form-group">
            <label className="ML_Form_label">Gender</label>
            <select
              id="Gender"
              className="ML_Form_Dropdown"
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option value="M">Male </option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="ML_Form_label">Cultural Group</label>
            <select
              id="Cultural_group"
              className="ML_Form_Dropdown"
              onChange={handleChange}
            >
              <option value="">Cultural_group</option>
              <option value="White">White</option>
              <option value="Black/African American">
                Black/African American
              </option>
              <option value="Other Race">Other Race</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
        </div>
        <div className="two-fields-container">
          <div className="form-group">
            <label className="ML_Form_label">Admission Type</label>
            <select
              id="Admission_type"
              className="ML_Form_Dropdown"
              onChange={handleChange}
            >
              <option value="">Admission_type</option>
              <option value="Emergency">Emergency</option>
              <option value="Elective">Elective</option>
              <option value="Urgent">Urgent</option>
              <option value="Newborn">Newborn</option>
              <option value="Trauma">Trauma</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
          <div className="form-group">
            <label className="ML_Form_label">Surg Description</label>
            <select
              id="Surg_Description"
              className="ML_Form_Dropdown"
              onChange={handleChange}
            >
              <option value="">Surg_Description</option>
              <option value="Medical">Medical</option>
              <option value="Surgical">Surgical</option>
            </select>
          </div>
        </div>
        <div className="two-fields-container">
          <div className="form-group">
            <label className="ML_Form_label">Emerg Department</label>
            <select
              id="EmergencyDept_yes_No"
              className="ML_Form_Dropdown"
              onChange={handleChange}
            >
              <option value="">EmergencyDept_yes_No</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>
          <div className="form-group">
            <label className="ML_Form_label">Total Charge</label>
            <input
              type="number"
              id="Tot_charg"
              onChange={handleChange}
              value={formData.Tot_charg}
              className="ML_Form_Input"
            />
          </div>
        </div>
        <div className="two-fields-container">
          <div className="form-group">
            <label className="ML_Form_label">Total Cost</label>
            <input
              type="number"
              id="Tot_cost"
              onChange={handleChange}
              value={formData.Tot_cost}
              className="ML_Form_Input"
            />
          </div>
          <div className="form-group">
            <label className="ML_Form_label">Payment Typology</label>
            <select
              id="Payment_Typology"
              className="ML_Form_Dropdown"
              onChange={handleChange}
            >
              <option value="">Payment_Typology</option>
              <option value="Medicare">Medicare</option>
              <option value="Medicaid">Medicaid</option>
              <option value="Other Governments">Other Governments</option>
              <option value="Department of Corrections">
                Department of Corrections
              </option>
              <option value="Private Health Insurance">
                Private Health Insurance
              </option>
            </select>
          </div>
        </div>
        <button className="ML_Form_Btn" onClick={handleSubmit}>
          Predict
        </button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        className="modalStyle"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modalTitle">
          <h4 className="modalHeader">Output</h4>
          <button className="modalButton" onClick={closeModal}>
            X
          </button>
        </div>
        <div>
          <p
            style={{
              border: "10px solid black",
              borderRadius: "20px",
              padding: "30px",
              margin: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#5d6d7e",
              color: "white",
            }}
            id="outputbox"
          >
            This Claim is {term}
          </p>
        </div>
      </Modal>
    </>
  );
};
export default MLForm;
