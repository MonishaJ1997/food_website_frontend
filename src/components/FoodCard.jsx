import "./FoodCard.css";
import { useContext, useState } from "react";
import BASE_URL from "../api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";

export default function FoodCard({ item }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user, login, register } = useContext(AuthContext);

  const [showAuth, setShowAuth] = useState(false);

  const handleBuyNow = () => {
    if (!user) {
      setShowAuth(true); // show login modal
      return;
    }
    addToCart(item);
    navigate("/cart");
  };

  // ✅ Pass wrapper functions to AuthModal
  const handleLogin = (email, password) => {
    const res = login(email, password);
    return res; // must return { success: true } or { success: false, reason: "..." }
  };

  const handleRegister = (form) => {
    const res = register(form);
    return res; // optional
  };

  return (
    <>
      <div className="card">
        <img src={`${BASE_URL}${item.image}`} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="bottom">
          <span>₹{item.price}</span>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>

      {showAuth && (
        <AuthModal
          close={() => setShowAuth(false)}
          defaultMode="login"
          onLogin={login}       // pass context login
    onRegister={register} // pass context register
        />
      )}
    </>
  );
}