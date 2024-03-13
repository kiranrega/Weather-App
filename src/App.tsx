import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherDetails from "./components/WeatherDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherDisplay />} />
        <Route path="/weather-details/:location" element={<WeatherDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
