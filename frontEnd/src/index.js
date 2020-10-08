import React from "react";
import ReactDOM from "react-dom";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@syncfusion/ej2/material.css";

import "./index.css";
import { Provider } from "react-redux";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import LoadingIndicator from "./LoadingIndicator";

import store from "./store";
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <Provider store={store}>
    <LoadingIndicator />
    <BrowserRouter>
    <App />
    </BrowserRouter>
   
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
