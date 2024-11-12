import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCurrentWeather } from "../../api/api";
import { isAxiosError } from "axios";

function CurrentWeather() {
  interface WeatherData {
    location: {
      name: string;
      country: string;
    };
    current: {
      condition: {
        text: string;
        icon: string;
      };
      temp_c: number;
      feelslike_c: number;
      humidity: number;
      wind_kph: number;
      wind_dir: string;
    };
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      const response = await fetchCurrentWeather("New York"); // Defaults to New York
      const data = await response;
      setWeatherData(data);
    };

    getWeatherData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLocation(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const data = await fetchCurrentWeather(currentLocation);
      if (!data || !data.location) {
        throw new Error("Location not found");
      }
      setWeatherData(data);
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage = "Location not found. Please check the city name.";
        } else if (error.response?.status === 429) {
          errorMessage = "Too many requests. Please try again later.";
        } else if (error.code === "ERR_NETWORK") {
          errorMessage = "Network error. Please check your connection.";
        }
      }

      setError(errorMessage);
      setWeatherData(null);
    }
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { location, current } = weatherData;

  return (
    <>
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8  p-4 rounded-lg shadow-sm">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={currentLocation}
            onChange={handleInputChange}
            className="flex-1"
          />
          <Button type="submit" className="">
            Search
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
      <div className="rounded-xl border-2 shadow-lg p-6">
        <div className="flex flex-col justify-center items-center">
          <div className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">
            {location.name}, {location.country}
          </h2>
        </div>
        <div className="my-4">
          <img
            className="w-24 h-24 mx-auto"
            src={current.condition.icon}
            alt={current.condition.text}
          />
          <p className="text-xl ">{current.condition.text}</p>
        </div>
        {/* Weather Card */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-3 rounded-lg">
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-xl font-medium">{current.temp_c}°C</p>
          </div>
          <div className="text-center p-3 rounded-lg">
            <p className="text-sm text-gray-500">Feels like</p>
            <p className="text-xl font-medium">{current.feelslike_c}°C</p>
          </div>
          <div className="text-center p-3  rounded-lg">
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-xl font-medium">{current.humidity}%</p>
          </div>
          <div className="text-center p-3 rounded-lg">
            <p className="text-sm text-gray-500">Wind</p>
            <p className="text-xl font-medium">
              {current.wind_kph} kph {current.wind_dir}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;
