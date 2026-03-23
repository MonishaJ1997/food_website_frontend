import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Footer from "../components/Footer";
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regex for letters and spaces only (Name)
    const nameRegex = /^[A-Za-z\s]+$/;
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields!");
      return;
    }

    if (!nameRegex.test(formData.name)) {
      alert("Name can contain letters and spaces only!");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Show success popup
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    // Auto dismiss after 3s
    setTimeout(() => setSuccess(false), 3000);
  };

  // Close popup on click
  const closePopup = () => setSuccess(false);

  return (
    <>
      <Navbar />

      <section className="contact-section">
        <div className="contact-container">
          {/* LEFT SIDE */}
          <div className="contact-left">
            <h1>Contact <span>DailyDine</span></h1>
            <p>We’re here to help! Reach out for support, feedback, or inquiries.</p>

            <div className="contact-info">
              <p><FaPhoneAlt className="icon" /> +91 98765 43210</p>
              <p><FaEnvelope className="icon" /> support@dailydine.com</p>
              <p><FaMapMarkerAlt className="icon" /> 123 Food Street, Chennai, India</p>
            </div>

            <div className="extra-info">
              <h3>Working Hours</h3>
              <p>Mon - Fri: 9am - 9pm</p>
              <p>Sat - Sun: 10am - 7pm</p>
            </div>

           
          </div>

          {/* RIGHT SIDE */}
          <div className="contact-right">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  pattern="[A-Za-z\s]+"
                  title="Letters and spaces only"
                />
                <label>Name</label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Email</label>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder=" "
                ></textarea>
                <label>Message</label>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>

        

        {/* Success popup */}
        {success && (
          <div className="success-popup-overlay" onClick={closePopup}>
            <div className="success-popup-content">
              ✅ Message sent successfully!
            </div>
          </div>
        )}
      </section>
      <Footer/>
    </>
  );
}