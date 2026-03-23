import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!user) return <h2 style={{ textAlign: "center" }}>Please login</h2>;

  return (
    <>
      <Navbar />

      <div className="profile-container">

        {/* LEFT SIDE */}
        <div className="profile-left">

          <div className="profile-card">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          <div className="info-box">
            <h4>Delivery Address</h4>
            <p>{order?.address?.text || "No address available"}</p>
          </div>

          <div className="info-box">
            <h4>Phone Number</h4>
           <p>{user.phone}</p>
          </div>

          <button
  className="logout-btn"
  onClick={() => {
    logout();
    localStorage.removeItem("lastOrder");          // clear user
    navigate("/");     // go to home
  }}
>
  Logout
</button>

        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right">

          <h3>Order Summary</h3>

          {!order ? (
            <p>No orders yet</p>
          ) : (
            <>
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.qty}</p>
                  </div>
                  <span>₹ {item.price}</span>
                </div>
              ))}

              <div className="order-total">
                Total: ₹ {order.total}
              </div>

              <p className="order-date">
                Ordered on: {order.date}
              </p>
            </>
          )}

        </div>

      </div>
      <Footer/>
    </>
  );
}