import { useEffect, useState } from "react";
import "./Menu.css";
import BASE_URL from "../api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  FaCoffee,
  FaHamburger,
  FaPizzaSlice,
  FaUtensils,
  FaIceCream,
  FaLeaf,
  FaChevronDown
} from "react-icons/fa";
import Footer from "../components/Footer";
export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  const navigate = useNavigate();

  // 🔥 ICON MAPPING
  const getIcon = (name) => {
    name = name.toLowerCase();

    if (name.includes("breakfast")) return <FaCoffee />;
    if (name.includes("lunch")) return <FaUtensils />;
    if (name.includes("dinner")) return <FaHamburger />;
    if (name.includes("pizza")) return <FaPizzaSlice />;
    if (name.includes("dessert")) return <FaIceCream />;
    return <FaLeaf />;
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/menu/`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);

        if (data.length > 0) {
          setOpenCategory(data[0].id);
          setSelectedSub(data[0]?.subcategories?.[0] || null);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="main-container">

        {/* 🔥 SIDEBAR */}
        <div className="sidebar">

          {categories.map(cat => {
            const isOpen = openCategory === cat.id;

            return (
              <div key={cat.id}>

                {/* CATEGORY */}
                <div
                  className={`sidebar-item ${isOpen ? "active" : ""}`}
                  onClick={() =>
                    setOpenCategory(isOpen ? null : cat.id)
                  }
                >
                  <div className="left">
                    <span className="iconsed">{getIcon(cat.name)}</span>
                    <span>{cat.name}</span>
                  </div>

                  {/* 🔽 Arrow */}
                  <FaChevronDown
                    className={`arrow ${isOpen ? "rotate" : ""}`}
                  />
                </div>

                {/* 🔥 SUBCATEGORY (Animated) */}
                <div className={`subcategory-list ${isOpen ? "open" : ""}`}>
                  {cat.subcategories?.map(sub => (
                    <div
                      key={sub.id}
                      className={`sub-item ${
                        selectedSub?.id === sub.id ? "sub-active" : ""
                      }`}
                      onClick={() => setSelectedSub(sub)}
                    >
                      <span className="sub-icon">🍴</span>
                      {sub.name}
                    </div>
                  ))}
                </div>

              </div>
            );
          })}

        </div>

        {/* 🔥 RIGHT CONTENT */}
        <div className="content">

          <h2>{selectedSub?.name || "Select Category"}</h2>

          <div className="food-grid">
            {selectedSub?.foods?.map(food => (
              <div key={food.id} className="food-card">

                <img src={food.image} alt={food.name} />

                <div className="food-info">
                  <h4>{food.name}</h4>
                  <p>₹ {food.price}</p>

                  <button
                    onClick={() => navigate(`/food/${food.id}`)}
                  >
                    View Details
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
      <Footer/>
    </>
  );
}