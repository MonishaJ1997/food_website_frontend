import React from "react";
import "./PrivacyPolicy.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>

        <div className="privacy-content">

          <p>
            At DailyDine, we value your privacy and are committed to protecting your personal information.
          </p>

          <h3>1. Information We Collect</h3>
          <p>
            We may collect personal details such as your name, phone number, address, and payment information.
          </p>

          <h3>2. How We Use Your Information</h3>
          <p>
            Your information is used to process orders, improve our services, and provide better customer support.
          </p>

          <h3>3. Data Protection</h3>
          <p>
            We implement secure measures to protect your data from unauthorized access.
          </p>

          <h3>4. Sharing Information</h3>
          <p>
            We do not sell or share your personal data with third parties except for delivery purposes.
          </p>

          <h3>5. Cookies</h3>
          <p>
            Our website may use cookies to enhance user experience and analyze website traffic.
          </p>

          <h3>6. Your Rights</h3>
          <p>
            You have the right to access, update, or delete your personal information at any time.
          </p>

          <h3>7. Updates to Policy</h3>
          <p>
            We may update this policy occasionally. Changes will be posted on this page.
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;