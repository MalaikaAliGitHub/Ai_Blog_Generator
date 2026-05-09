const BASE_URL = "/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };
};

// SIGNUP
export const signupUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// GENERATE BLOG (just generates AI content)
export const generateBlog = async (data) => {
  const res = await fetch(`${BASE_URL}/blog/generate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  const json = await res.json();
  
  if (!res.ok) {
    throw new Error(json.error || json.message || `HTTP ${res.status}`);
  }
  
  return json;
};

// CREATE BLOG (saves to database)
export const createBlog = async (data) => {
  const res = await fetch(`${BASE_URL}/blog`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

// GET USER'S BLOGS
export const getBlogs = async () => {
  const res = await fetch(`${BASE_URL}/blog`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return res.json();
};

// UPDATE BLOG
export const updateBlog = async (id, data) => {
  const res = await fetch(`${BASE_URL}/blog/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

// DELETE BLOG
export const deleteBlog = async (id) => {
  const res = await fetch(`${BASE_URL}/blog/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return res.json();
};