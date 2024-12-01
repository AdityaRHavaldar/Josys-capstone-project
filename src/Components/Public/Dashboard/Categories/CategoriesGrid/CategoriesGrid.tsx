import React from "react";
import "./CategoriesGrid.css";

const CategoriesGrid: React.FC = () => {
  return (
    <div>
      <div className="card-grid mb-4 pb-4">
        <div className="card card-50">
          <img
            src="https://www.ikea.com/images/15/7c/157cb48372fb1439ac1295a5e43a1072.jpg?f=xl"
            alt=""
            className="h-[100vh] w-full"
          />
        </div>
        <div className="card card-25 flex flex-col gap-[10px]">
          <img
            src="https://www.ikea.com/images/bf/9e/bf9e7a75e334b60aa34bfa06e68d154f.jpg?f=xs"
            alt=""
            className=" h-[40vh] w-full"
          />
          <img
            src="https://www.ikea.com/images/cf/c1/cfc1f38e71c00674061369eb7622775d.jpg?f=xs"
            alt=""
            className="h-[59vh] w-full"
          />
        </div>
        <div className="card card-25 flex flex-col gap-[10px]">
          <img
            src="https://www.ikea.com/images/01/40/0140b38cab067317b33cd49ebc8cb850.jpg?f=xs"
            alt=""
            className="h-[59vh] w-full"
          />
          <img
            src="https://www.ikea.com/images/7c/5c/7c5c196543002552cd1cf8a531690340.jpg?f=xs"
            alt=""
            className="h-[40vh] w-full"
          />
        </div>
      </div>
      <p className="text-sm text-slate-800 mb-4">
        Shop for Rs.8,000 and get 5% off with code- SHOPSAVE5 | Shop for
        Rs.15,000 and get 10% off with code- SHOPSAVE10
      </p>
    </div>
  );
};

export default CategoriesGrid;
