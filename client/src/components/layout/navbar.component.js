import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {logoutUser} from '../../actions/authActions.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const {user} = this.props.auth;
    return (
      <nav className="navbar navbar-dark">
        <Link to="/" className="navbar-brand">
          Excer Tracker
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/dashboard/" className="nav-link">
                Create Exercise
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/dashboard/log" className="nav-link">
                Create Exercise Log
              </Link>
            </li>
            <li>
              <button onClick={this.onLogoutClick}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
