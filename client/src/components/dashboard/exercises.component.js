import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.workout}</td>
    <td>{props.exercise.set}</td>
    <td>{props.exercise.weight}</td>
    <td>{props.exercise.reps}</td>
    <td>{props.exercise.date.slice(0, 10)}</td>
    <td>
      <Link to={'/edit/' + props.exercise._id}>edit</Link> |{' '}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}>
        Delete
      </a>
    </td>
  </tr>
);

class Exercises extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.displayDate = this.displayDate.bind(this);

    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/exercise/display/')
      .then(response => {
        this.setState({exercises: response.data});
      })
      .catch(error => {
        console.log(error);
      });

    let parseDate = JSON.stringify(new Date()).slice(1, 11);
    this.setState({date: parseDate});
  }

  displayDate(e) {}

  deleteExercise(id) {
    const {user} = this.props.auth;
    console.log(user);
    axios.delete(`http://localhost:5000/exercise/`).then(response => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id),
    });
    console.log(this.state.date);
  }

  exercises() {
    return this.state.exercises.map((currentexercise, index) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Exercise list</h3>
        <table className="table" border="1px ">
          <thead className="thead-light">
            <tr>
              <th>workout</th>
              <th>set</th>
              <th>weight</th>
              <th>reps</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>{this.exercises()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(Exercises);
