import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {

  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LOGO + ABOUT */}
        <div className="footer-col">
          <h2 className="logo">DailyDine</h2>
          <p>
            Serving fresh, delicious, and hygienic food every day. 
            Quality meals delivered to your doorstep.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/menu")}>Menu</li>
            <li onClick={() => navigate("/about")}>About Us</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li onClick={() => navigate("/faq")}>FAQs</li>
            <li onClick={() => navigate("/shipping")}>Shipping</li>
            <li onClick={() => navigate("/returns")}>Returns</li>
            <li onClick={() => navigate("/privacy")}>Privacy Policy</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="footer-col">
  <h3>Follow Us</h3>

  <div className="social-icons">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <FaFacebookF />
    </a>

    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <FaInstagram />
    </a>

    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <FaTwitter />
    </a>
  </div>
</div>
        

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 DailyDine. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;