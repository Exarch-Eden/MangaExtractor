// third-party libraries
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// components
import App from "./App";
import Store from "./redux/store";

// css
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
