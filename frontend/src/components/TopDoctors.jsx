import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Responsive grid for doctors */}
      <div className="w-full grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-6 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0);}}
            className="border border-blue-400 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
          >
            <img className="bg-blue-100 w-full" src={item.image} alt={item.name} />
            <div className="p-4 space-y-1">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <p className="w-2 h-2 bg-green-600 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-lg font-medium text-gray-900 leading-tight">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        className="mt-6 bg-primary text-white cursor-pointer px-6 py-2 rounded-full hover:bg-primary/80 transition"
      >
        More...
      </button>
    </div>
  );
};

export default TopDoctors;
