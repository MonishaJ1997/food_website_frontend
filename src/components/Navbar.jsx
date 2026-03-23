import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const { cartCount } = useContext(CartContext);
 const { user, login, register } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">

        {/* LOGO */}
        <h2 className="logo" onClick={() => navigate("/")}>
          DailyDine
        </h2>

        {/* MENU ICON */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>

        {/* NAV LINKS */}
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>

          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/menu" onClick={() => setMenuOpen(false)}>
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </li>

          {/* ✅ MOBILE SECTION */}
          <div className="mobile-only">

            {/* CART */}
            <div
              className="cartsed-container"
              onClick={() => {
                navigate("/cart");
                setMenuOpen(false);
              }}
            >
              <FaShoppingCart className="cartsed-icon" />
              <span className="cartsed-count">{cartCount}</span>
            </div>

            {/* USER / SIGNUP */}
            {user ? (
              <div
                className="user-box"
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
              >
                👤 {user.name}
              </div>
            ) : (
              <button
                className="signup"
                onClick={() => {
                  setShowAuth(true);
                  setMenuOpen(false);
                }}
              >
                Sign Up
              </button>
            )}
          </div>

        </ul>

        {/* ✅ DESKTOP RIGHT */}
        <div className="nav-right">

          {/* CART */}
          <div
            className="cartsed-container"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="cartsed-icon" />
            <span className="cartsed-count">{cartCount}</span>
          </div>

          {/* USER / SIGNUP */}
          {user ? (
            <div
              className="user-box"
              onClick={() => navigate("/profile")}
            >
              👤 {user.name}
            </div>
          ) : (
            <button
              className="signup"
              onClick={() => setShowAuth(true)}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>

      {/* AUTH MODAL */}
      {showAuth && (
  <AuthModal
    close={() => setShowAuth(false)}
    onLogin={login}      // pass login function
    onRegister={register} // pass register function
    defaultMode="login"
  />
)}
    </>
  );
}