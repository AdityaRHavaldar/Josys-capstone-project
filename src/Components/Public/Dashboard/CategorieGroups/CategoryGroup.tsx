import React, { useState, Suspense } from "react";

enum Category {
  ShopProducts = "ShopProducts",
  ShopByRooms = "ShopByRooms",
  Offers = "Offers",
  NewAtIkea = "NewAtIkea",
  IkeaForBusiness = "IkeaForBusiness",
  CustomerService = "CustomerService",
  TipsIdeasTrends = "TipsIdeas_trends",
  More = "More",
}

const components = {
  [Category.ShopProducts]: React.lazy(() => import("./ShopProducts")),
  [Category.ShopByRooms]: React.lazy(() => import("./ShopByRooms")),
  [Category.Offers]: React.lazy(() => import("./Offers")),
  [Category.NewAtIkea]: React.lazy(() => import("./NewAtIkea")),
  [Category.IkeaForBusiness]: React.lazy(() => import("./IkeaForBusiness")),
  [Category.CustomerService]: React.lazy(() => import("./CustomerService")),
  [Category.TipsIdeasTrends]: React.lazy(() => import("./TipsIdeasTrends")),
  [Category.More]: React.lazy(() => import("./More")),
};

const CategoryButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`hover:text-blue-400 ${active ? "text-blue-600 font-bold" : ""}`}
  >
    {label}
  </button>
);

const CategoryGroup: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<Category>(
    Category.ShopProducts
  );

  const renderActiveComponent = () => {
    const Component = components[activeComponent];
    return <Component />;
  };

  return (
    <div className="min-h-44">
      <div>
        <ul className="flex space-x-4 m-4 gap-2">
          {Object.values(Category).map((category) => (
            <li key={category}>
              <CategoryButton
                label={category.replace(/([A-Z])/g, " $1").trim()}
                active={activeComponent === category}
                onClick={() => setActiveComponent(category)}
              />
            </li>
          ))}
        </ul>
      </div>

      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        <div className="mt-4">{renderActiveComponent()}</div>
      </Suspense>
    </div>
  );
};

export default CategoryGroup;
