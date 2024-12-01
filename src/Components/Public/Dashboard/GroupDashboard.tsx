import React from "react";
import CategoriesGrid from "./Categories/CategoriesGrid/CategoriesGrid";
import CategoryGroup from "./CategorieGroups/CategoryGroup";
import CategoriesCarousel from "./Categories/CategoriesCarousel/CategoriesCarousel";

const GroupDashboard: React.FC = () => {
  return (
    <div>
      <CategoryGroup />
      <CategoriesGrid />
      <CategoriesCarousel />
    </div>
  );
};

export default GroupDashboard;
