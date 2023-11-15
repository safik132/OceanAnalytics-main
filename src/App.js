import React, { useContext } from "react";
import Home from "./Home";
import Sheet from "./components/Sheet/Sheet";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route, Switch, Router } from "react-router-dom";
import Datasource from "./components/DataSource/Datasource";
import Story from "./components/Story/Story";
import "./App.css";
import AnalyticsMain from "./Analytics/AnalyticsMain";
import { Provider } from "react-redux";
import { GlobalContext } from "./GlobalProvider";
import Logins from "./components/auth/Logins";
import Otp from "./components/auth/Otp";
import PrivateRoutes from "./components/private-route/PrivateRoutes";

const App = () => {
  const {} = useContext(GlobalContext);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Otp" element={<Otp />} />

          <Route element={<PrivateRoutes />}>
            <Route exact path="/Sheet/:sheet" element={<Sheet />} />
            <Route exact path="/dashboard/:dashboard" element={<Dashboard />} />
            <Route exact path="/story/:story" element={<Story />} />
            <Route path="Datasource" element={<Datasource />} />
            <Route path="AnalyticsMain" element={<AnalyticsMain />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
