export default function Navbar({ setPage }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("user");
    setPage("home");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-symbol">✨</div>
          <div>
            <h2>AI Blogs</h2>
            <p className="navbar-tagline">Your AI content workspace</p>
          </div>
        </div>
        <div className="navbar-actions">
          <button onClick={() => setPage("dashboard")} className="btn btn-secondary btn-sm">
            Dashboard
          </button>
          <button onClick={handleLogout} className="btn btn-outline btn-sm">
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
