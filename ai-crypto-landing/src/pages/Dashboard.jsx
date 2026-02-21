import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Dashboard 🚀</h1>
      <p>You are successfully logged in.</p>

      <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
