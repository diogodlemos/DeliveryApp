import React from 'react';
import Checkout from '../components/checkout/Checkout';
import CheckoutDeliver from '../components/checkout/CheckoutDeliver';
import ProductsNavbar from '../components/common/ProductsNavbar';
// import { ProductContextWrapper } from '../context/ProductsContext';
import '../styles/products.css';

function ProductsCheckout() {
  return (
    <div>
      <ProductsNavbar />
      <Checkout />
      <CheckoutDeliver />
    </div>
  );
}

export default ProductsCheckout;
