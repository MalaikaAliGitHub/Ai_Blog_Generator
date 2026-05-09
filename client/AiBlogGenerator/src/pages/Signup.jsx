import { useState } from "react";
import { signupUser } from "../services/api";

export default function Signup({ setPage, setUserName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await signupUser(form);
      setSuccess(res.message || "Signup successful! Redirecting to dashboard...");
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userName", res.user.name);
        setUserName(res.user.name);
        setTimeout(() => setPage("dashboard"), 1500);
      } else {
        setTimeout(() => setPage("login"), 1500);
      }
    } catch (error) {
      setError("Network error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-icon">✨</div>
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join thousands creating amazing blogs with AI</p>
        </div>

        {error && (
          <div className="auth-alert auth-alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-alert auth-alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="input-field"
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
            />
            <p className="section-note">
              Must be at least 6 characters long
            </p>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg auth-submit" 
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <span 
            onClick={() => setPage("login")} 
            className="auth-link"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}