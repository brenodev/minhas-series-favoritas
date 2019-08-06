import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NewSerie = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const onChange = evt => {
    // console.log(evt.target.value)
    setName(evt.target.value);
  };

  const onSave = () => {
    axios
      .post("/api/series", {
        name
      })
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/series" />;
  }

  return (
    <div className="container">
      <h1>Nova Série</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Nome da Série</label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            value={name}
            placeholder="nome da série"
          />
        </div>
        <button onClick={onSave} type="button" className="btn btn-primary">
          Salvar Série
        </button>
      </form>
    </div>
  );
};

export default NewSerie;
