import axios from "axios";
import React, { useState } from "react";

const CreateUser = () => {
  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    setUsername("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-semibold mb-4">Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username:
          </label>
          <input
            id="username"
            type="text"
            required
            className="form-input mt-1 block w-full border-2 border-gray-200 rounded-md py-2 px-4 focus:outline-none"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
