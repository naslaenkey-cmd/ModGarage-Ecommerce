
import { Link } from "react-router-dom";
import categories from "../constants/categories";
import "./CategorySection.css";

function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-heading">
        <p className="category-subtitle">
          BUILT FOR YOUR DRIVE
        </p>

        <h2>EXPLORE OUR COLLECTION</h2>

        <p>
          Discover premium upgrades designed to transform
          your driving experience.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="category-card"
            key={category.id}
            style={{
              backgroundImage: `url("${category.image}")`,
            }}
          >
            <div className="category-card-overlay">
              <div className="category-card-content">
                <span className="category-number">
                  {String(category.id).padStart(2, "0")}
                </span>

                <h3>{category.name}</h3>

                <p>{category.description}</p>

                <span className="category-explore">
                  EXPLORE COLLECTION
                  <span className="category-arrow">↗</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
