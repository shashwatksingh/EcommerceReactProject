import React, { useState, useEffect } from "react";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  //Fetching the products on app start
  const fetchProducts = async () => {
    //Destructing the data that we get on the response after awaiting for it
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    //Fetching the cart from the Commerce.js
    const response = await commerce.cart.retrieve();
    setCart(response);
  };
  
  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCart(response.cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, {quantity});

    setCart(response.cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response.cart);
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  }
  
  //Only run at the start.
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  
  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />
          </Route>
          <Route exact="/checkout">
            <Checkout cart={cart}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
