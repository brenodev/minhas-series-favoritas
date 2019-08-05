import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

//CUSTOM COMPONENTS
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Genres from './components/Genres/Genres';


const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={Home} />
        <Route path='/generos' component={Genres} />
      </div>
    </Router>
  )
}
export default App;
