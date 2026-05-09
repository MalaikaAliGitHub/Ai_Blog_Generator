import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../services/api";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

export default function Dashboard({ setPage, userName }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await getBlogs();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
     toast.error("Failed to load blogs ❌");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setDeleting(id);
    try {
      const res = await deleteBlog(id);
      if (res.success) {
        setBlogs(blogs.filter(b => b._id !== id));
       toast.success("Blog deleted successfully ✅");
      }
    } catch (error) {
      toast.error("Error deleting blog ❌");
    }
    setDeleting(null);
  };

  const handleEdit = (blog) => {
    setPage("edit", blog);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const handleCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard ✅");
  } catch (err) {
    toast.error("Copy failed ❌");
  }
};

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div>
          <h1>🎉 Welcome, {userName}! 🎉</h1>
          <p className="subtitle">Total blogs created: {blogs.length}</p>
        </div>
        <button onClick={() => setPage("create")} className="btn btn-primary btn-lg">
          ✨ Create New Blog
        </button>
      </div>
      <div className="dashboard-summary-grid">
        <div className="summary-card">
          <p className="summary-label">Total Blogs</p>
          <h2>{blogs.length}</h2>
        </div>
        <div className="summary-card">
          <p className="summary-label">Live Drafts</p>
          <h2>{blogs.filter((b) => !b.published).length}</h2>
        </div>
        <div className="summary-card">
          <p className="summary-label">Top Rating</p>
          <h2>4.8 ★</h2>
        </div>
        <div className="summary-card">
          <p className="summary-label">Uptime</p>
          <h2>99.9%</h2>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="loading-icon">⏳</div>
          <p>Loading your blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h2>No blogs yet</h2>
          <p>Start creating your first AI-powered blog post today!</p>
          <button onClick={() => setPage("create")} className="btn btn-primary">
            Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <div className="blog-card-header">
                <div style={{ flex: 1 }}>
                  <h3>{blog.title}</h3>
                </div>
                <button 
                  onClick={() => handleCopy(blog.content)}
                  className="copy-icon-btn"
                  title="Copy content"
                >
                  <FiCopy size={18} />
                </button>
              </div>
              <span className="blog-topic">{blog.topic}</span>
              <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
              <div className="blog-meta">
                <small>📅 {formatDate(blog.createdAt)}</small>
              </div>
              <div className="blog-actions">
                <button 
                  onClick={() => handleEdit(blog)}
                  className="btn btn-secondary btn-sm blog-action-btn"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDelete(blog._id)}
                  className="btn btn-danger btn-sm blog-action-btn"
                  disabled={deleting === blog._id}
                >
                  {deleting === blog._id ? "🗑️ Deleting..." : "🗑️ Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}