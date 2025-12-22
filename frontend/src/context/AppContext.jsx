import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState({});

  // Fetch all doctors
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to load doctors");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Fetch logged-in user's profile
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);

      // If token becomes invalid, auto logout
      if (error?.response?.status === 401) {
        setToken("");
        localStorage.removeItem("token");
        setUserData({});
      }
    }
  };

  // Load doctors once
  useEffect(() => {
    getDoctorsData();
  }, []);

  // Load user profile whenever token changes
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData({});
    }
  }, [token]);

  const value = {
    currencySymbol,
    backendUrl,
    doctors,
    setDoctors,
    getDoctorsData,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
