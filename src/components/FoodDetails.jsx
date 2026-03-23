import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../api";
import "./FoodDetails.css";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";   // ✅ ADD
import AuthModal from "../components/AuthModal";        // ✅ ADD
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../components/Footer";
export default function FoodDetails() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // ✅ CHECK LOGIN

  const [showAuth, setShowAuth] = useState(false); // ✅ POPUP CONTROL

  useEffect(() => {
    fetch(`${BASE_URL}/api/food/${id}/`)
      .then(res => res.json())
      .then(data => setFood(data));
  }, [id]);

  if (!food) return <p>Loading...</p>;

  // ✅ COMMON LOGIN CHECK
  const requireLogin = () => {
    if (!user) {
      setShowAuth(true); // 🔥 open signup/login popup
      return false;
    }
    return true;
  };

  // ✅ Buy Now handler
  const handleBuyNow = () => {
    if (!requireLogin()) return;

    addToCart(food);
    navigate("/cart");
  };

  // ✅ Add to cart handler
  const handleAddToCart = () => {
    if (!requireLogin()) return;

    addToCart(food);
  };

  return (
    <>
      <Navbar />

      <div className="details-container">

        {/* LEFT IMAGE */}
        <div className="left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>

          <img
            src={
              food.image?.startsWith("http")
                ? food.image
                : `${BASE_URL}${food.image}`
            }
            alt={food.name}
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="right">
          <h2>{food.name}</h2>
          <p className="price">₹ {food.price}</p>
          <p className="desc">{food.description}</p>

          <div className="actions">
            <button className="add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ✅ LOGIN POPUP */}
      {showAuth && (
        <AuthModal 
  close={() => setShowAuth(false)} 
  defaultMode="login"   // 🔥 OPEN REGISTER DIRECTLY
/>
      )}
      <Footer/>
    </>
   
    
  );
}