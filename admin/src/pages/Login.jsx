import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.aToken);
          console.log(data.aToken);
          setAToken(data.aToken);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      } else {
        toast.info("Doctor login coming soon!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 bg-white shadow-2xl rounded-2xl p-8 w-[90%] max-w-md transition-all duration-300 border border-gray-100"
      >
        <div className="text-center mb-2">
          <img
            src={assets.admin_logo || ""}
            alt="logo"
            className="w-30 h-30 mx-auto mb-2"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            <span className="text-primary">{state}</span> Login
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Please login to continue.
          </p>
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            required
            className="border border-gray-300 focus:border-primary rounded-lg w-full p-3 outline-none transition-all focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
            required
            className="border border-gray-300 focus:border-primary rounded-lg w-full p-3 outline-none transition-all focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white text-lg font-semibold py-3 rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-200"
        >
          Login
        </button>

        <p className="text-center text-gray-600 text-sm">
          {state === "Admin" ? (
            <>
              Doctor Login?{" "}
              <span
                className="text-primary font-medium cursor-pointer hover:underline"
                onClick={() => setState("Doctor")}
              >
                Click Here
              </span>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <span
                className="text-primary font-medium cursor-pointer hover:underline"
                onClick={() => setState("Admin")}
              >
                Click Here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
