import React from 'react';
import { assets } from '../assets/assets_copy';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {/* Left side */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-14 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-6">
          <p>Book Appointment</p>
          <p className="mt-4">
            With 100+ <span className="text-black text-5xl">Trusted</span> Doctors
          </p>
        </div>
        <button
          onClick={() => {
            navigate('/login');
            window.scrollTo(0, 0);
          }}
          className="bg-black text-white text-base sm:text-lg md:text-xl cursor-pointer px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create Account
        </button>
      </div>

      {/* Right side */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt="appointment"
        />
      </div>
    </div>
  );
};

export default Banner;
