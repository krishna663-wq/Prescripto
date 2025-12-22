import React from "react";
import { assets } from "../assets/assets_copy";
const About = () => {
  return (
    <div className="px-6 md:px-20 lg:px-28 py-10 bg-gradient-to-b from-gray-50 to-white text-gray-700">
      {" "}
      {/* ---------- ABOUT US ---------- */}{" "}
      <div className="text-center mb-12">
        {" "}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-wide">
          {" "}
          ABOUT <span className="text-primary">US</span>{" "}
        </h2>{" "}
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          {" "}
          Learn more about who we are and what drives us.{" "}
        </p>{" "}
      </div>{" "}
      <div className="flex flex-col md:flex-row items-center gap-12">
        {" "}
        {/* Image Section */}{" "}
        <div className="flex justify-center md:justify-start w-full md:w-1/3">
          {" "}
          <img
            className="w-full max-w-[380px] rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300 border border-gray-200"
            src={assets.about_image}
            alt="About Prescripto"
          />{" "}
        </div>{" "}
        {/* Text Section */}{" "}
        <div className="flex flex-col gap-6 md:w-2/3 text-sm md:text-base leading-relaxed">
          {" "}
          <p>
            {" "}
            Welcome to{" "}
            <span className="font-semibold text-primary">Prescripto</span> —
            your trusted digital companion for smarter, simpler, and more
            connected healthcare. We understand how overwhelming it can be to
            manage doctor appointments, medical records, and health follow-ups.
          </p>{" "}
          <p>
            {" "}
            Our mission is to redefine how people experience healthcare by
            combining convenience, technology, and compassion. With Prescripto,
            scheduling an appointment, finding the right specialist, or managing
            your medical history becomes effortless, intuitive, and secure — all
            in one place.{" "}
          </p>{" "}
          <div>
            {" "}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {" "}
              Our Vision{" "}
            </h3>{" "}
            <p>
              {" "}
              We envision a world where healthcare is not a privilege, but a
              seamless, accessible experience for everyone. By bridging the gap
              between patients and healthcare providers through intelligent
              technology, Prescripto empowers individuals to make informed
              decisions and take charge of their well-being — anytime, anywhere.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* ---------- WHY CHOOSE US ---------- */}{" "}
      <div className="text-center mt-20 mb-10">
        {" "}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          {" "}
          WHY <span className="text-primary">CHOOSE US</span>{" "}
        </h2>{" "}
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          {" "}
          Discover what makes Prescripto the preferred choice for thousands of
          users.{" "}
        </p>{" "}
      </div>{" "}
      {/* Cards Section */}{" "}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {" "}
        {[
          {
            title: "EFFICIENCY",
            desc: "Streamlined appointment scheduling that fits your busy lifestyle.",
          },
          {
            title: "CONVENIENCE",
            desc: "Access a network of trusted healthcare professionals in your area.",
          },
          {
            title: "PERSONALIZATION",
            desc: "Get tailored recommendations and reminders to stay on top of your health.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 bg-white shadow-sm rounded-2xl px-8 py-10 text-center flex flex-col gap-4 hover:shadow-lg hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer"
          >
            {" "}
            <h4 className="text-lg font-semibold">{item.title}</h4>{" "}
            <p className="text-sm leading-relaxed">{item.desc}</p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
export default About;
