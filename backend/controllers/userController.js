import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import AppointmentModel from "../models/appointmentModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay';

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already registered" });
    }

    // Validate strong password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hashing user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error: Unable to register user",
      error: error.message,
    });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error: Unable to login",
      error: error.message,
    });
  }
};

// API to get logged-in user's profile
const getProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select(["-password", "-__v"]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      userData: user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Unable to fetch user profile",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // ⭐ from authUser middleware
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "All fields are required" });
    }

    let updateData = {
      name,
      phone,
      dob,
      gender,
      address: JSON.parse(address),
    };

    if (imageFile) {
      const uploaded = await cloudinary.uploader.upload(imageFile.path);
      updateData.image = uploaded.secure_url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: Unable to update profile",
    });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId; // ⭐ Correct userId
    const { docId, slotDate, slotTime } = req.body;

    console.log({
      userId,
      docId,
      slotDate,
      slotTime,
    });

    // Validate required fields
    if (!userId || !docId || !slotDate || !slotTime) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: userId, docId, slotDate, or slotTime",
      });
    }

    // Fetch doctor data
    const doctor = await doctorModel.findById(docId).select("-password");
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (!doctor.available) {
      return res.status(400).json({
        success: false,
        message: "Doctor is currently not available",
      });
    }

    // Check slot availability
    const slotsBooked = doctor.slots_booked || {};
    if (slotsBooked[slotDate]?.includes(slotTime)) {
      return res.status(400).json({
        success: false,
        message: "Selected slot is already booked",
      });
    }

    // Add slot
    if (slotsBooked[slotDate]) {
      slotsBooked[slotDate].push(slotTime);
    } else {
      slotsBooked[slotDate] = [slotTime];
    }

    // Fetch user data
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prepare appointment data
    const appointmentData = {
      userId,
      docId,
      userData: user,
      docData: { ...doctor.toObject(), slots_booked: undefined }, // remove slots_booked
      amount: doctor.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    // Save appointment
    const newAppointment = new AppointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

    return res.status(200).json({
      success: true,
      message: `Appointment successfully booked for ${slotDate} at ${slotTime}`,
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: Unable to book appointment",
      error: error.message,
    });
  }
};

// API to get user appointments for frontend my-appointment page
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId; // get userId from authUser middleware

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found"
      });
    }

    // Fetch appointments and populate doctor data (so frontend can use docData)
    const appointments = await appointmentModel
      .find({ userId })
      .populate("docId"); // assuming docId is a reference to doctorModel

    res.json({
      success: true,
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.error("List Appointment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: Unable to fetch appointments",
      error: error.message,
    });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from authUser middleware
    const { appointmentId } = req.body;

    // Validate input
    if (!appointmentId) {
      return res.json({ success: false, message: "Appointment ID required" });
    }

    const appointmentData = await appointmentModel
      .findById(appointmentId)
      .lean();

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Verify appointment belongs to logged-in user
    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    // Mark appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId).lean();

    if (!doctorData) {
      return res.json({
        success: false,
        message: "Doctor not found while releasing slot",
      });
    }

    let slots_booked = { ...doctorData.slots_booked };

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );

      // If date array becomes empty, delete it
      if (slots_booked[slotDate].length === 0) {
        delete slots_booked[slotDate];
      }
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment Cancelled",
    });

  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: Unable to cancel appointment",
      error: error.message,
    });
  }
};

// const razorpayInstance = new razorpay({
//   key_id: '',
//   key_secret: ''
// });

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {

}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };