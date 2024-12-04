import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CommonLoginLeft: React.FC = () => {
  return (
    <div className="flex flex-col justify-between w-[40%] bg-[rgb(0,88,163)] py-[5%] px-[7%] text-white gap-[10vh]">
      <div className="flex">
        <button className="p-1 m-1">
          <Link to="/home/index">
            <IoMdArrowBack />
          </Link>
        </button>
        <img src="/Images/ieka.webp" alt="Ieka" className="h-16" />
      </div>
      <div className="text-left">
        <h1 className="text-3xl font-bold">IEKA account.</h1>
        <p className="text-lg mt-2">
          Too many passwords? <br />
          You can now login with an OTP we will send on your email address or
          verified mobile number.
        </p>
        <p className="text-lg mt-2">
          Access your IEKA account using your email address to add and verify
          your mobile number.
        </p>
      </div>
      <div className="mt-auto text-left">
        <span className="block text-sm">
          IEKA.in - Cookie Policy and Privacy Policy
        </span>
        <span className="block text-sm">
          © Inter IEKA Systems B.V. 1999-2024
        </span>
      </div>
    </div>
  );
};

export default CommonLoginLeft;
