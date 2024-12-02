import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useQuery } from "@tanstack/react-query";
import api from "../../../Services/Api";
import { toast } from "react-toastify";
import CommonLoginLeft from "./CommonLoginLeft";
import "react-toastify/dist/ReactToastify.css";

interface Supplier {
  id: number;
  name: string;
  email: string;
  phoneno: string;
  address: string;
  pincode: string;
  password: string;
  role: "supplier";
}

const SupplierLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordChange, setIsPasswordChange] = useState(false);

  const {
    data: suppliers,
    isLoading,
    isError,
  } = useQuery<Supplier[]>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const response = await api.get("/suppliers");
      return response.data;
    },
  });

  const handleLogin = () => {
    if (!emailOrPhone || !password) {
      toast.error("Please fill in both email/phone and password.");
      return;
    }

    const supplier = suppliers?.find(
      (sup) => sup.email === emailOrPhone || sup.phoneno === emailOrPhone
    );

    if (!supplier) {
      toast.error("Supplier not found.");
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(password, supplier.password);
    if (!isPasswordCorrect) {
      toast.error("Incorrect password.");
      return;
    }

    sessionStorage.setItem("supplierId", supplier.id.toString());
    sessionStorage.setItem("role", "supplier");

    toast.success("Login successful!");
    window.location.href = "/supplier";
  };

  const handlePasswordChange = () => {
    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    const supplier = suppliers?.find(
      (sup) => sup.email === emailOrPhone || sup.phoneno === emailOrPhone
    );
    if (!supplier) {
      toast.error("Supplier not found.");
      return;
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    api
      .put(`/suppliers/${supplier.id}`, {
        ...supplier,
        password: hashedPassword,
      })
      .then(() => {
        toast.success("Password changed successfully.");
        setIsPasswordChange(false);
      })
      .catch(() => {
        toast.error("Failed to change password.");
      });
  };

  if (isLoading) return <p>Loading suppliers...</p>;
  if (isError) return <p>Error fetching suppliers!</p>;

  return (
    <div className="flex min-h-screen">
      <CommonLoginLeft />
      <div className="w-[60%] m-auto">
        <h1 className="text-2xl w-full text-center font-bold">
          Supplier Login
        </h1>
        <div className="flex justify-center items-center bg-white p-8">
          <div className="max-w-md w-full p-8 bg-white">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label
                  htmlFor="emailOrPhone"
                  className="block text-sm font-medium text-gray-500"
                >
                  Email or Phone No
                </label>
                <input
                  type="text"
                  id="emailOrPhone"
                  name="emailOrPhone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,88,163)]"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-500"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,88,163)]"
                  required
                />
              </div>

              <button
                onClick={handleLogin}
                type="submit"
                className="w-full py-2 px-4 bg-[rgb(0,88,163)] text-white font-semibold rounded-full shadow-md hover:bg-[rgb(0,88,200)]"
              >
                Login
              </button>
            </form>

            {isPasswordChange && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">
                  Change Password
                </h3>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,88,163)]"
                />
                <button
                  onClick={handlePasswordChange}
                  className="mt-2 w-full py-2 px-4 bg-[rgb(0,88,163)] text-white font-semibold rounded-full shadow-md hover:bg-[rgb(0,88,200)]"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierLogin;
