import React, { useState } from "react";
import api from "../../Api";
import "../../app.css";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");

  async function handleStoreUser() {
    await api
      .post("/users", {
        name,
        email,
        password,
      })
      .then((response) => setUserData(response.data))
      .catch((error) => console.log(error));
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="box">
      <h2 style={{ margin: 0 }}>Cadastro de Usuário</h2>
      <br />
      <div>
        <label>
          Nome:
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </label>
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
      {console.log(userData)}
      <button onClick={handleStoreUser}>Cadastrar usuário</button>
      {!!userData && (
        <div className="response">
          <h4>Cadastro efetuado com sucesso!</h4>
          <div className="boxData">
            <b>UID: </b> {userData.user.uid}
            <br />
            <br />
            <b>Nome: </b> {userData.user.name}
            <br />
            <br />
            <b>Email: </b> {userData.user.email}
          </div>
        </div>
      )}
    </div>
  );
};
