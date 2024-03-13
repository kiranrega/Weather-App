import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios, { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useHistory and useParams hooks

import clearIcon from "../assets/clear.webp";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import mistIcon from "../assets/mistIcon.webp";
import humidity from "../assets/humidity.png";
import minTemp from "../assets/minimumTemp.webp";
import maxTemp from "../assets/maxTemp.png";

import "../components/WeatherDisplay.css";

interface WeatherData {
  main?: {
    temp: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };
  weather?: {
    main: string;
  }[];
  name?: string;
  sys?: {
    country: string;
  };
  wind?: {
    speed: number;
  };
  coord?: {
    lat: string;
    lon: string;
  };
}

const WeatherDetails: React.FC = () => {
  const [data, setData] = useState<WeatherData>({});
  const [error, setError] = useState<string | null>(null);
  const [moreDetails, setMoreDetails] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>(clearIcon);
  const { location } = useParams<{ location: string }>(); // Get location from URL params

  const navigate = useNavigate();

  var apiKey = "98e86bef152f7176adbaf1ffb5604007"; // Add your API key here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const updateBackgroundColor = (weatherCondition: string) => {
    const colorMapping: Record<string, string> = {
      Clear: "var(--sunnyGradient)",
      Clouds: "var(--cloudyGradient)",
      Drizzle: "var(--rainyGradient)",
      Rain: "var(--rainyGradient)",
      Snow: "var(--snowyGradient)",
      Mist: "var(--mistyGradient)",
    };

    setBackgroundColor(
      colorMapping[weatherCondition] || "var(--sunnyGradient)"
    );
  };

  const getDatafor7days = async (lat: any, lon: any) => {
    const apiKey = "98e86bef152f7176adbaf1ffb5604007";
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const data = await axios.get(url);
    console.log(lat, "lat");
  };

  useEffect(() => {
    updateBackgroundColor(data.weather ? data.weather[0].main : "");
  }, [data]);

  useEffect(() => {
    if (location) {
      axios
        .get(url)
        .then((response: AxiosResponse<WeatherData>) => {
          setData(response.data);
          setError(null);
          updateBackgroundColor(
            response.data.weather ? response.data.weather[0].main : ""
          );
          if (response.data.coord) {
            getDatafor7days(response.data.coord.lat, response.data.coord.lon);
          } else {
            setError("Coordinates not found");
          }
        })
        .catch(() => {
          setError("Please enter a valid city or location");
        });
    }
  }, [location]); // Fetch data only when location changes

  const weatherIcons: Record<string, string> = {
    Clear: clearIcon,
    Clouds: cloudIcon,
    Drizzle: drizzleIcon,
    Rain: rainIcon,
    Snow: snowIcon,
    Mist: mistIcon,
  };

  const weatherCondition = data.weather ? data.weather[0].main : "";

  const iconSrc = weatherIcons[weatherCondition] || clearIcon;

  const navigateToHomePage = () => {
    navigate("/");
  };

  return (
    <div
      className="container"
      style={{ background: backgroundColor, transition: "0.7s" }}
    >
      {error ? (
        <p className="error">{error}</p>
      ) : (
        data.name !== undefined && (
          <div className="weatherOutput">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="left"
              layout
            >
              <img src={iconSrc} alt="" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="right"
            >
              {data.main ? (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="temperature"
                >
                  {data.main.temp.toFixed()}°C
                </motion.h1>
              ) : null}
              {data.weather ? (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  {data.weather[0].main}
                </motion.h3>
              ) : null}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                {data.name}, {data.sys ? <span>{data.sys.country}</span> : null}
              </motion.h2>
              <div className="data">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.6 }}
                >
                  <img src={humidity} alt="" />
                  <span>
                    {data.main ? <h2>{data.main.humidity}%</h2> : null}
                    <p>Humidity</p>
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.8 }}
                >
                  <img src={windIcon} alt="" />
                  <span>
                    {data.wind ? (
                      <h2>{data.wind.speed.toFixed()} Km/h</h2>
                    ) : null}
                    <p>Wind Speed</p>
                  </span>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7, type: "spring" }}
                className="moreData"
              >
                {moreDetails === false ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    className="toggleDetails"
                    onClick={() => setMoreDetails(!moreDetails)}
                  >
                    Show More ↓
                  </motion.p>
                ) : (
                  <motion.p
                    className="toggleDetails"
                    onClick={() => setMoreDetails(!moreDetails)}
                  >
                    Show Less ↑
                  </motion.p>
                )}
                {moreDetails === true ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2,
                    }}
                    className="wrapper"
                  >
                    <div>
                      <img src={maxTemp} alt="" />
                      <span>
                        {data.main ? (
                          <h2>{data.main.temp_max.toFixed()}°C</h2>
                        ) : null}
                        <p>Max Temp.</p>
                      </span>
                    </div>
                    <div>
                      <img src={minTemp} alt="" />
                      <span>
                        {data.main ? (
                          <h2>{data.main.temp_min.toFixed()}°C</h2>
                        ) : null}
                        <p>Min Temp</p>
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  ""
                )}
              </motion.div>
            </motion.div>
          </div>
        )
      )}
      <button onClick={navigateToHomePage} className="backButton">
        Back to Home
      </button>
    </div>
  );
};

export default WeatherDetails;
