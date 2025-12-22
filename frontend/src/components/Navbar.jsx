import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_copy";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAdminVisible = !token || userData?.role === "admin";

  return (
    <div className="flex items-center justify-between py-4 px-4 md:px-10 bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      {/* Logo */}
      <img
        className="w-36 sm:w-40 cursor-pointer hover:opacity-80 transition"
        onClick={() => {
          navigate("/");
          scrollToTop();
        }}
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Navbar */}
      <ul className="hidden md:flex items-center gap-7 text-[16px] font-medium">
        {[
          { path: "/", label: "HOME" },
          { path: "/doctors", label: "ALL DOCTORS" },
          { path: "/about", label: "ABOUT" },
          { path: "/contact", label: "CONTACT" },
        ].map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={scrollToTop}
            className={({ isActive }) =>
              `relative pb-1 transition-all ${
                isActive ? "text-primary" : "text-gray-700 hover:text-primary"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {/* Desktop Admin Panel */}
        {isAdminVisible && (
          <a
            href="http://localhost:5174/admin/login"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-5 py-2 cursor-pointer rounded-full font-semibold text-purple-700 border-2 border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-[length:200%_100%] bg-clip-border hover:bg-[length:100%_100%] transition-all shadow-inner"
            style={{
              backgroundClip: "padding-box, border-box",
              backgroundOrigin: "border-box",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(to right, #7f00ff, #e100ff)",
            }}
          >
            Admin Panel
          </a>
        )}
      </ul>

      {/* Profile / Auth */}
      <div className="flex items-center gap-4 relative">
        {token && userData ? (
          <div
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              className="w-10 h-10 rounded-full border border-gray-300 object-cover hover:shadow-md transition"
              src={userData.image}
              alt="Profile"
            />

            <img
              className="w-3 opacity-70 hover:opacity-100 transition"
              src={assets.dropdown_icon}
              alt="Dropdown"
            />

            {showDropdown && (
              <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl p-3 flex flex-col gap-2 min-w-[180px] border border-gray-100 z-50">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                  className="py-2 px-3 hover:bg-primary/10 rounded cursor-pointer text-gray-700"
                >
                  My Profile
                </p>

                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowDropdown(false);
                  }}
                  className="py-2 px-3 hover:bg-primary/10 rounded cursor-pointer text-gray-700"
                >
                  My Appointments
                </p>

                <p
                  onClick={() => setShowLogoutConfirm(true)}
                  className="py-2 px-3 hover:bg-red-100 text-red-600 rounded cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-primary text-white ml-10 px-6 py-2.5 rounded-full font-semibold shadow-sm hover:shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            Login / Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Sidebar */}
        <div
          className={`fixed md:hidden top-0 right-0 h-full bg-white shadow-xl transition-all duration-300 z-40 ${
            showMenu ? "w-3/4 sm:w-1/2" : "w-0 overflow-hidden"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>

          <ul className="flex flex-col items-start gap-4 mt-3 px-6 text-lg font-medium">
            {[
              { path: "/", label: "HOME" },
              { path: "/doctors", label: "ALL DOCTORS" },
              { path: "/about", label: "ABOUT" },
              { path: "/contact", label: "CONTACT" },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => {
                  scrollToTop();
                  setShowMenu(false);
                }}
                className="w-full py-2 px-2 rounded hover:bg-primary/10 text-gray-700"
              >
                {link.label}
              </NavLink>
            ))}

            {/* Mobile Admin Panel */}
            {isAdminVisible && (
              <a
                href="http://localhost:5174/admin/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-5 py-2 rounded-full shadow-lg mt-2 w-full text-center hover:scale-105 transition-transform"
              >
                Admin Panel
              </a>
            )}

            {!token && (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="bg-primary text-white px-5 py-2 rounded-full font-medium mt-4 w-full hover:bg-primary/90 transition cursor-pointer"
              >
                Login / Create Account
              </button>
            )}
          </ul>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
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
    </div>
  );
};

export default Navbar;
