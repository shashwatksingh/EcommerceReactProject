import React, { useState, useEffect } from "react";
import { Products, Navbar } from "./components";
import { commerce } from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  //Fetching the products on app start
  const fetchProducts = async ()=> {
    //Destructing the data that we get on the response after awaiting for it
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  //Only run at the start.
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <Products products={products} />
    </div>
  );
};

export default App;
