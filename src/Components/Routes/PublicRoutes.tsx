import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../NavBar";
import ProductDashboard from "../Public/Dashboard/ProductsDashboard";
import GroupDashboard from "../Public/Dashboard/GroupDashboard";
import ProductDetails from "../Public/ProductDetails";
import Footer from "../Footer";
import Bag from "../Public/Bag";

const PublicRoutes: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<GroupDashboard />} />
        <Route path="index" element={<GroupDashboard />} />
        <Route path="ProductDashboard" element={<ProductDashboard />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="bag" element={<Bag />} />
      </Routes>
      <Footer />
    </>
  );
};

export default PublicRoutes;
