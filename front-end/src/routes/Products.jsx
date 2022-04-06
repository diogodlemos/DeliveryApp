import React from 'react';
import ProductsContainer from '../components/products/ProductsContainer';
import ProductsNavbar from '../components/common/ProductsNavbar';
import '../styles/products.css';

function Products() {
  return (
    <div>
      <ProductsNavbar />
      <ProductsContainer />
    </div>
  );
}

export default Products;
