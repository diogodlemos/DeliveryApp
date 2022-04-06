import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SellerOrderStatusbar from './SellerOrderStatusbar';
import SellerOrderProduct from './SellerOrderProduct';
import { useUserContext } from '../../context/UserContext';
import { getSaleById } from '../../api/sale';

function SellerOrderContainer({ id }) {
  const [sale, setSale] = useState([]);
  const [details, setDetails] = useState({});

  const { token } = useUserContext();

  useEffect(() => {
    const fetchSale = async () => {
      if (token === '') return;
      const { products, sale: saleDetails } = await getSaleById(token, id);
      setSale(products);
      setDetails(saleDetails);
    };
    fetchSale();
  }, [id, token]);

  const cartTotal = sale
    .reduce((prev, curr) => prev + curr.quantity * Number(curr.price), 0)
    .toFixed(2);

  return (
    <div className="checkout-order">
      <SellerOrderStatusbar id={ id } details={ details } />
      {sale.map((product, index) => (
        <SellerOrderProduct
          key={ product.id }
          product={ product }
          index={ index + 1 }
        />
      ))}
      <div className="total-container">
        <p data-testid="seller_order_details__element-order-total-price">
          Total: R$
          <span data-testid="seller_order_details__element-order-total-price">
            {` ${cartTotal.replace('.', ',')}`}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SellerOrderContainer;

SellerOrderContainer.propTypes = {
  id: PropTypes.string.isRequired,
};
