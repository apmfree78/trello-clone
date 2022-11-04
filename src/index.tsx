/* eslint-disable prefer-const */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./context/GlobalContext";
import store from "./state/store";
import { Provider } from "react-redux";
import { saveState } from "./state/localStorage";

// FOR DETAILS ON STATE MANAGEMENT
// please refer to './context/GlobalContext'
// this file contains the Global Context
// which is accessible to all components
// It includes the global state and
// all methods to mutate the state
// including: CRUD and moving cards

//saving state to local storage every 1 second
store.subscribe(() => {
  let timer: any;

  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    saveState(store.getState());
  }, 1000);
});

// rendering App and adding GlobalProvider
// which gives all components access to global state
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </GlobalProvider>
  </React.StrictMode>
);
