import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import "./CartPage.css";
import BASE_URL from "../api"; 
import { useNavigate } from "react-router-dom"; 
import Footer from "../components/Footer";

export default function CartPage() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, subtotal } = useContext(CartContext);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;
const navigate = useNavigate(); 
  return (
    <>
      <Navbar />
      <div className="cart-container-page">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
         {cartItems.map(item => (
  <div key={item.id} className="cart-item">
    {/* IMAGE + REMOVE BUTTON */}
    <div className="cart-item-image">
      <img
        src={item.image?.startsWith("http") ? item.image : `${BASE_URL}${item.image}`}
        alt={item.name}
      />
     
    </div>

    {/* DETAILS */}
    <div className="cart-item-details">
      <h4>{item.name}</h4>
      <p>₹ {item.price}</p>
      <div className="qty">
        <button onClick={() => decreaseQty(item.id)}><FaMinus /></button>
        <span>{item.qty}</span>
        <button onClick={() => increaseQty(item.id)}><FaPlus /></button>
      </div>
    </div>


      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
      <FaTimes />
    </button>
  </div>
))}
            <div className="cart-summary">
              <p>Subtotal: ₹{subtotal}</p>
              <p>Delivery Fees: ₹{deliveryFee}</p>
              <h3>Total: ₹{total}</h3>
              <button 
                className="checkout-btn" 
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout ₹{total}
              </button>
            </div>
          </>
        )}
      </div>
      <Footer/>
    </>
  );
}