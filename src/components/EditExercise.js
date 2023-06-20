import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";

const EditExercise = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + id)
      .then((response) => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/update/" + id, exercise)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded shadow">
      <h3 className="text-lg font-bold mb-4">Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">
            Username:
          </label>
          <select
            id="username"
            required
            className="form-select mt-1 block w-full focus:outline-none"
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
          <label htmlFor="description" className="block font-medium">
            Description:
          </label>
          <input
            type="text"
            id="description"
            required
            className="form-input mt-1 block w-full focus:outline-none"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block font-medium">
            Duration (in minutes):
          </label>
          <input
            type="text"
            id="duration"
            className="form-input mt-1 block w-full focus:outline-none"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block font-medium">
            Date:
          </label>
          <DatePicker
            id="date"
            selected={date}
            onChange={onChangeDate}
            className="form-input mt-1 block w-full focus:outline-none"
          />
        </div>
        <div>
          <input
            type="submit"
            value="Edit Exercise Log"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
