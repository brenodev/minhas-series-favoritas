import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const EditGenres = ({ match }) => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  // metodo para editar genero
  useEffect(() => {
    axios.get("/api/genres/" + match.params.id).then(res => {
      setName(res.data.name);
    });
  }, [match.params.id]);

  const onChange = evt => {
    // console.log(evt.target.value)
    setName(evt.target.value);
  };

  const onSave = () => {
    axios
      .put("/api/genres/" + match.params.id, {
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
      <h1>Editar Gênero</h1>
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

export default EditGenres;
