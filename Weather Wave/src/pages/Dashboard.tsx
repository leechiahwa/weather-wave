import CurrentWeather from "../components/Dashboard/CurrentWeather";

function Dashboard() {
  return (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
        <CurrentWeather />
      </div>
    </div>
  );
}

export default Dashboard;
