import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrderProduct from './OrderProduct';
import OrderStatusbar from './OrderStatusbar';
import { useUserContext } from '../../context/UserContext';
import { getSaleById } from '../../api/sale';
import socket from '../../api/socketClient';

function OrdersContainer({ id }) {
  const [sale, setSale] = useState({});
  const [products, setProducts] = useState([]);
  const { token } = useUserContext();

  useEffect(() => {
    const fetchSale = async () => {
      if (token === '') return;
      const saleResponse = await getSaleById(token, id);
      console.log(saleResponse);
      setProducts(saleResponse.products);
      setSale(saleResponse.sale);
      socket.on('refreshStatus', (status) => setSale((state) => ({ ...state, status })));
    };
    fetchSale();
  }, [id, token]);

  const cartTotal = products.reduce(
    (prev, curr) => prev + curr.quantity * Number(curr.price),
    0,
  );

  return (
    <div className="checkout-order">
      <OrderStatusbar sale={ sale } />
      {products.map((product, index) => (
        <OrderProduct key={ product.id } product={ product } index={ index + 1 } />
      ))}
      <div className="total-container">
        <p>
          Total: R$
          {' '}
          <span data-testid="customer_order_details__element-order-total-price">
            {`${cartTotal.toFixed(2).replace('.', ',')}`}
          </span>
        </p>
      </div>
    </div>
  );
}

export default OrdersContainer;

OrdersContainer.propTypes = {
  id: PropTypes.string.isRequired,
};
