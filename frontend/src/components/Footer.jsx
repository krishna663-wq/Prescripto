import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_copy";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = useNavigate();
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
        {/* Left Section */}
        <div className="flex flex-col gap-5">
          {/* Logo with subtle hover glow */}
          <div className="flex items-center gap-2 group">
            <img
              className="w-72 sm:w-80 cursor-pointer transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
              src={assets.logo}
              alt="HealthHub Logo"
            />
          </div>

          {/* Description Section */}
          <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-xl p-5 shadow-sm border border-blue-100">
            <p className="text-gray-700 leading-relaxed text-[15px] md:text-[16px]">
              <span className="block text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                Your Health, Our Priority.
              </span>
              <span className="block mb-3">
                Book appointments effortlessly with our trusted network of
                experienced doctors across multiple specialities. We make
                healthcare{" "}
                <span className="font-medium text-primary">
                  simple, accessible,
                </span>{" "}
                and
                <span className="font-medium text-primary"> reliable</span> —
                anytime, anywhere.
              </span>
              <span className="block italic text-gray-600 mt-3">
                Your well-being is just a click away — browse, choose, and
                consult your preferred doctor without any hassle.
              </span>
            </p>
          </div>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl font-semibold mb-5 text-gray-900">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li
              onClick={() => {
                navigate("/");
                scrollToTop();
              }}
              className="hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
            >
              Home
            </li>

            <li
              onClick={() => {
                navigate("/about");
                scrollToTop();
              }}
              className="hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
            >
              About Us
            </li>

            <li
              onClick={() => {
                navigate("/contact");
                scrollToTop();
              }}
              className="hover:text-primary cursor-pointer transition-all duration-300 hover:scale-125"
            >
              Contact Us
            </li>

            <li
              onClick={() => {
                navigate("/privacy-policy");
                scrollToTop();
              }}
              className="hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
            >
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-semibold mb-5 text-gray-900">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>📞 +0-000-000-000</li>
            <li>📧 1209deepak.shukla@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div>
        <hr className="border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-600">
          © 2025 <span className="font-semibold text-gray-800">HealthHub</span>.
          All rights reserved.
          <br />
          <span className="text-xs text-gray-500">
            Trusted by patients. Recommended by professionals.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
