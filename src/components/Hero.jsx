
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";
import "./Hero.css";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-navbar-label">
        <span>MODGARAGE</span>
        <span>EST. FOR AUTOMOTIVE ENTHUSIASTS</span>
      </div>

      <div className="hero-content">
        <p className="hero-subtitle">
          <span></span>
          THE ART OF AUTOMOTIVE MODIFICATION
        </p>

        <h1>
          REDEFINE
          <br />
          YOUR <span>DRIVE.</span>
        </h1>

        <p className="hero-description">
          Transform your machine with premium automotive
          upgrades, precision-engineered accessories and
          uncompromising style.
        </p>

        <div className="hero-actions">
          <Link to="/products" className="hero-button">
            EXPLORE COLLECTION
            <span>↗</span>
          </Link>

          <span className="hero-caption">
            PERFORMANCE MEETS PERSONALITY
          </span>
        </div>
      </div>

     

      <div className="hero-car-label">
        <span className="label-cross">✳</span>
        <div>
          <strong>MODGARAGE</strong>
          <small>DRIVE YOUR IDENTITY</small>
        </div>
      </div>

      <div className="hero-bottom">
        <span>01 — DISCOVER YOUR STYLE</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>

      <div className="hero-index">01 / 04</div>
    </section>
  );
}

export default Hero;
