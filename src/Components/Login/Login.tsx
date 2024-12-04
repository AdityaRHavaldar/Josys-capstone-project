import React from "react";
import { useLocation } from "react-router-dom";
import CommonLoginLeft from "./CommonLoginLeft";
import SignUp from "./SignUp";
import CustomerLogin from "./CustomerLogin";

const Login: React.FC = () => {
  const location = useLocation();
  const isSignUp = location.state?.isSignUp ?? false;
  return (
    <div className="flex min-h-screen">
      <CommonLoginLeft />

      <div className="flex justify-center items-center w-[60%] bg-white p-8">
        <div className="max-w-md w-full p-8 bg-white">
          <h2 className="text-3xl font-semibold text-center text-[rgb(0,88,163)] mb-6">
            {isSignUp ? "Create an Account" : "Login"}
          </h2>

          {isSignUp ? <SignUp /> : <CustomerLogin />}
        </div>
      </div>
    </div>
  );
};

export default Login;
