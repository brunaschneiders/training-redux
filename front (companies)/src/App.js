import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import UserRegister from "./components/userRegister";
import Login from "./components/login";
import Companies from "./components/companies";

import "./app.css";

function app() {
  return (
    <Provider store={store}>
      <div className="container">
        <h1 style={{ textDecoration: "underline" }}>
          Cadastro de empresas e funcionários
        </h1>
        <UserRegister></UserRegister>
        <br />
        <Login></Login>
        <br />
        <Companies></Companies>
      </div>
    </Provider>
  );
}

export default app;
