import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const Genres = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("api/genres").then(res => {
      setData(res.data.data);
    });
  }, []);

  const deleteGenres = id => {
    axios.delete("/api/genres/" + id).then(res => {
      // console.log(res);
      const filterItem = data.filter(item => item.id !== id);
      setData(filterItem);
    });
  };

  // tranformar um vetor em outro vetor
  const renderRow = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className="btn btn-outline">
            <FontAwesomeIcon
              onClick={() => deleteGenres(record.id)}
              icon={faTrash}
              className="text-danger"
            />
          </button>
          <button className="btn btn-outline">
            <Link to={"/generos/" + record.id}>
              <FontAwesomeIcon icon={faPen} />
            </Link>
          </button>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Gêneros</h1>
        <div className="alert alert-warning" role="alert">
          Você não possui gêneros criados!
        </div>
        <Link to="/generos/novo">
          <button className="btn btn-primary">Novo Genero</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Gêneros</h1>
      <div>
        <Link to="/generos/novo">
          <button className="btn btn-primary">Novo Genero</button>
        </Link>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>{data.map(renderRow)}</tbody>
      </table>
    </div>
  );
};

export default Genres;
