import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_copy";
import { toast } from "react-toastify";
import axios from "axios";
import RelatedDoctors from "../components/RelatedDoctors";


const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const slotScrollRef = useRef(null);
  const timeScrollRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return; // safety check
  
    const slots = [];
    const today = new Date();
  
    for (let i = 0; i < 7; i++) {
      const daySlots = [];
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
  
      // Set start time
      let startHour = 10;
      let startMinute = 0;
  
      if (i === 0) {
        // today
        const now = new Date();
        startHour = now.getHours();
        startMinute = now.getMinutes() < 30 ? 30 : 0;
        if (startHour < 10) startHour = 10;
        currentDate.setHours(startHour, startMinute, 0, 0);
      } else {
        currentDate.setHours(startHour, startMinute, 0, 0);
      }
  
      // Generate slots every 30 min
      while (currentDate < endTime) {
        // 12-hour format with AM/PM
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
  
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
  
        const slotDate = `${day}-${month}-${year}`;
        const slotTime = formattedTime;
  
        // Check if slot is already booked
        const bookedSlots = docInfo.slots_booked?.[slotDate] || [];
        const isSlotAvailable = !bookedSlots.includes(slotTime);
  
        if (isSlotAvailable) {
          daySlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      // Only add day if it has at least one slot
      if (daySlots.length > 0) {
        slots.push(daySlots);
      }
    }
  
    setDocSlots(slots);
  };
  

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
  
    try {
      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
  
      const slotDate = `${day}-${month}-${year}`;   // fixed
      const slotTimeFormatted = slotTime;          // ok
  
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime: slotTimeFormatted },
        { headers: { token } }
      );
  
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Backend error:", error.response?.data);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  
  
  useEffect(() => {
    if (doctors && docId) fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // Hide scroll hint when user scrolls horizontally
  const handleScroll = (ref) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setShowScrollHint(scrollLeft + clientWidth < scrollWidth - 10);
  };

  return (
    docInfo && (
      <div>
        {/* ------ Doctor Details ------ */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 sm:mt-0 shadow-lg">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-md font-medium mt-4 text-gray-700">
              Appointment Fee:{" "}
              <span className="font-medium">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ------ Appointment Slots ------ */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 relative">
          <p className="font-semibold mt-10">Booking Slots</p>

          <div
            ref={slotScrollRef}
            onScroll={() => handleScroll(slotScrollRef)}
            className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            {docSlots.length > 0 ? (
              docSlots.map((item, index) => {
                const dateObj = item[0]?.datetime
                  ? new Date(item[0].datetime)
                  : null;
                const isSelected = slotIndex === index;

                return (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-3 px-4 min-w-[60px] rounded-full cursor-pointer transition-all duration-300 
                      ${
                        isSelected
                          ? "bg-primary text-white shadow-md"
                          : "border border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    <p className="text-sm">
                      {dateObj ? daysOfweek[dateObj.getDay()] : "--"}
                    </p>
                    <p className="text-lg font-semibold">
                      {dateObj ? dateObj.getDate() : "--"}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm">No slots available</p>
            )}
          </div>

          {/* ------ Scroll Hint for Dates ------ */}
          {showScrollHint && (
            <div className="absolute right-2 top-[90px] text-gray-400 animate-pulse pointer-events-none">
              →
            </div>
          )}

          {/* ------ Time Slots ------ */}
          <div
            ref={timeScrollRef}
            onScroll={() => handleScroll(timeScrollRef)}
            className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-500 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* ------ Scroll Hint for Times ------ */}
          {showScrollHint && (
            <div className="absolute right-0 bottom-10 h-full w-16 bg-gradient-to-l from-white via-white/90 to-transparent flex items-center justify-end pointer-events-none">
              <span className="text-3xl font-bold text-primary animate-bounce pr-3">
                →
              </span>
            </div>
          )}

          <button onClick={bookAppointment} className="bg-primary text-white text-md font-light px-14 py-3 rounded-full my-6">
            Book an Appointment
          </button>
        </div>

        {/* ------------ Listing Related Doctors ------------ */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
