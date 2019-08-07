import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//CUSTOM COMPONENTS
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Genres from "./components/Genres/Genres";
import NewGenres from "./components/Genres/NewGenres/NewGenres";
import EditGenres from "./components/Genres/EditGenres/EditGenres";
import Series from "./components/Series/Series";
import NewSerie from "./components/Series/NewSerie/NewSerie";
import InfoSerie from "./components/Series/InfoSerie/InfoSerie";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/generos" exact component={Genres} />
          <Route path="/generos/novo" exact component={NewGenres} />
          <Route path="/generos/:id" exact component={EditGenres} />
          <Route path="/series" exact component={Series} />
          <Route path="/series/novo" exact component={NewSerie} />
          <Route path="/series/:id" exact component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
