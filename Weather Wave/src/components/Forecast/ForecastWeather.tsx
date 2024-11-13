import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchForecastData } from "../../api/api";
import { isAxiosError } from "axios";

interface ForecastDay {
  date: string;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface ForecastData {
  forecastday: ForecastDay[];
}

interface Location {
  name: string;
  country: string;
}

function ForecastWeather() {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await fetchForecastData(city);
      console.log(data);
      if (data && data.forecast && data.forecast.forecastday) {
        setLocation(data.location);
        setForecastData(data.forecast); // Set forecast data correctly
      } else {
        setError("Invalid data format received");
      }
    } catch (err) {
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to fetch forecast data"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">3-Day Weather Forecast</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Forecast"}
        </Button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Weather Card */}
      <div className="flex flex-col gap-4 p-4 justify-center items-center">
        {location ? (
          <div className="flex justify-center items-center">
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
            <h2 className="text-2xl font-semibold tracking-tight hover:text-blue-500 transition-colors duration-300">
              {location.name}, {location.country}
            </h2>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-wrap md:flex-nowrap justify-center">
          {forecastData?.forecastday.map((day: ForecastDay, index: number) => (
            <div
              className="rounded-xl border border-gray-200 shadow-md p-6 m-2
                   hover:shadow-xl transition-shadow duration-300
                   flex flex-col justify-between items-center w-48"
              key={index}
            >
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <img
                className="w-20 h-20 my-4"
                src={day.day.condition.icon}
                alt={day.day.condition.text}
              />
              <p className="text-lg font-medium text-center mb-4">
                {day.day.condition.text}
              </p>
              <div className="flex gap-3 text-lg">
                <p className="font-bold text-blue-500">
                  {Math.round(day.day.mintemp_c)}°
                </p>
                <span className="text-gray-300">|</span>
                <p className="font-bold text-red-500">
                  {Math.round(day.day.maxtemp_c)}°
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForecastWeather;
