import React, { useState } from "react";
import { authenticate } from "../../Services/AuthServices";
import { Link } from "react-router-dom";

interface LoginFormData {
  emailOrPhone: string;
  password: string;
}

const CustomerLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrPhone: "",
    password: "",
  });
  const [uNameError, setUnameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnameError(null);
    setPasswordError(null);

    const userOrAdmin = await authenticate(
      formData.emailOrPhone.trim(),
      formData.password.trim()
    );

    if (userOrAdmin) {
      sessionStorage.setItem("userId", userOrAdmin.id.toString());
      sessionStorage.setItem("role", "user");

      window.location.href = "/home/index";
    } else {
      setUnameError("Invalid email/phone number");
      setPasswordError("Invalid password");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white p-8">
      <div className="max-w-md w-full bg-white">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="emailOrPhone"
              className="block text-left text-sm font-medium text-gray-500"
            >
              Email or Phone Number
            </label>
            <input
              type="text"
              id="emailOrPhone"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,88,163)]"
              required
            />
            {uNameError && (
              <p className="text-red-500 text-sm text-left mt-2">
                {uNameError}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm text-left font-medium text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,88,163)]"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm text-left mt-2">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[rgb(0,88,163)] text-white font-semibold rounded-full shadow-md hover:bg-[rgb(0,88,200)]"
          >
            Login
          </button>
        </form>
        <Link to="/login/user" state={{ isSignUp: true }}>
          <button className="w-full py-2 px-4 my-6 font-semibold rounded-full shadow-md border border-gray-500 focus:ring-2 focus:ring-[rgb(0,88,163)]">
            I'm Buying for my Home
          </button>
        </Link>

        <button className="w-full py-2 px-4  font-semibold rounded-full shadow-md border border-gray-500 focus:ring-2 focus:ring-[rgb(0,88,163)]">
          I'm Buying for my Office
        </button>
      </div>
    </div>
  );
};

export default CustomerLogin;
