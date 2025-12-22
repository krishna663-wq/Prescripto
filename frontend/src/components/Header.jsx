import React from 'react';
import { assets } from '../assets/assets_copy';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-xl mt-4 px-6 md:px-10 lg:px-20 py-6 border-4 border-black shadow-lg">
      {/* Left content */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] -mb-[30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment <br /> with <span className="text-black md:text-4xl lg:text-5xl font-bold"> Trusted </span> Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="w-28 border border-black rounded-full p-1"
            style={{ borderWidth: '3px' }}
            src={assets.group_profiles}
            alt=""
          />
          <p>
            Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          className="flex items-center gap-2 font-semibold bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
          href="#speciality"
        >
          Book Appointment <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* Right content */}
      <div className="md:w-1/2 relative">
        <img className="w-full md:absolute bottom-0 h-auto rounded-lg" src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
