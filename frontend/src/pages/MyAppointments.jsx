import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  // Format slotDate and slotTime as "25 July 2024 | 8:30 PM"
  const formatDateTime = (slotDate, slotTime) => {
    if (!slotDate || !slotTime) return "--";
    const [day, month, year] = slotDate.split("-");
    const dateObj = new Date(`${year}-${month}-${day}`);
    const monthName = dateObj.toLocaleString("default", { month: "long" });
    return `${day} ${monthName} ${year} | ${slotTime}`;
  };

  return (
    <div className="px-4 sm:px-8 mt-12">
      <p className="pb-3 font-semibold text-xl text-neutral-800 border-b border-zinc-300/40">
        My Appointments
      </p>

      <div className="mt-6 space-y-6">
        {appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-8 space-y-3 text-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-semibold">No appointments found</p>
            <p className="text-sm text-gray-400">
              You haven’t booked any appointments yet. Start by booking your
              first appointment.
            </p>
            <button
              onClick={() => navigate("/doctors")}
              className="mt-2 px-6 py-2 bg-primary text-white cursor-pointer rounded-lg shadow hover:bg-primary/90 transition-colors"
            >
              Browse Doctors
            </button>
          </div>
        )}

        {appointments.map((item, index) => (
          <div
            key={item._id || index}
            className="group flex flex-wrap sm:flex-nowrap gap-6 items-center bg-gradient-to-r from-white via-purple-50/40 to-white border border-zinc-300 rounded-2xl p-4 shadow-xl hover:shadow-md hover:border-purple-200 transition-all duration-300"
          >
            {/* Doctor Image */}
            <img
              className="w-28 h-28 object-cover rounded-xl bg-indigo-50 shadow-sm group-hover:scale-105 transition-transform duration-300"
              src={item.docData?.image || ""}
              alt={item.docData?.name || "Doctor"}
            />

            {/* Doctor Details */}
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold text-base">
                {item.docData?.name || "--"}
              </p>
              <p className="capitalize text-sky-600 font-medium">
                {item.docData?.speciality || "--"}
              </p>

              <p className="text-zinc-700 font-medium mt-2">Address:</p>
              <p className="text-xs text-zinc-500">
                {item.docData?.address?.line1 || "--"}
              </p>
              <p className="text-xs text-zinc-500">
                {item.docData?.address?.line2 || ""}
              </p>

              <p className="text-sm mt-2">
                <span className="text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                <span className="text-sky-700 font-semibold">
                  {formatDateTime(item.slotDate, item.slotTime)}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && (
                <button className="text-sm font-medium text-stone-700 bg-purple-50 border border-purple-200 text-center sm:min-w-48 py-2 rounded-lg hover:cursor-pointer hover:bg-sky-600 hover:text-white hover:shadow-md transition-all duration-300">
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm font-medium text-stone-700 bg-red-50 border border-red-200 text-center sm:min-w-48 py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer hover:text-white hover:shadow-md transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {
                item.cancelled && <button className="sm:min-w-48 py-2 border border-red-700 rounded text-red-700">Appointment Cancelled</button>
              }
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-zinc-300/30"></div>
    </div>
  );
};

export default MyAppointments;