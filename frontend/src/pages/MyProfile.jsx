import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_copy";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 mb-20 bg-white rounded-2xl shadow-xl border border-gray-100 transition-transform duration-300 hover:scale-[1.01]">
      {/* Profile Picture */}
      <div className="flex flex-col items-center text-center mb-6">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              {!image && (
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={assets.upload_icon}
                  alt=""
                />
              )}
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-32 h-32 rounded-full object-cover shadow-md"
            src={userData.image}
            alt="User"
          />
        )}

        {/* Name */}
        {isEdit ? (
          <input
            className="bg-gray-50 border border-gray-300 rounded-lg text-2xl font-semibold text-gray-800 text-center mt-4 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {userData.name}
          </h2>
        )}
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Contact Information */}
      <div>
        <h3 className="text-primary font-semibold text-lg mb-3">
          Contact Information
        </h3>
        <div className="grid grid-cols-[1fr_2fr] gap-y-3 text-gray-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-600">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-52 focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-600">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                value={userData.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
              />
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                value={userData.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
              />
            </div>
          ) : (
            <p className="text-gray-600">
              {userData.address?.line1 || ""}
              <br />
              {userData.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="mt-6">
        <h3 className="text-primary font-semibold text-lg mb-3">
          Basic Information
        </h3>
        <div className="grid grid-cols-[1fr_2fr] gap-y-3 text-gray-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}

          <p className="font-medium">Date of Birth:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-40 focus:outline-none focus:ring-2 focus:ring-primary"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-center">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:cursor-pointer hover:bg-primary/90 transition-all duration-300"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary text-primary px-6 py-2 rounded-full font-medium hover:cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
