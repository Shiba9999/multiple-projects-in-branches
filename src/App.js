import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  if (products.length > 0) {
    console.log([...Array(products.length / 10)]);
  }
  function selectPageHandler(selectedPage) {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 
    ) {
      setPage(selectedPage);
    }
  }
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => (
            <span key={prod.id} className="products__single">
              <img src={prod.thumbnail} alt={prod.title} />
              <p>{prod.title}</p>
            </span>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
           className={page>1 ? "" :"pagination__disabled"}
          onClick={() => selectPageHandler(page - 1)}>👈</span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              className={page === i + 1 ? "pagination__selected" : ""}
              onClick={() => selectPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}
          <span 
          className={page < products.length/10 ? "" :"pagination__disabled"}
          onClick={() => selectPageHandler(page + 1)}>👉</span>
        </div>
      )}
    </div>
  );
};

export default App;
