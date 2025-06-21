import { Routes, Route, Navigate } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Messages from "./pages/Messages";

const App = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to={token ? "/messages" : "/login"} />} />

      {/* Register page */}
      <Route path="/register" element={<Register />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Messages page (only if logged in) */}
      <Route path="/messages" element={token ? <Messages /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;