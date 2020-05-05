import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import NavbarComp from '../layout/navbar.component.js';

const Profile = () => {
  return (
    <div>
      <NavbarComp />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(Profile);
