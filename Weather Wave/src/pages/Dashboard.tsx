import CurrentWeather from "../components/Dashboard/CurrentWeather";

function Dashboard() {
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <CurrentWeather />
    </div>
  );
}

export default Dashboard;
