
import { useSelector } from "react-redux";
import "./Dashboard.css";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="dashboard">
      <h1>Welcome to ModGarage!</h1>

      <p>Hello, {user?.fullName}!</p>

      <p>You have successfully logged in.</p>
    </div>
  );
}

export default Dashboard;
