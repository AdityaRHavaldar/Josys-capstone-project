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

  const handleLogOut = () => {
    sessionStorage.clear();
    window.location.href = "/home/index";
  };

  return (
    <div className="flex h-full">
      {isMenuOpen && (
        <div
          className={`bg-gray-800 fixed text-white p-4 top-0 left-0 transition-transform ${
            isMenuOpen ? "translate-x-0 w-[250px] h-[100vh]" : "w-0 hidden"
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
          <button
            onClick={handleLogOut}
            className="text-lg transition-colors text-nowrap p-2 rounded-full hover:bg-slate-400 duration-300 hover:scale-105 mx-2 my-4"
          >
            Logout
          </button>
        </div>
      )}

      <div className={`flex-1 ml-0 ${isMenuOpen && "sm:ml-64"}`}>
        <div className="mb-4 bg-slate-300 ">
          {!isMenuOpen && (
            <div className="flex justify-between items-center px-5">
              <button onClick={toggleMenu} className="text-2xl p-4">
                <MdOutlineMenu />
              </button>
              <h1 className="text-2xl font-bold">
                {selectedMenu === 1
                  ? "Manage Products"
                  : selectedMenu === 2
                  ? "Manage Users"
                  : selectedMenu === 3
                  ? "Manage Suppliers"
                  : ""}
              </h1>
              <button
                onClick={handleLogOut}
                className="text-lg transition-colors text-nowrap p-2 rounded-full hover:bg-slate-400 duration-300 hover:scale-105"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="px-8">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
