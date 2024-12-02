import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../Services/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonLoginLeft from "./CommonLoginLeft";

interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin";
}

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    data: admins,
    isLoading,
    isError,
  } = useQuery<Admin[]>({
    queryKey: ["admins"],
    queryFn: async () => {
      const response = await api.get("/admin");
      return response.data;
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in both email and password.");
      toast.error("Both fields are required.");
      return;
    }

    const admin = admins?.find((adm) => adm.email === email);
    if (!admin) {
      setError("Admin not found.");
      toast.error("Admin not found.");
      return;
    }

    if (admin.password !== password) {
      setError("Incorrect password.");
      toast.error("Incorrect password.");
      return;
    }

    sessionStorage.setItem("adminId", admin.id.toString());
    sessionStorage.setItem("role", "admin");

    toast.success("Login successful!");
    window.location.href = "/admin";
  };

  if (isLoading) return <p>Loading admins...</p>;
  if (isError) return <p>Error fetching admins!</p>;

  return (
    <div className="flex min-h-screen">
      <CommonLoginLeft />
      <div className="w-[60%] m-auto">
        <h1 className="text-2xl w-full text-center font-bold">Admin Login</h1>
        <div className="flex justify-center items-center bg-white p-8">
          <div className="max-w-md w-full bg-white">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-500"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              {error && (
                <p className="text-red-500 text-sm text-left mt-2">{error}</p>
              )}

              <button
                onClick={handleLogin}
                type="submit"
                className="w-full py-2 px-4 bg-[rgb(0,88,163)] text-white font-semibold rounded-full shadow-md hover:bg-[rgb(0,88,200)]"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
