
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
  const { user } = useContext(AuthContext);

  const [showAuth, setShowAuth] = useState(false);

  // ✅ BUY NOW FUNCTION
  const handleBuyNow = () => {

    // ❌ NOT LOGGED IN
    if (!user) {
      setShowAuth(true);
      return;
    }

    // ✅ ADD TO CART
    addToCart(item);

    // ✅ GO TO CART PAGE
    navigate("/cart");
  };

  return (
    <>
      <div className="card">
        <img src={`${BASE_URL}${item.image}`} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>

        <div className="bottom">
          <span>₹{item.price}</span>

          <button onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>

      {/* ✅ LOGIN POPUP */}
      {showAuth && (
        <AuthModal
          close={() => setShowAuth(false)}
          defaultMode="login"
        />
      )}
    </>
  );
}