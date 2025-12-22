import React from "react";
import { assets } from "../assets/assets_copy";

const Contact = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-14 bg-gray-50 text-gray-700">
      {/* ---------- HEADING ---------- */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Contact <span className="text-primary">Us</span>
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          We’re here to help. Get in touch with our team today.
        </p>
      </div>

      {/* ---------- CONTACT SECTION ---------- */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-24">
        {/* Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full max-w-[360px] rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center items-start gap-6 md:w-1/2 text-sm md:text-base leading-relaxed">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              Our Office
            </h3>
            <p className="text-gray-600">
              00000 Willms Station <br /> Suite 000, Washington, USA
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              Contact Info
            </h3>
            <p className="text-gray-600">
              Tel: (000) 000-000 <br /> krishnagopal1270@gmail.com
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              Careers at Prescripto
            </h3>
            <p className="text-gray-600 mb-3">
              Learn more about our team and explore open roles with us.
            </p>
            <button className="border border-primary text-primary cursor-pointer font-medium px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
