import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken, getAllDoctors]);

  return (
    <div className="m-5 bg-purple-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">All Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white border-2 border-gray-300 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
            >
              <div className="relative bg-gray-100">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-40 object-contain bg-gray-100 rounded-t-xl"
                />

                <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded">
                  ${doctor.fees}/consult
                </div>
              </div>

              <div className="p-3">
                <p className="text-base font-semibold text-gray-800">
                  {doctor.name}
                </p>
                <p className="text-indigo-600 text-sm">{doctor.speciality}</p>
                <p className="text-gray-500 text-xs mt-1">{doctor.degree}</p>

                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={()=> changeAvailability(doctor._id)}
                    checked={doctor.available}
                    readOnly
                    className="w-4 h-4 cursor-pointer accent-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Available</span>
                </div>

                <p className="text-gray-400 text-[11px] mt-1">
                  {doctor.address.line1}, {doctor.address.line2}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No doctors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
