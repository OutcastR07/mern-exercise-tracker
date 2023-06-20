import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar--container flex items-center justify-between bg-gray-800 p-4 lg:p-6">
      <Link
        to="/"
        className="navbar--brand text-sm font-semibold text-gray-200 lg:text-2xl"
      >
        Exercise Tracker
      </Link>
      <div className="text-gray-500 text-xs lg:text-base">
        <ul className="flex items-center gap-x-8">
          <li className="navbar--item hover:text-gray-300 hover:bg-gray-700 px-2 py-1 lg:px-3 lg:py-2 rounded-lg">
            <Link to="/">Exercises</Link>
          </li>
          <li className="navbar--item hover:text-gray-300 hover:bg-gray-700 px-2 py-1 lg:px-3 lg:py-2 rounded-lg">
            <Link to="/create">Create Exercise Log</Link>
          </li>
          <li className="navbar--item hover:text-gray-300 hover:bg-gray-700 px-2 py-1 lg:px-3 lg:py-2 rounded-lg">
            <Link to="/user">Create User</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
