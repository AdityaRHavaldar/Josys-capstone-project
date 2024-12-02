import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminComponents/AdminDashboard";
import SupplierLogin from "./Components/Public/Login/SupplierLogin";
import AdminLogin from "./Components/Public/Login/AdminLogin";
import PublicRoutes from "./Components/Routes/PublicRoutes";
import SupplierDashboard from "./Components/SupplierComponents/SupplierDashboard";

function App() {
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role"));
  useEffect(() => {
    setUserRole(userRole);
  }, [userRole]);

  return (
    <div className="App px-16">
      <Router>
        <Routes>
          <Route path="/login/user" element={<Login />} />
          <Route path="/login/supplier" element={<SupplierLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/home/*" element={<PublicRoutes />} />
          <Route path="/supplier" element={<SupplierDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
