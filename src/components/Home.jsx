import { useEffect, useState } from "react";
import BASE_URL from "../api";
import FoodCard from "../components/FoodCard";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { FaLeaf, FaCheckCircle, FaShippingFast } from "react-icons/fa";
import Footer from "../components/Footer";
import "./Home.css";

export default function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/foods/`)
      .then(res => res.json())
      .then(data => setFoods(data));
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <div className="food-list">
        {foods.map(item => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>




    <div className="why">
      <h2>WHY CHOOSE US?</h2>

      <div className="why-container">
        <div className="why-card">
          <FaLeaf className="icons" />
          <h3>Always Healthy Food</h3>
          <p>
            We serve fresh and hygienic food made with quality ingredients.
          </p>
        </div>

        <div className="why-card">
          <FaCheckCircle className="icons" />
          <h3>Best Quality</h3>
          <p>
            Our food is prepared with top quality standards and care.
          </p>
        </div>

        <div className="why-card">
          <FaShippingFast className="icons" />
          <h3>Fast Delivery</h3>
          <p>
            Get your food delivered quickly at your doorstep.
          </p>
        </div>
      </div>
    </div>
<Footer/>
        
    </>
  );
}