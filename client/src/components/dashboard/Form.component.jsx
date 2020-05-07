import React, {useState} from 'react';
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
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Profileform = props => {
  const [name, updateName] = useState('John Doe');
  const [age, updateAge] = useState(0);
  const [height, updateHeight] = useState(0);
  const [weight, updateWeight] = useState(0);
  const [bloodT, updateBloodT] = useState('A+');
  const [workoutT, updateWorkoutT] = useState('cardio');
  const [tweight, updateTweight] = useState(0);

  const Submit = e => {
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

    axios.post(`/api/profile/add/${uid}`, profile).then(() => {
      axios
        .post(`/api/users/profile/${uid}`)
        .then(res => console.log(res.data))
        .then(() => {
          props.history.push({
            pathname: '/dashboard/',
            state: props.auth,
          });
        })
        .catch(err => {
          console.log(err.response);
        });
    });
  };

  return (
    <div>
      <Form onSubmit={Submit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              onChange={e => {
                updateName(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridage">
            <Form.Label>Age</Form.Label>
            <Form.Control
              placeholder="0"
              onChange={e => {
                updateAge(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridHeight">
            <Form.Label>Height</Form.Label>
            <Form.Control
              placeholder="in feet"
              onChange={e => {
                updateHeight(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridWeight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              placeholder="in kg"
              onChange={e => {
                updateWeight(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group as={Col} controlId="formGridBlood">
          <Form.Label>Blood Type</Form.Label>
          <Form.Control
            onChange={e => {
              updateBloodT(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridWorkout">
          <Form.Label>Workout Type</Form.Label>
          <Form.Control
            as="select"
            value="Choose..."
            onChange={e => {
              updateWorkoutT(e.target.value);
            }}>
            <option>Cardio</option>
            <option>Weight Lifting</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Goal weight</Form.Label>
          <Form.Control
            onChange={e => {
              updateTweight(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

Profileform.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(Profileform);
