import React from 'react';
import PropTypes from 'prop-types';
import ProductsNavbar from '../components/common/ProductsNavbar';
import OrdersContainer from '../components/orders/OrderContainer';
import '../styles/checkoutOrders.css';

function CustomerOrders(props) {
  const { match } = props;
  const { id } = match.params;
  return (
    <>
      <ProductsNavbar />
      <OrdersContainer id={ id } />
    </>
  );
}

export default CustomerOrders;

CustomerOrders.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
