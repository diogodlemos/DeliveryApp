import React from 'react';
import PropTypes from 'prop-types';
import SellerNavbar from '../components/common/SellerNavbar';
import SellerOrderContainer from '../components/sellerOrder/SellerOrderContainer';
import '../styles/order.css';

function SellerOrder(props) {
  const { match } = props;
  const { id } = match.params;
  console.log(id);
  return (
    <>
      <SellerNavbar />
      <SellerOrderContainer id={ id } />
    </>
  );
}

export default SellerOrder;

SellerOrder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
