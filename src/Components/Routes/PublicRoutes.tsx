import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../NavBar";
import ProductDashboard from "../Public/Dashboard/ProductsDashboard";
import GroupDashboard from "../Public/Dashboard/GroupDashboard";
import ProductDetails from "../Public/ProductDetails";
import Footer from "../Public/Footer";
import Bag from "../Public/Bag";

const PublicRoutes: React.FC = () => {
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role"));
  useEffect(() => {
    setUserRole(userRole);
  }, [userRole]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<GroupDashboard />} />
        <Route path="/ProductDashboard" element={<ProductDashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/user/bag" element={<Bag />} />
      </Routes>
      <Footer />
    </>
  );
};

export default PublicRoutes;
