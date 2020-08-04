import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import AddStory from "./components/AddStory";
import Story from "./components/Story";
import StoriesList from "./components/StoriesList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/stories" className="navbar-brand">
            TodoApp
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/stories"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/stories"]} component={StoriesList} />
              <Route exact path="/add" component={AddStory} />
              <Route path="/stories/:id" component={Story} />
            </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;