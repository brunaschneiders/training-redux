import React, { useState } from "react";
import api from "../../Api";
import { useSelector, useDispatch } from "react-redux";
import "../../app.css";

import { saveUserData } from "../../store/user/actions";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  async function handleStoreLogin() {
    await api
      .post("/login", {
        email,
        password,
      })
      .then((response) => dispatch(saveUserData(response.data)))
      .catch((error) => console.log(error));
    setEmail("");
    setPassword("");
  }

  return (
    <div className="box">
      <h2 style={{ margin: 0 }}>Login</h2>
      <br />
      <div>
        <label>
          Email:
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label>
          Senha:
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
      </div>
      <br />
      <button onClick={handleStoreLogin}>Efetuar login</button>
      {!!userData && (
        <div className="response">
          <h4>Login efetuado com sucesso!</h4>
          <div className="boxData">
            <b>UID: </b> {userData.user.uid}
            <br />
            <br />
            <b>Nome: </b> {userData.user.name}
            <br />
            <br />
            <b>Email: </b> {userData.user.email}
            <br />
            <br />
            <b>Token: </b> {userData.token}
          </div>
        </div>
      )}
    </div>
  );
};
