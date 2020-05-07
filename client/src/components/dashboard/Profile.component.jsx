import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import NavbarComp from '../layout/navbar.component.js';
import {
  Button,
  NavDropdown,
  Form,
  FormControl,
  Navbar,
  Nav,
  Col,
  Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Profile = props => {
  var style1 = {
    margin: '0',
    display: 'inline-block',
    textAlign: 'center',
  };
  const [name, updateName] = useState('John Doe');
  const [age, updateAge] = useState(0);
  const [height, updateHeight] = useState(0);
  const [weight, updateWeight] = useState(0);
  const [bloodT, updateBloodT] = useState('A+');
  const [workoutT, updateWorkoutT] = useState('cardio');
  const [tweight, updateTweight] = useState(0);

  const {user} = props.auth;
  const uid = user.id;
  const API_URL = `/api/profile/${uid}`;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async e => {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    updateName(data.name);
    updateAge(data.age);
    updateHeight(data.height);
    updateWeight(data.weight);
    updateBloodT(data.blood);
    updateWorkoutT(data.workout);
    updateTweight(data.target);
  };

  const updateData = e => {
    e.preventDefault();
    const profile = {
      name,
      age,
      height,
      weight,
      bloodT,
      workoutT,
      tweight,
    };
    const {user} = props.auth;
    const uid = user.id;

    axios
      .put(`/api/profile/update/${uid}`, profile)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <NavbarComp />
      <div>
        <Form className="align-center" style={style1} onSubmit={updateData}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                value={name}
                onChange={e => {
                  updateName(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Age
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="number"
                value={age}
                onChange={e => {
                  updateAge(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Height
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="number"
                value={height}
                onChange={e => {
                  updateHeight(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Weight
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="number"
                value={weight}
                onChange={e => {
                  updateWeight(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Blood G
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                value={bloodT}
                onChange={e => {
                  updateBloodT(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Goal Weight
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                value={tweight}
                onChange={e => {
                  updateTweight(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{span: 10, offset: 1}}>
              <Button type="submit">Update Profile</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(Profile);
