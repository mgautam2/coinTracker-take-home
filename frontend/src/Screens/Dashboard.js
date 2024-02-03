import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();

  const name = new URLSearchParams(location.search).get("name");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {name}</p>
    </div>
  );
}

export default Dashboard;