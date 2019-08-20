import React, { Component, Fragment } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  //Get All Users
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.GITHUB_FINDER_CLIENT_ID
      }&client_secret=${process.env.GITHUB_FINDER_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  //Get Single User
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.GITHUB_FINDER_CLIENT_ID
      }&client_secret=${process.env.GITHUB_FINDER_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  //Get user repos
  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.GITHUB_FINDER_CLIENT_ID
      }&client_secret=${process.env.GITHUB_FINDER_CLIENT_SECRET}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  //Clear users
  clearUsers = () => this.setState({ users: [], loading: false });

  //Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, loading, alert, repos } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Alert alert={alert} />
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClearButton={
                        this.state.users.length > 0 ? true : false
                      }
                      setAlert={this.setAlert}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <Fragment>
                    <User
                      {...props}
                      getUser={this.getUser}
                      getUserRepos={this.getUserRepos}
                      user={user}
                      repos={repos}
                      loading={loading}
                    />
                  </Fragment>
                )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
