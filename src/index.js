import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";

import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import rootSaga from "./services/sagas/rootSaga";
import rootReducer from "./services/reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);

reportWebVitals();
