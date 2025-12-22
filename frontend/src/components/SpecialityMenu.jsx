import React from 'react';
import { specialityData } from '../assets/assets_copy';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-5 py-16 text-gray-800" id="speciality">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-4 md:gap-10 pt-5 w-full overflow-scroll px-2 md:px-0">
  {/* Speciality Menu Items */}
  {specialityData.map((item, index) => (
    <Link
    onClick={() => scrollTo(0, 0)}
      className="flex flex-col items-center text-xs sm:text-sm cursor-pointer shrink-0 transform hover:-translate-y-2 hover:font-semibold scale-105 transition-all duration-300"
      key={index}
      to={`/doctors/${item.speciality}`}
    >
      <img
        className="w-16 sm:w-20 md:w-24 mb-2 border border-black rounded-full p-1 shadow-md"
        style={{ borderWidth: '3px' }}
        src={item.image}
        alt={item.speciality}
      />
      <p className="text-center">{item.speciality}</p>
    </Link>
  ))}
</div>

    </div>
  );
};

export default SpecialityMenu;
