import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./Components/AdminComponents/AdminDashboard";
import SupplierLogin from "./Components/Login/SupplierLogin";
import AdminLogin from "./Components/Login/AdminLogin";
import PublicRoutes from "./Components/Routes/PublicRoutes";
import SupplierDashboard from "./Components/SupplierComponents/SupplierDashboard";
import { ToastContainer } from "react-toastify";
import Login from "./Components/Login/Login";

function App() {
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role"));
  useEffect(() => {
    setUserRole(userRole);
  }, [userRole]);

  return (
    <div className="App px-16">
      <Router>
        <Routes>
          <Route index element={<PublicRoutes />} />
          <Route path="/login/user" element={<Login />} />
          <Route path="/login/supplier" element={<SupplierLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/home/*" element={<PublicRoutes />} />
          <Route path="/supplier" element={<SupplierDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
