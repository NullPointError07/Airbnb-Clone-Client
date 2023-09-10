import { useState } from "react";
import BarIcon from "../assets/Icons/BarIcon";
import GlobeIcon from "../assets/Icons/GlobeIcon";
import SearchIcon from "../assets/Icons/SearchIcon";
import AirbnbIcon from "../assets/Icons/airbnbIcon";
import person from "../assets/Images/person.jpg";
import "./Navbar.css";

const Navbar = () => {
  const [dropdownAuth, setDropdownAuth] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);

  const toggleDropDown = () => {
    setDropdownAuth(!dropdownAuth);
  };

  const togglemodalSearch = () => {
    setModalSearch(!modalSearch);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center space-x-2">
        <AirbnbIcon />
        <h1 className="text-lg text-pink-500">airbnb</h1>
      </div>
      <div className="mt-4 sm:mt-0 border border-gray-300 rounded-3xl shadow-md px-4 py-2">
        <button onClick={togglemodalSearch}>
          <ul className="flex space-x-4 items-center">
            <li className="font-semibold border-r-2 border-gray-300 pr-2">
              Anywhere
            </li>
            <li className="font-semibold border-r-2 border-gray-300 pr-2">
              Any Week
            </li>
            <li>Add guest</li>
            <SearchIcon />
          </ul>
        </button>
      </div>
      <div className="relative mt-4 sm:mt-0">
        <div className="flex space-x-4 items-center">
          <h1 className="font-bold">Airbnb your home</h1>
          <GlobeIcon />
          <div className="relative-group">
            <button
              onClick={toggleDropDown}
              className="flex space-x-2 border rounded-3xl p-2"
            >
              <BarIcon />
              <img src={person} style={{ width: 25, height: 25 }} alt="" />
            </button>
            {dropdownAuth && (
              <div className="absolute top-10 sm:top-12 left-0 mt-2 sm:mt-0 sm:left-20 py-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full sm:w-48 text-left pl-2 z-20">
                <h1>Signup</h1>
                <h1 className="border-b-2 border-gray-300 py-1">Login</h1>
                <h1 className="py-1">Airbnb your home</h1>
                <h1>Help Center</h1>
              </div>
            )}
            {/* {modalSearch && (
              <div className="modal-container">
                <div className="modal-content">
                  <button className="close-button" onClick={togglemodalSearch}>
                    &times;
                  </button>
                  <div className="input-container">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      placeholder="Where? Search Destination"
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="check-in">Check-In</label>
                    <input type="date" id="check-in" />
                  </div>
                  <div className="input-container">
                    <label htmlFor="check-out">Check-Out</label>
                    <input type="date" id="check-out" />
                  </div>
                  <button className="search-button">Search</button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
