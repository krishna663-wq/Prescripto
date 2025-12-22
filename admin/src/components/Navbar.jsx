import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
const { aToken, setAToken } = useContext(AdminContext);
const navigate = useNavigate();

const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

const logout = () => {
if (aToken) {
setAToken("");
localStorage.removeItem("aToken");
}
navigate("/");
};

return (
<> <nav className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-sm">
{/* Logo + Role */} <div className="flex items-center gap-3"> <img
         className="w-36 sm:w-40 cursor-pointer"
         src={assets.admin_logo}
         alt="Logo"
       /> <span className="border px-3 py-1 rounded-full border-gray-400 text-gray-600 font-medium">
{aToken ? "Admin" : "Doctor"} </span> </div>

    {/* Logout Button */}
    {aToken && (
      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="bg-primary hover:bg-primary/90 transition-colors cursor-pointer text-white font-medium px-6 py-2 rounded-full shadow-md"
      >
        Logout
      </button>
    )}
  </nav>

  {/* Logout Confirmation Modal */}
  {showLogoutConfirm && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition"
          >
            Yes
          </button>
          <button
            onClick={() => setShowLogoutConfirm(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-400 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )}
</>
);
};

export default Navbar;
