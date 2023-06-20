import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Exercise = (props) => (
  <tr>
    <td className="border px-4 py-2">{props.exercise.username}</td>
    <td className="border px-4 py-2">{props.exercise.description}</td>
    <td className="border px-4 py-2">{props.exercise.duration}</td>
    <td className="border px-4 py-2">{props.exercise.date.substring(0, 10)}</td>
    <td className="border px-4 py-2">
      <Link
        to={"/edit/" + props.exercise._id}
        className="text-blue-500 hover:underline mr-2"
      >
        Edit
      </Link>
      |
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
        className="text-red-500 hover:underline ml-2"
      >
        Delete
      </a>
    </td>
  </tr>
);

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    setExercises(exercises.filter((el) => el._id !== id));
  };

  const exerciseList = () => {
    return exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-semibold mb-4">Logged Exercises</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-200 text-left px-4 py-2">Username</th>
            <th className="bg-gray-200 text-left px-4 py-2">Description</th>
            <th className="bg-gray-200 text-left px-4 py-2">Duration</th>
            <th className="bg-gray-200 text-left px-4 py-2">Date</th>
            <th className="bg-gray-200 text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
