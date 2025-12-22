import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-4 md:px-10 my-10">
      <p className="text-lg font-semibold text-gray-700 mb-6">
        Browse through the doctors by speciality.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Left: Speciality List */}
        <div
          className={`flex-wrap md:flex-col gap-3 md:w-1/5 text-gray-700 font-medium ${
            showFilter ? "flex" : "hidden sm:flex"
          } `}
        >
          {[
            "General Physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer transition-all 
                ${
                  speciality === spec
                    ? "bg-blue-100 text-blue-600 border-blue-400"
                    : "hover:text-blue-600 hover:border-blue-400"
                }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Right: Doctors Grid */}
        <div className="flex-1 grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-400 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-md"
            >
              <img
                className="bg-blue-100 w-full h-48 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4 space-y-1">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="text-lg font-medium text-gray-900 leading-tight">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
