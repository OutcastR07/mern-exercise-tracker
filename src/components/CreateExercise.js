import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const CreateExercise = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.username));
          setUsername(res.data[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-semibold mb-4">Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username:
          </label>
          <select
            id="username"
            required
            className="form-input mt-1 block w-full border-2 border-gray-200 rounded-md py-2 px-4 focus:outline-none"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description:
          </label>
          <input
            type="text"
            id="description"
            required
            className="form-input mt-1 block w-full border-2 border-gray-200 rounded-md py-2 px-4 focus:outline-none"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700">
            Duration (in minutes):
          </label>
          <input
            type="text"
            id="duration"
            className="form-input mt-1 block w-full border-2 border-gray-200 rounded-md py-2 px-4 focus:outline-none"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">
            Date:
          </label>
          <div>
            <DatePicker
              id="date"
              selected={date}
              onChange={onChangeDate}
              className="form-input mt-1 block w-full border-2 border-gray-200 rounded-md py-2 px-4 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <input
            type="submit"
            value="Create Exercise Log"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
