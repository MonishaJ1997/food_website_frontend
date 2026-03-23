import React from "react";
import "./Shipping.css";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; // import footer

function Shipping() {
  return (
    <>
      <Navbar />

      <div className="shipping-container">
        <h1 className="shipping-title">Shipping Information</h1>

        <p className="shipping-intro">
          We ensure fast, safe, and reliable delivery of your meals.
        </p>

        <div className="shipping-box">

          <div className="shipping-item">
            <h3>🚚 Delivery Time</h3>
            <p>Orders are delivered within 30–45 minutes.</p>
          </div>

          <div className="shipping-item">
            <h3>📍 Delivery Areas</h3>
            <p>We currently deliver across major areas in your city.</p>
          </div>

          <div className="shipping-item">
            <h3>💳 Payment Options</h3>
            <p>Cash on delivery and online payments are accepted.</p>
          </div>

          <div className="shipping-item">
            <h3>📦 Order Tracking</h3>
            <p>You will receive live updates once your order is placed.</p>
          </div>

        </div>
      </div>

      <Footer /> {/* add footer here */}
    </>
  );
}

export default Shipping;