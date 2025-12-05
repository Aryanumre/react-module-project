import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [dark, setDark] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [chartData, setChartData] = useState([40, 55, 32, 70, 60, 80, 50]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartData([50, 65, 45, 80, 75, 90, 60]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loggedIn) {
    return (
      <Login dark={dark} setDark={setDark} onLogin={() => setLoggedIn(true)} />
    );
  }

  return (
    <div className={dark ? "dashboard dark" : "dashboard light"}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">MyDashboard</div>
        <nav className="menu">
          <button className="menu-item active">Dashboard</button>
          <button className="menu-item">Orders</button>
          <button className="menu-item">Customers</button>
          <button className="menu-item">Reports</button>
          <button className="menu-item">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Topbar */}
        <header className="topbar">
          <h1>Dashboard Overview</h1>

          <div className="topbar-right">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />

            <button className="toggle-btn" onClick={() => setDark(!dark)}>
              {dark ? "Light Mode" : "Dark Mode"}
            </button>

            <div className="user-badge">AI</div>
          </div>
        </header>

        {/* Stats Cards  */}
        <section className="stats-grid">
          <StatCard title="Total Users" value="1,248" change="+12% this week" />
          <StatCard title="Revenue" value="₹2,45,600" change="+8% this month" />
          <StatCard title="New Orders" value="86" change="-3% vs yesterday" />
          <StatCard title="Pending Issues" value="5" change="2 new today" />
        </section>

        <section className="chart-row">
          <TrafficChart data={chartData} />
        </section>

        <section className="bottom-grid">
          <RecentOrders />
          <SummaryCard />
        </section>
      </main>
    </div>
  );
}

function Login({ dark, setDark, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      onLogin();
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className={dark ? "login-wrapper dark" : "login-wrapper light"}>
      <div className="login-card">
        <div className="login-top-row">
          <span className="login-logo">MyDashboard</span>
          <button
            type="button"
            className="toggle-btn small"
            onClick={() => setDark(!dark)}>
            {dark ? "Light" : "Dark"}
          </button>
        </div>

        <h1 className="login-title">Welcome back 👋</h1>
        <p className="login-subtitle">
          Sign in to access your analytics dashboard.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">
            Email
            <input
              type="email"
              className="login-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="login-label">
            Password
            <input
              type="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="login-hint">
          Demo only – use any email & password to continue.
        </p>
      </div>
    </div>
  );
}

/* ---------- Small Components ---------- */

function StatCard({ title, value, change }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-change">{change}</p>
    </div>
  );
}

function RecentOrders() {
  const orders = [
    { id: 101, customer: "Rahul Sharma", amount: "₹4,500", status: "Paid" },
    { id: 102, customer: "Sneha Patil", amount: "₹1,200", status: "Pending" },
    { id: 103, customer: "Aman Verma", amount: "₹9,800", status: "Paid" },
    { id: 104, customer: "Priya Singh", amount: "₹2,300", status: "Cancelled" },
    { id: 105, customer: "Karan Mehta", amount: "₹7,600", status: "Paid" },
  ];

  return (
    <div className="card">
      <h2>Recent Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.amount}</td>
              <td>
                <span
                  className={`status-pill status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SummaryCard() {
  return (
    <div className="card">
      <h2>Today&apos;s Summary</h2>
      <ul className="summary-list">
        <li>
          Total page views: <strong>12,458</strong>
        </li>
        <li>
          New signups: <strong>78</strong>
        </li>
        <li>
          Bounce rate: <strong>34%</strong>
        </li>
        <li>
          Support tickets: <strong>3 open</strong>
        </li>
      </ul>
      <p className="summary-note">
        Overall performance looks <strong>good</strong>. Keep tracking user
        activity and conversions.
      </p>
    </div>
  );
}

/* ---------- Simple Bar Chart Component ---------- */

function TrafficChart({ data }) {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="card">
      <h2>Weekly Traffic (Test Chart)</h2>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "12px",
          height: "180px",
          marginTop: "16px",
          border: "1px dashed rgba(148,163,184,0.6)",
          padding: "12px",
        }}>
        {data.map((value, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
            }}>
            <div
              style={{
                width: "24px",
                height: `${value * 1.5}px`, // 40 => 60px etc
                borderRadius: "999px 999px 0 0",
                background: "#0ea5e9",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                marginTop: "6px",
                color: "#9ca3af",
              }}>
              {labels[index]}
            </span>
          </div>
        ))}
      </div>

      <p className="summary-note" style={{ marginTop: "8px" }}>
        Bars are rendered with inline styles using <strong>useEffect</strong>{" "}
        data.
      </p>
    </div>
  );
}

export default App;
