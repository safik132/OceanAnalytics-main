import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
ReactDOM.render(
  <BrowserRouter>
    <GlobalProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
      ,
    </GlobalProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
