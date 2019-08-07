import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faWindowClose } from "@fortawesome/free-solid-svg-icons";

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ""
  });
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("INFO");
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");

  const [data, setData] = useState({});
  useEffect(() => {
    axios.get("/api/series/" + match.params.id).then(res => {
      setData(res.data);
      setForm(res.data);
    });
  }, [match.params.id]);

  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setGenres(res.data.data);
      const genres = res.data.data;
      const encontrado = genres.find(value => data.form === value.name);
      if (encontrado) {
        setGenreId(encontrado.id);
      }
    });
  }, [data]);

  //CUSTOM HEADER
  const masterHeader = {
    height: "50vh",
    minHeight: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  };

  // Setando o genero no select
  const onChangeGenre = evt => {
    setGenreId(evt.target.value);
  };
  //setando metodos em várias funções
  const onChange = field => evt => {
    // console.log(evt.target.value)
    setForm({
      ...form,
      [field]: evt.target.value
    });
  };

  // para selecionar o valor
  const isSelected = value => () => {
    setForm({
      ...form,
      status: value
    });
  };

  //para salvar apos editar serie
  const onSave = () => {
    axios
      .put("/api/series/" + match.params.id, {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/series" />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img
                  className="img-fluid img-thumbnail"
                  src={data.poster}
                  alt={data.name}
                />
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  {data.status === "ASSISTIDO" && (
                    <Badge color="success">Assistido</Badge>
                  )}
                  {data.status === "PARA_ASSISTIR" && (
                    <Badge color="warning">Para assistir</Badge>
                  )}
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <button className="btn btn-outline" onClick={() => setMode("EDIT")}>
          <FontAwesomeIcon className="text-primary" icon={faPen} />
        </button>
        <button className="btn btn-outline" onClick={() => setMode("INFO")}>
          <FontAwesomeIcon className="text-danger" icon={faWindowClose} />
        </button>
      </div>

      {mode === "EDIT" && (
        <div className="container">
          <h1>Editar Série</h1>

          <form action="">
            <div className="form-group">
              <label htmlFor="name">Nome da Série</label>
              <input
                onChange={onChange("name")}
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                placeholder="nome da série"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Comentários</label>
              <input
                onChange={onChange("comments")}
                type="text"
                className="form-control"
                id="name"
                value={form.comments}
                placeholder="nome da série"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="">
                Gênero
              </label>
              <select
                className="form-control"
                onChange={onChangeGenre}
                value={genreId}
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="status"
                id="assistido"
                value="ASSISTIDO"
                checked={form.status === "ASSISTIDO"}
                onChange={isSelected("ASSISTIDO")}
              />
              <label htmlFor="assistido" className="form-check-label">
                Assistido
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="status"
                id="paraAssistir"
                value="PARA_ASSISTIR"
                checked={form.status === "PARA_ASSISTIR"}
                onChange={isSelected("PARA_ASSISTIR")}
              />
              <label htmlFor="assistido" className="form-check-label">
                Para Assistir
              </label>
            </div>
            <button onClick={onSave} type="button" className="btn btn-primary">
              Salvar Série
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
