import React from "react";
import ForecastWeather from "../components/Forecast/ForecastWeather";

function Forecast() {
  return (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Forecast</h1>
        <ForecastWeather />
      </div>
    </div>
  );
}

export default Forecast;
