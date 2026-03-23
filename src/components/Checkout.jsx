import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import "./Checkout.css";
import Footer from "../components/Footer";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems = [], subtotal = 0, clearCart } = useContext(CartContext);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const [step, setStep] = useState(1);

  /* ADDRESS */
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", text: "T Nagar, Chennai" },
    { id: 2, type: "Office", text: "Guindy, Chennai" }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(1);

  const [form, setForm] = useState({ type: "", text: "" });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editId, setEditId] = useState(null);

  /* PAYMENT */
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [cards, setCards] = useState([
    { id: 1, number: "**** 6669", name: "Raj", expiry: "12/26" }
  ]);

  const [cardForm, setCardForm] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const [showCardModal, setShowCardModal] = useState(false);
  const [editCardId, setEditCardId] = useState(null);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  /* ADDRESS */
  const saveAddress = () => {
    if (!form.type || !form.text) {
      return alert("Please fill all address fields!");
    }

    if (editId) {
      setAddresses(prev =>
        prev.map(a => (a.id === editId ? { ...a, ...form } : a))
      );
    } else {
      setAddresses(prev => [...prev, { id: Date.now(), ...form }]);
    }

    setShowAddressModal(false);
    setForm({ type: "", text: "" });
    setEditId(null);
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  /* CARD */
  const saveCard = () => {
    const { number, name, expiry, cvv } = cardForm;

    if (!/^[A-Za-z\s]+$/.test(name)) {
      return alert("Name should contain only letters");
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    if (!expiryRegex.test(expiry)) {
      return alert("Enter expiry in MM/YY format");
    }

    const [month, year] = expiry.split("/").map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return alert("Card expiry must be in the future");
    }

    if (editCardId) {
      setCards(prev =>
        prev.map(c =>
          c.id === editCardId ? { ...c, name, expiry } : c
        )
      );
    } else {
      if (!number || !cvv) {
        return alert("Enter full card details");
      }

      if (!/^[0-9]{16}$/.test(number)) {
        return alert("Invalid card number");
      }

      if (!/^[0-9]{3,4}$/.test(cvv)) {
        return alert("Invalid CVV");
      }

      const last4 = number.slice(-4);

      const newCard = {
        id: Date.now(),
        number: `**** ${last4}`,
        name,
        expiry
      };

      setCards(prev => [...prev, newCard]);
      setPaymentMethod(newCard.id);
    }

    setShowCardModal(false);
    setEditCardId(null);
    setCardForm({ number: "", name: "", expiry: "", cvv: "" });
  };

  const deleteCard = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  return (
    <>
      <Navbar />

      <div className="checkout-container">

        <div className="checkout-header">
          <FaArrowLeft className="back" onClick={() => navigate(-1)} />
          <h2>Checkout</h2>
        </div>

        <div className="steps">
          <div className={step >= 1 ? "step active" : "step"} onClick={() => setStep(1)}>Location</div>
          <div className={step >= 2 ? "step active" : "step"} onClick={() => setStep(2)}>Payment</div>
          <div className={step >= 3 ? "step active" : "step"} onClick={() => setStep(3)}>Summary</div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="section">
            <h3>Addresses</h3>

            {addresses.map(addr => (
              <div key={addr.id} className="option">
                <input
                  type="radio"
                  checked={selectedAddress === addr.id}
                  onChange={() => setSelectedAddress(addr.id)}
                />

                <div className="addr-text">
                  <strong>{addr.type}</strong>
                  <p>{addr.text}</p>
                </div>

                <div className="actions">
                  <FaEdit onClick={() => {
                    setShowAddressModal(true);
                    setEditId(addr.id);
                    setForm({ type: addr.type, text: addr.text });
                  }} />
                  <FaTrash onClick={() => deleteAddress(addr.id)} />
                </div>
              </div>
            ))}

            <button className="outline-btn" onClick={() => {
              setShowAddressModal(true);
              setEditId(null);
              setForm({ type: "", text: "" });
            }}>
              + Add Address
            </button>

            <button onClick={() => setStep(2)} className="next-btn">
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="section">
            <h3>Payment Method</h3>

            <div className="option">
              <input type="radio" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} />
              <span>Cash</span>
            </div>

            <div className="option">
              <input type="radio" checked={paymentMethod === "wallet"} onChange={() => setPaymentMethod("wallet")} />
              <span>Wallet</span>
            </div>

            <h4>Cards</h4>

            {cards.map(card => (
              <div key={card.id} className="card-item">
                <input type="radio" checked={paymentMethod === card.id} onChange={() => setPaymentMethod(card.id)} />

                <div className="card-box">
                  <div className="card-top">{card.number}</div>
                  <div className="card-bottom">
                    <div>
                      <p className="label">Card Holder</p>
                      <p className="value">{card.name}</p>
                    </div>
                    <div>
                      <p className="label">Expiry</p>
                      <p className="value">{card.expiry}</p>
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <FaEdit onClick={() => {
                    setShowCardModal(true);
                    setEditCardId(card.id);
                    setCardForm({ number: "", name: card.name, expiry: card.expiry, cvv: "" });
                  }} />
                  <FaTrash onClick={() => deleteCard(card.id)} />
                </div>
              </div>
            ))}

            <button className="outline-btn" onClick={() => setShowCardModal(true)}>
              + Add Card
            </button>

            <h4>More Payment Options</h4>

            <div className="option">
              <input type="radio" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} />
              <span>Paypal</span>
            </div>

            <div className="option">
              <input type="radio" checked={paymentMethod === "apple"} onChange={() => setPaymentMethod("apple")} />
              <span>Apple Pay</span>
            </div>

            <div className="option">
              <input type="radio" checked={paymentMethod === "gpay"} onChange={() => setPaymentMethod("gpay")} />
              <span>Google Pay</span>
            </div>

            <button onClick={() => setStep(3)} className="next-btn">
              Continue
            </button>
          </div>
        )}

        {/* ✅ STEP 3 FIXED */}
        {step === 3 && (
          <div className="section">
            <h3>Order Summary</h3>

            {cartItems.length === 0 ? (
              <p style={{ textAlign: "center" }}>Your cart is empty</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="summary-card">
                  <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `http://127.0.0.1:8000${item.image}`
                    }
                    alt={item.name}
                  />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.qty}</p>
                    <p>₹ {item.price}</p>
                  </div>
                </div>
              ))
            )}

            <h2 className="total">Total: ₹ {total}</h2>

            <button
              className="pay-btn"
              
onClick={() => {
  // ✅ get selected address
  const selectedAddr = addresses.find(a => a.id === selectedAddress);

  const orderData = {
    items: cartItems,
    total,
    date: new Date().toLocaleString(),
    address: selectedAddr // ✅ ADD THIS LINE
  };

  localStorage.setItem("lastOrder", JSON.stringify(orderData));

  setPaymentSuccess(true);
  clearCart();
}}
            >
              Pay Now
            </button>
          </div>
        )}

      </div>

      {/* ADDRESS MODAL */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editId ? "Edit Address" : "Add Address"}</h3>

            <input
              placeholder="Type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />

            <textarea
              placeholder="Address"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
            />

            <div className="modal-actions">
              <button onClick={() => setShowAddressModal(false)}>Cancel</button>
              <button onClick={saveAddress}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {paymentSuccess && (
        <div className="successed-overlay">
          <div className="successed-popup">
              <div className="tick-circle">✔</div>

            <h2>Payment Successful!</h2>
            <button onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      )}
      <Footer/>
    </>
   
  );
}

export default Checkout;