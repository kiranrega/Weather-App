import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "../components/WeatherDisplay.css";

const WeatherDisplay: React.FC = () => {
  const [location, setLocation] = useState<string>("");

  const naviagte = useNavigate();

  // triggers navigation to the details page
  const navigateToDetailsPage = () => {
    naviagte(`/weather-details/${location}`);
  };

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="searchBar"
      >
        <input
          value={location}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setLocation(event.target.value)
          }
          type="search"
          placeholder="Enter City or Location..."
        />
        <button onClick={navigateToDetailsPage} className="showDetailsButton">
          Show Details
        </button>
      </motion.div>
    </div>
  );
};

export default WeatherDisplay;
