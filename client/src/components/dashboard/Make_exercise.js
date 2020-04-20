import React, {useState} from 'react';
import axios from 'axios';
import SortedData from './sorted-data.component.js';

const MakeExercise = () => {
  const [workout, updateWorkout] = useState('benchpress');
  const [sets, updateSets] = useState(0);
  const [weight, updateWeight] = useState(0);
  const [reps, updateReps] = useState(0);

  const submit = e => {
    e.preventDefault();
    const exercise = {
      workout: workout,
      set: sets,
      weight: weight,
      reps: reps,
    };

    console.log(exercise);

    axios
      .post('http://localhost:5000/api/exercise/add', exercise)
      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <div className="create-ex">
      <h1>Add Workout</h1>
      <form onSubmit={submit} className="form-co">
        <label htmlFor="new-workout">Workout</label>
        <select
          className="workouts"
          id="new-Ex"
          onChange={e => {
            updateWorkout(e.target.value);
          }}
          value={workout}>
          <option value="benchpress">benchpress</option>
          <option value="squat">squat</option>
          <option value="dumbellcurl">dumbellcurl</option>
          <option value="bentoverrow">deadlift</option>
          <option value="deadlift">deadlift</option>
        </select>

        <br />
        <br />
        <li>
          <label htmlFor="set">Set number:</label>
          <input
            type="number"
            className="workouts"
            id="new-set"
            min="1"
            max="15"
            onChange={e => {
              updateSets(e.target.value);
            }}
            value={sets}
          />
        </li>

        <br />
        <li>
          <label htmlFor="weight">Weight(in kg):</label>
          <input
            type="number"
            className="workouts"
            id="new-weight"
            min="1"
            max="500"
            onChange={e => {
              updateWeight(e.target.value);
            }}
            value={weight}
          />
        </li>

        <br />
        <li>
          <label htmlFor="reps">Reps:</label>
          <input
            type="number"
            className="workouts"
            id="new-reps"
            min="1"
            max="15"
            onChange={e => {
              updateReps(e.target.value);
            }}
            value={reps}
          />
        </li>
        <br />

        <input type="submit" value="create exercise log" className="btn" />
      </form>
    </div>
  );
};

export default MakeExercise;
