import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login({ setPage, setUserName }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await loginUser(form);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userName", res.user.name);
        setUserName(res.user.name);
        setPage("dashboard");
      } else {
        setError(res.message || "Login failed");
      }
    } catch (error) {
      setError("Network error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-icon">✨</div>
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your AI Blogs account</p>
        </div>

        {error && (
          <div className="auth-alert auth-alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="input-field"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="input-field"
              autoComplete="off"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg auth-submit" 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <span 
            onClick={() => setPage("signup")} 
            className="auth-link"
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}