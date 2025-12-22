import doctorModel from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    // Validate docId
    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required.",
      });
    }

    const doctor = await doctorModel.findById(docId);

    // Check if doctor exists
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    // Update availability in one atomic operation
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      { available: !doctor.available },
      { new: true } // return updated document
    );

    res.status(200).json({
      success: true,
      message: "Doctor availability status updated successfully.",
      doctor: updatedDoctor,
    });

  } catch (error) {
    console.error("Error updating doctor availability:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error: Unable to update doctor availability.",
      error: error.message,
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error: Unable to fetch doctors.",
    });
  }
};

export { changeAvailability, doctorList };
