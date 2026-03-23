// About.jsx
import React from "react";
import Navbar from "../components/Navbar";
import "./About.css";
import { FaLeaf, FaPizzaSlice, FaCoffee } from "react-icons/fa";
import Footer from "../components/Footer";
export default function About() {
  return (
    <>
      <Navbar />

      {/* HERO / BANNER */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Welcome to <span>DailyDine</span></h1>
          <p>
            DailyDine is your go-to place for fresh, delicious, and hygienic food. 
            Our mission is to make every meal memorable with top-quality ingredients, 
            unique recipes, and a cozy experience.
          </p>
        </div>
      </section>

      {/* ABOUT CARDS */}
      <section className="about-cards-section">
        <div className="about-cards-container">
          <div className="about-card">
            <FaLeaf className="about-card-icon" />
            <h3>Fresh Ingredients</h3>
            <p>
              We source fresh, locally grown ingredients to ensure every meal is healthy and flavorful.
            </p>
          </div>
          <div className="about-card">
            <FaPizzaSlice className="about-card-icon" />
            <h3>Delicious Recipes</h3>
            <p>
              Our chefs craft unique and mouth-watering recipes to make every bite unforgettable.
            </p>
          </div>
          <div className="about-card">
            <FaCoffee className="about-card-icon" />
            <h3>Cozy Ambience</h3>
            <p>
              Enjoy your meals in a warm, inviting atmosphere designed for comfort and connection.
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story">
        <h2>Our Story</h2>
        <p>
          DailyDine started with a simple goal: serve healthy, high-quality food that brings joy to every table. 
          From humble beginnings, we now proudly deliver delicious meals to countless happy customers every day. 
          We believe in freshness, quality, and care in everything we do.
        </p>
      </section>
      <Footer/>
    </>
  );
}