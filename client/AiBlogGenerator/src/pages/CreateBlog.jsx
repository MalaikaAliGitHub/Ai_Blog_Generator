import { useState, useEffect } from "react";
import { generateBlog, createBlog, updateBlog } from "../services/api";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

export default function CreateBlog({ setPage, blog: editBlog }) {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isEditing = !!editBlog;

  useEffect(() => {
    if (editBlog) {
      setTitle(editBlog.title);
      setContent(editBlog.content);
      setTopic(editBlog.topic);
    }
  }, [editBlog]);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a topic");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await generateBlog({ topic });
      
      if (res && res.success) {
        setContent(res.content);
        if (!title) setTitle(topic);
        toast.success("Blog generated successfully ✨");
      } else if (res && res.error) {
        setError("Failed to generate: " + res.error);
      } else {
        setError("Unexpected response from server");
        toast.error("Failed to generate blog ❌");
      }
    } catch (error) {
      setError("Error generating blog: " + (error.message || "Unknown error"));
      console.error("Generate error:", error);
      toast.error("Error generating blog ❌");
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard ✅");
    } catch (err) {
      toast.error("Copy failed ❌");
    }
  };

  const handleSave = async () => {
    if (!title || !content) {
      setError("Please fill in title and content");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      if (isEditing) {
        const res = await updateBlog(editBlog._id, { title, content, topic });
        if (res.success) {
          toast.success("Blog saved successfully 💾");
          setTimeout(() => setPage("dashboard"), 1000);
        }
      } else {
        const res = await createBlog({ title, content, topic });
        if (res.success) {
          setSuccess("Blog saved successfully!");
          setTimeout(() => setPage("dashboard"), 1000);
        }
      }
    } catch (error) {
      setError("Error saving blog: " + error.message);
    }
    setSaving(false);
  };

  return (
    <div className="create-blog-wrapper">
      <div className="create-blog-header">
        <h1>{isEditing ? "✏️ Edit Blog Post" : "✨ Create New Blog Post"}</h1>
        <p className="create-blog-subtitle">
          {isEditing 
            ? "Update your blog with new content" 
            : "Let AI help you create engaging blog content in seconds"}
        </p>
      </div>

      {error && (
        <div className="status-banner status-error">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="status-banner status-success">
          ✅ {success}
        </div>
      )}
      
      <div className="form-section">
        <h2>📝 Blog Title</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter an engaging title for your blog..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <p className="note-text">
            💡 Make it catchy and descriptive
          </p>
        </div>
      </div>

      {!isEditing && (
        <div className="form-section">
          <h2>🤖 AI Topic</h2>
          <div className="form-group">
            <div className="generate-section">
              <input
                type="text"
                placeholder="What do you want to write about? (e.g., 'Machine Learning Basics')"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input-field"
              />
              <button 
                onClick={handleGenerate} 
                className="btn btn-primary"
                disabled={loading || !topic}
              >
                {loading ? "⏳ Generating..." : "✨ Generate"}
              </button>
            </div>
            <p className="note-text">
              🚀 Our AI will generate a complete blog post based on your topic
            </p>
          </div>
        </div>
      )}

      <div className="form-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h2>📄 Content</h2>
          {content && (
            <button 
              onClick={handleCopy}
              className="copy-icon-btn"
              title="Copy content"
            >
              <FiCopy size={18} />
            </button>
          )}
        </div>
        <div className="form-group">
          <textarea
            placeholder="Your blog content will appear here... Edit and customize as needed!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field content-input"
          />
          <p className="note-text">
            ✏️ Feel free to edit, add, or remove content
          </p>
        </div>
      </div>

      <div className="form-actions">
        <button 
          onClick={handleSave} 
          className="btn btn-primary btn-lg"
          disabled={saving || !title || !content}
        >
          {saving ? "💾 Saving..." : isEditing ? "✅ Update Blog" : "💾 Save Blog"}
        </button>
        <button 
          onClick={() => setPage("dashboard")} 
          className="btn btn-outline btn-lg"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}