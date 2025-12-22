import validator from 'validator';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // ✅ Validate required fields
    if (!name || !email || !password || !imageFile || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    const existing = await doctorModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Doctor already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
    const imageUrl = imageUpload.secure_url;


    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: new Date(),
    };

    await new doctorModel(doctorData).save();

    res.json({ success: true, message: 'Doctor added successfully' });
  } catch (error) {
    console.error('❌ Error adding doctor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Validate credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const aToken = jwt.sign(
        { email }, // safer payload
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'Admin logged in successfully',
        aToken, // ✅ renamed to match frontend
      });
    }

    // Invalid credentials
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all doctors for the admin panel
const allDoctors = async (req, res) => {
  try {
    // Fetch all doctors, exclude password field
    const doctors = await doctorModel.find({}).select("-password");

    // Check if any doctors exist
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No doctors found in the database."
      });
    }

    // Successful response
    return res.status(200).json({
      success: true,
      message: "Doctors fetched successfully.",
      doctors
    });
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error: Unable to fetch doctors.",
      error: error.message
    });
  }
};

export { addDoctor, loginAdmin, allDoctors };