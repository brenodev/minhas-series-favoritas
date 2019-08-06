import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

//CUSTOM COMPONENTS
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Genres from "./components/Genres/Genres";
import NewGenres from "./components/Genres/NewGenres/NewGenres";

const App = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios.get("/api").then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/generos/novo" exact component={NewGenres} />
        <Route path="/generos" exact component={Genres} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
};
export default App;
