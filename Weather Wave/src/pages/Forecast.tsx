import ForecastWeather from "../components/Forecast/ForecastWeather";

function Forecast() {
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        3-Day Weather Forecast
      </h1>
      <ForecastWeather />
    </div>
  );
}

export default Forecast;
