import React from 'react';
import ProductsNavbar from '../components/common/ProductsNavbar';
import UserOrdersContainer from '../components/userOrders/UserOrdersContainer';
import '../styles/orders.css';

function CustomerAllOrders() {
  return (
    <>
      <ProductsNavbar />
      <UserOrdersContainer />
    </>
  );
}

export default CustomerAllOrders;
