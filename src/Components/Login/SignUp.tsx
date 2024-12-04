import React, { useState } from "react";
import { createUser } from "../../Services/CustomersServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    gender: "male",
    address: "",
    pincode: "",
    phoneno: null,
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastShown, setToastShown] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (
      !formData.name ||
      !formData.surname ||
      !formData.email ||
      !formData.password
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const newUser = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        gender: formData.gender,
        address: formData.address,
        pincode: formData.pincode,
        phoneno: formData.phoneno,
        password: formData.password,
        orders: [],
      };

      await createUser(newUser);

      toast.success(
        "Thank you for becoming a valuable member of our IEKA Family!. Please log in with your credentials to continue.",
        {
          autoClose: 5000,
        }
      );

      setToastShown(true);
    } catch (error) {
      setErrorMessage("Error creating account. Please try again.");
    }
  };

  React.useEffect(() => {
    if (toastShown) {
      const timer = setTimeout(() => {
        navigate("/login/user");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toastShown, navigate]);

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white">
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              pattern="[A-Za-z ]+"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="surname"
              className="block text-sm font-medium text-gray-600"
            >
              Surname
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              pattern="[A-Za-z ]+"
              value={formData.surname}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-600"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-600"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              pattern="^\d{6,10}$"
              value={formData.pincode}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneno"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneno"
              name="phoneno"
              pattern="^[6-9][0-9]{9}$"
              value={formData.phoneno || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[rgb(0,88,163)] text-white font-semibold rounded-full shadow-md hover:bg-[rgb(0,88,200)]"
          >
            Join IEKA Family
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
