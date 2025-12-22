import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-6 md:px-0">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-700 text-sm md:text-base mt-3 font-medium">
          Last Updated: January 2025
        </p>
      </div>

      {/* Main Card */}
      <div className="
        max-w-5xl mx-auto 
        bg-white/60 backdrop-blur-xl
        p-10 md:p-14 
        rounded-3xl shadow-2xl border border-gray-200
      ">
        
        {/* Intro */}
        <p className="text-gray-700 leading-relaxed text-[16.2px] mb-12">
          Welcome to <span className="font-semibold text-primary">Prescripto</span>.  
          We care about your privacy and follow strict healthcare-grade data protection 
          standards to safeguard your personal information.  
          This policy describes how we collect, use, and secure your data when you book 
          appointments and use our platform.
        </p>

        {/* Sections */}
        <Section
          title="1. Information We Collect"
          content={[
            "Personal details: name, phone number, email, age.",
            "Appointment details: selected doctor, speciality, date & time slot.",
            "Technical info: device type, browser details, IP address.",
            "Payment data processed securely via certified payment gateways (we never store card details)."
          ]}
        />

        <Section
          title="2. How We Use Your Information"
          content={[
            "To book and manage appointments.",
            "To send alerts, reminders, and important updates.",
            "To analyze platform usage and improve features.",
            "To prevent fraud, maintain security, and follow legal obligations."
          ]}
        />

        <Section
          title="3. Data Protection Measures"
          content={[
            "Encrypted storage & encrypted data transmission.",
            "Industry-level firewalls and multi-layer security.",
            "Strict access control — only authorized staff can access essential data."
          ]}
        />

        <Section
          title="4. Sharing of Information"
          content={[
            "Doctors only receive essential appointment details.",
            "Payment gateways receive only required payment info.",
            "We never sell or trade your information to anyone.",
            "Data is shared only when required for legal, safety, or fraud-prevention reasons."
          ]}
        />

        <Section
          title="5. Cookies & Tracking"
          content={[
            "Cookies help improve performance, load times, and personalization.",
            "You may disable cookies, but certain features may not work fully.",
            "We use analytics tools to understand how users interact with our platform."
          ]}
        />

        {/* Highlight — Refund Section */}
        <HighlightedSection
          title="6. Refund & Cancellation Policy"
          content={[
            "All refunds are issued strictly by the respective hospital or clinic.",
            "Prescripto does not handle or process refunds online — even for online payments.",
            "Refund eligibility, timelines, and policies depend on the hospital’s rules.",
            "For any refund request, please contact the hospital reception directly."
          ]}
        />

        <Section
          title="7. Your Rights"
          content={[
            "Request correction of inaccurate information.",
            "Request deletion of your account and personal data.",
            "Opt-out of promotional messages anytime.",
            "Ask for details on how your data is collected and used."
          ]}
        />

        <Section
          title="8. Third-Party Services"
          content={[
            "We use trusted third-party providers for payments, analytics, and hosting.",
            "These partners follow strict international security standards.",
            "You may review third-party privacy policies for more details."
          ]}
        />

        <Section
          title="9. Updates to This Policy"
          content={[
            "We may revise this policy periodically.",
            "Major updates will be displayed prominently on this page.",
            "Continued use means acceptance of updated terms."
          ]}
        />

        {/* Contact */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">📩 Contact Us</h3>
          <p className="text-gray-700 text-[16px] leading-relaxed">
            For privacy or refund-related concerns, you may reach out at: <br />
            <span className="font-semibold text-primary text-lg">
              1209deepak.shukla@gmail.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

/* ------------------ Stylish Section Component ------------------ */
const Section = ({ title, content }) => (
  <div className="mb-12 transition-all duration-300 hover:bg-gray-50 p-5 rounded-2xl hover:shadow-md">
    <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
    <ul className="list-disc pl-6 text-gray-700 space-y-2 text-[16px]">
      {content.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

/* ------------------ Highlighted Section ------------------ */
const HighlightedSection = ({ title, content }) => (
  <div className="mb-12 bg-orange-50 border border-orange-300 p-6 rounded-2xl shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
        Important
      </span>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <ul className="list-disc pl-6 text-gray-700 space-y-2 text-[16px]">
      {content.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);
