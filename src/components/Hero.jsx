import { useEffect, useState } from "react";
import BASE_URL from "../api";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [hero, setHero] = useState(null);
const navigate = useNavigate(); 
  useEffect(() => {
    fetch(`${BASE_URL}/api/hero/`)
      .then(res => res.json())
      .then(data => setHero(data));
  }, []);

  if (!hero) return <p>Loading...</p>;

  return (
    <div className="hero">
      <div className="hero-left">
        <p className="tag">{hero.tag}</p>
        <h1>{hero.title}</h1>
        <p className="desc">{hero.subtitle}</p>

       <button onClick={() => navigate("/menu")}>
        {hero.button_primary}
      </button>
      </div>

      <div className="hero-right">
        <img src={`${BASE_URL}${hero.main_image}`} alt="" />
      </div>
    </div>
  );
}