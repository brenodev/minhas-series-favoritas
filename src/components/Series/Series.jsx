import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

const Series = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("api/series").then(res => {
      setData(res.data.data);
    });
  }, []);

  const deleteSerie = id => {
    axios.delete("/api/series/" + id).then(res => {
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
              onClick={() => deleteSerie(record.id)}
              icon={faTrash}
              className="text-danger"
            />
          </button>
          <button className="btn btn-outline">
            <Link to={"/series/" + record.id}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </button>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Séries</h1>
        <div className="alert alert-warning" role="alert">
          Você não possui séries criadas!
        </div>
        <Link to="/series/novo">
          <button className="btn btn-primary">Nova Série</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Séries</h1>
      <div>
        <Link to="/series/novo">
          <button className="btn btn-primary">Nova Série</button>
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

export default Series;
