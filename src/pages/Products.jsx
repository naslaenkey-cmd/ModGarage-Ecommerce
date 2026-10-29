
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice";


function Products() {
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

const productsPerPage = 8;


const filteredProducts = items.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

const sortedProducts = [...filteredProducts];

if (sortOrder === "low-to-high") {
  sortedProducts.sort((a, b) => a.price - b.price);
} else if (sortOrder === "high-to-low") {
  sortedProducts.sort((a, b) => b.price - a.price);
}


const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);



const lastIndex = currentPage * productsPerPage;
const firstIndex = lastIndex - productsPerPage;

const currentProducts =sortedProducts .slice(firstIndex, lastIndex);




  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (items.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      <h1>ModGarage Products</h1>
 <input
  type="text"
  placeholder="Search car accessories..."
  value={searchTerm}
  onChange={(event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }}
  />
     <select
  value={selectedCategory}
  onChange={(event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  }}
>
  <option value="All">All Categories</option>
  <option value="Exterior Upgrades">Exterior Upgrades</option>
  <option value="Interior Upgrades">Interior Upgrades</option>
  <option value="Lighting">Lighting</option>
  <option value="Wheels & Tyres">Wheels & Tyres</option>
  <option value="Performance Parts">Performance Parts</option>
  <option value="Car Care & Detailing">Car Care & Detailing</option>
  <option value="Electronics & Accessories">
    Electronics & Accessories
  </option>
</select>


<select
  value={sortOrder}
  onChange={(event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1);
  }}
>
  <option value="default">Default Order</option>
  <option value="low-to-high">Price: Low to High</option>
  <option value="high-to-low">Price: High to Low</option>
</select>







      { currentProducts.map((product) => (
        <div key={product.id}>
          
         <h2>
          <Link to={`/products/${product.id}`}>
          {product.name}
           </Link>
          </h2>
          <p>Category: {product.category}</p>
          <p>Price: ₹{product.price}</p>
          <p>{product.description}</p>
          <p>
            Stock:{" "}
            {product.stock > 0 ? product.stock : "Out of stock"}
          </p>

          

          
        </div>
      ))}
      <div>
  <button
    onClick={() => setCurrentPage((page) => page - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <span>
    {" "} Page {currentPage} of {totalPages} {" "}
  </span>

  <button
    onClick={() => setCurrentPage((page) => page + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
   </div>


    </div>
  );
}

export default Products;
