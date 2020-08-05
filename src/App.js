import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


import AddStory from "./components/AddStory";
import Story from "./components/Story";
import StoriesList from "./components/StoriesList";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/stories" className="navbar-brand">
              TodoApp
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/stories"} className="nav-link">Stories</Link>
              </li>
              <li className="nav-item">
                {isAuthenticated && <Link to={"/add"} className="nav-link">Add</Link>} 
              </li>
              <li className="nav-item">
                {isAuthenticated && <Link to={"/profile"} className="nav-link"> Profile </Link>} 
              </li>
              <li className="nav-item">
                {isAuthenticated && <Link to={"/external-api"} className="nav-link"> External api</Link>} 
              </li>
              <li className="nav-item">
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
              </li>
            </div>
          </nav>

          <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/external-api" component={ExternalApi} />
                <PrivateRoute path="/stories" component={StoriesList} />
                <PrivateRoute path="/add" component={AddStory} />
                <PrivateRoute path="/stories/:id" component={Story} />
              </Switch>
          </div>
        </div>
    </Router>
  );
}

export default App;


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="primary"
      className="btn-margin"
    >
      Log In
    </Button>
  );
};

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
      variant="primary"
      className="btn-margin"
    >
      Sign Up
    </Button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
      variant="danger"
      className="btn-margin"
    >
      Log Out
    </Button>
  );
};