import React, { useState } from "react";
import AdminProductsControl from "./AdminProductsControl";
import { MdOutlineMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import AdminUsersControl from "./AdminUserControl";
import AdminSuppliersControl from "./AdminSupplierControl";

const AdminDashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<number>(1);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderComponent = () => {
    switch (selectedMenu) {
      case 1:
        return <AdminProductsControl />;
      case 2:
        return <AdminUsersControl />;
      case 3:
        return <AdminSuppliersControl />;
      default:
        return <AdminProductsControl />;
    }
  };

  return (
    <div className="flex h-screen">
      {isMenuOpen && (
        <div
          className={`bg-gray-800 absolute text-white p-4 top-0 left-0 transition-transform ${
            isMenuOpen ? "translate-x-0 w-[250px] h-full" : "w-0 hidden"
          } sm:translate-x-0`}
        >
          <div className="flex justify-end py-2 px-4">
            <button onClick={toggleMenu} className="text-2xl">
              <IoClose />
            </button>
          </div>

          <ul>
            <li>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setSelectedMenu(1);
                }}
                className="text-white py-2 px-4 block hover:bg-gray-700"
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setSelectedMenu(2);
                }}
                className="text-white py-2 px-4 block hover:bg-gray-700"
              >
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setSelectedMenu(3);
                }}
                className="text-white py-2 px-4 block hover:bg-gray-700"
              >
                Suppliers
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className={`flex-1 ml-0 ${isMenuOpen && "sm:ml-64"} p-8`}>
        <div className="mb-4">
          {!isMenuOpen && (
            <button onClick={toggleMenu} className="w-full text-2xl">
              <MdOutlineMenu />
            </button>
          )}
        </div>
        <div>{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
