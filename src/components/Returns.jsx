import React from "react";
import "./Returns.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Returns() {
  return (
    <>
      <Navbar />

      <div className="returns-container">
        <h1 className="returns-title">Returns & Refunds</h1>

        <p className="returns-intro">
          We strive to provide the best quality food. If you face any issues, we’re here to help.
        </p>

        <div className="returns-box">

          <div className="returns-item">
            <h3>🔄 Easy Returns</h3>
            <p>If your order is incorrect or damaged, you can request a return.</p>
          </div>

          <div className="returns-item">
            <h3>💰 Refund Policy</h3>
            <p>Refunds will be processed within 3–5 business days.</p>
          </div>

          <div className="returns-item">
            <h3>📞 Support</h3>
            <p>Contact our support team within 24 hours of delivery.</p>
          </div>

          <div className="returns-item">
            <h3>❗ Conditions</h3>
            <p>Items must be unused and reported immediately after delivery.</p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Returns;