import React from 'react';
import SellerNavbar from '../components/common/SellerNavbar';
import SellerOrdersContainer from '../components/sellerOrders/SellerOrdersContainer';
import '../styles/sellerOrders.css';

function SellerOrders() {
  return (
    <div>
      <SellerNavbar />
      <SellerOrdersContainer />
    </div>
  );
}

export default SellerOrders;
