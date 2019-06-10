import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Game from "./Game";
import Scoreboard from "./Scoreboard";

class Navbar extends Component {
  render() {
    return (
       <Router basename="/tebak-angka">
         <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
              <Link to="/" className="nav-link">Game</Link>
            </li>
            <li className="navbar-item">
              <Link to="/scoreboard" className="nav-link">Curriculum Vitae</Link>
            </li>
          </ul>
        </div>
      </nav>
         <div className="container">
      <br/>
      <Route exact path="/" component={Game} />
      <Route path="/scoreboard" component={Scoreboard} />
    </div>
         </div>
    
  </Router>
    );
  }
}
    
    export default Navbar;