import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import Home from './pages/home';
import Features from './pages/features';
import Pricing from './pages/pricing';
import Contact from './pages/contact';
import MoviesBoard from './pages/movies';
import MovieDetails from './pages/movieDetails';
import LoginForm from './pages/login';
import RegisterForm from './pages/register';
import AddMovie from './pages/addNew';


class Fkj extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">Movies Board</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/features">Features</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
          </ul>
        </nav>
        <main className="container">
          <div className="starter-template">
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/movies/new" component={AddMovie} />
              <Route path="/movies/:title" component={MovieDetails} />
              <Route path="/movies" component={MoviesBoard} />
              <Route path="/features" component={Features} />
              <Route path="/features/:id" component={Features} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/contact" component={Contact} />
              <Redirect from="/" exact to="/movies" />

              <Route path="/404" render={() => <h1>not found</h1>} />
              <Route exact path="/" component={Home} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Fkj;
