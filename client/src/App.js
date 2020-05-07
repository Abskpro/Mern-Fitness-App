import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import {setCurrentUser, logoutUser} from './actions/authActions';
import {Provider} from 'react-redux';
import store from './store';

import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import MakeExercise from './components/dashboard/Make_exercise.js';
import Exercises from './components/dashboard/exercises.component.js';
import Profileform from './components/dashboard/Form.component.jsx';
import Profile from './components/dashboard/Profile.component.jsx';
import './styles/add_exercise.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = './login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard/" component={MakeExercise} />
              <PrivateRoute
                exact
                path="/dashboard/log/"
                component={Exercises}
              />
              <PrivateRoute exact path="/profileform" component={Profileform} />
              <PrivateRoute
                exact
                path="/dashboard/profile"
                component={Profile}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
