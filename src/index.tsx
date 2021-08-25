import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "antd/dist/antd.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        <Toaster />
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);
