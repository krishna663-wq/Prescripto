import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);

  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("Select");
  const [speciality, setSpeciality] = useState("Select");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const [loading, setLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const resetForm = () => {
    setDocImg(null);
    setName("");
    setDegree("");
    setExperience("Select");
    setSpeciality("Select");
    setEmail("");
    setPassword("");
    setFees("");
    setAddress1("");
    setAddress2("");
    setAbout("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (
      !docImg ||
      !name ||
      !degree ||
      !email ||
      !password ||
      !fees ||
      !address1 ||
      !address2 ||
      !about ||
      speciality === "Select" ||
      experience === "Select"
    ) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("degree", degree);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("speciality", speciality);
      formData.append("fees", Number(fees));
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("about", about);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full bg-indigo-100 flex justify-center py-6 px-4"
    >
      <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-lg border border-gray-100 max-h-[85vh] overflow-y-scroll">
        <p className="mb-6 text-4xl font-bold text-gray-800 text-center">
          Add Doctor
          <hr className="border-t-2 border-gray-300 w-full mx-auto" />
        </p>

        {/* IMAGE UPLOAD */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-24 h-24 object-cover bg-indigo-400 rounded-full border border-gray-600 shadow-md hover:opacity-90 transition"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="doctor"
            />
          </label>

          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />

          <div>
            {docImg ? (
              <p className="text-green-600 font-semibold flex items-center gap-2 text-lg">
                <span className="text-2xl">✔</span> Profile picture uploaded
              </p>
            ) : (
              <p className="text-gray-500 font-medium text-lg">
                Upload doctor picture <span className="text-red-600">*</span>
              </p>
            )}
          </div>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
          {/* LEFT */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-medium">
                Doctor Name <span className="text-red-600">*</span>
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-xl px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
                type="text"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <p className="font-medium">
                Education <span className="text-red-600">*</span>
              </p>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border rounded-xl px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
                type="text"
                placeholder="e.g., MBBS, MD, MS"
              />
            </div>

            <div>
              <p className="font-medium">
                Experience <span className="text-red-600">*</span>
              </p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border rounded-xl px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
              >
                <option value="Select">Select</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>

            <div>
              <p className="font-medium">
                Consultation Fees <span className="text-red-600">*</span>
              </p>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border rounded-xl px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
                type="number"
                placeholder="Enter fees"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-medium">
                Speciality <span className="text-red-600">*</span>
              </p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border rounded-xl px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
              >
                <option value="Select">Select</option>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="font-medium">
                Email <span className="text-red-600">*</span>
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-xl px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
                type="email"
                placeholder="Enter email"
              />
            </div>

            <div>
              <p className="font-medium">
                Password <span className="text-red-600">*</span>
              </p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-xl px-4 py-3 mt-1 w-full focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
                type="password"
                placeholder="Enter password"
              />
            </div>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="mt-8">
          <p className="font-medium">
            Address <span className="text-red-600">*</span>
          </p>
          <input
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="border rounded-xl px-4 py-3 mt-2 w-full focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
            type="text"
            placeholder="Address line 1"
          />
          <input
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="border rounded-xl px-4 py-3 mt-3 w-full focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
            type="text"
            placeholder="Address line 2"
          />
        </div>

        {/* ABOUT */}
        <div className="mt-8">
          <p className="font-medium">
            About Doctor <span className="text-red-600">*</span>
          </p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 mt-2 focus:ring-2 focus:ring-primary outline-none shadow-sm hover:bg-indigo-100"
            rows={5}
            placeholder="Write about doctor..."
          ></textarea>
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            disabled={loading}
            className={`bg-primary px-12 py-3 text-lg border-2 border-black cursor-pointer rounded-full text-white shadow-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Adding...." : "Add Doctor"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
