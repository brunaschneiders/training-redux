import React, { useState, useEffect } from "react";
import api from "../../Api";

export default () => {
  const [companies, setCompanies] = useState([]);
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");

  // async function handleStoreCompany() {
  //   await api
  //     .post("/companies", {
  //       name,
  //       address,
  //     })
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // }

  useEffect(() => {
    api
      .get("/companies")
      .then((response) => setCompanies(response.data.companies))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="box">
        {/* <h1>Cadastrar empresa</h1>
        <label>
          Nome
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </label>
        <label>
          Endereço
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </label>
        <button onClick={handleStoreCompany}>Cadastrar empresa</button> */}
        <h2 style={{ margin: 0 }}>Empresas cadastradas</h2>
        <ul>
          {companies.map((company) => (
            <li key={company.uid}> {company.name} </li>
          ))}
        </ul>
      </div>
    </>
  );
};
