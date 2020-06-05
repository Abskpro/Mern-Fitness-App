import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {logoutUser} from '../../actions/authActions.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Button,
  NavDropdown,
  Form,
  FormControl,
  Navbar,
  Nav,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const NavbarComp = props => {
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Fitness</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/dashboard/home">Home</Nav.Link>
          <Nav.Link href="/dashboard/profile">Profile</Nav.Link>
          <NavDropdown title="Exercise" id="basic-nav-dropdown">
            <NavDropdown.Item href="/dashboard/">Add Workout</NavDropdown.Item>
            <NavDropdown.Item href="/dashboard/log">Log</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/login" onClick={onLogoutClick}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarComp.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(NavbarComp);
