import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar--container flex items-center justify-between p-6 bg-gray-800">
      <Link to="/" className="navbar--brand text-2xl font-semibold text-white">
        Exercise Tracker
      </Link>
      <div className="text-gray-500">
        <ul className="flex items-center gap-x-8">
          <li className="navbar--item hover:text-white">
            <Link to="/">Exercises</Link>
          </li>
          <li className="navbar--item hover:text-white">
            <Link to="/create">Create Exercise Log</Link>
          </li>
          <li className="navbar--item hover:text-white">
            <Link to="/user">Create User</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
