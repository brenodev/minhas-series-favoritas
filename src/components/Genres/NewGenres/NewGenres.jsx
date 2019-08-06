import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NewGenres = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const onChange = evt => {
    // console.log(evt.target.value)
    setName(evt.target.value);
  };

  const onSave = () => {
    axios
      .post("/api/genres", {
        name
      })
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/generos" />;
  }

  return (
    <div className="container">
      <h1>Novo Gênero</h1>
      <p>{name}</p>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Nome do Gênero</label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            value={name}
            placeholder="nome do gênero"
          />
        </div>
        <button onClick={onSave} type="button" className="btn btn-primary">
          Salvar Gênero
        </button>
      </form>
    </div>
  );
};

export default NewGenres;
