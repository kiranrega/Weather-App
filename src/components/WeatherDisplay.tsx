import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "../components/WeatherDisplay.css";

const WeatherDisplay: React.FC = () => {
  // State hook to manage input value
  const [location, setLocation] = useState<string>("");

  // Navigation hook
  const navigate = useNavigate();

  // Function to navigate to the details page
  const navigateToDetailsPage = () => {
    navigate(`/weather-details/${location}`);
  };

  return (
    <div className="container">
      <h1 className="mainHeading">Weather Forecast</h1>
      {/* Motion animation for search bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="searchBar"
      >
        {/* Input field to enter location */}
        <input
          value={location}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setLocation(event.target.value)
          }
          type="search"
          placeholder="Enter City or Location..."
        />
        {/* Button to show weather details */}
        <button onClick={navigateToDetailsPage} className="showDetailsButton">
          Show Details
        </button>
      </motion.div>
    </div>
  );
};

export default WeatherDisplay;
