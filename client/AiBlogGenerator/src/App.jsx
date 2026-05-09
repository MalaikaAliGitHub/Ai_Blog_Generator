import { useState, useEffect } from "react";
import "./App.styles.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  const [page, setPage] = useState("home");
  const [pageData, setPageData] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (token) {
      setUserName(name);
      setPage("dashboard");
    }
  }, []);

  const handleSetPage = (newPage, data = null) => {
    setPage(newPage);
    setPageData(data);
  };

  const isLoggedIn = page !== "home" && page !== "login" && page !== "signup";

  return (
    <div>
      <Toaster position="top-right" />

      {isLoggedIn && <Navbar setPage={handleSetPage} />}
      {page === "home" && <Home setPage={handleSetPage} />}
      {page === "login" && <Login setPage={handleSetPage} setUserName={setUserName} />}
      {page === "signup" && <Signup setPage={handleSetPage} setUserName={setUserName} />}
      {page === "dashboard" && <Dashboard setPage={handleSetPage} userName={userName} />}
      {page === "create" && <CreateBlog setPage={handleSetPage} />}
      {page === "edit" && <CreateBlog setPage={handleSetPage} blog={pageData} />}
    </div>
  );
}

export default App;