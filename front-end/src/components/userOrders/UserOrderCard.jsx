import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const colorDic = {
  pendente: '#D3C63C',
  entregue: '#3BD5B0',
  preparando: '#87D53C',
};

function UserOrderCard({ order }) {
  const orderLower = order.status.toLowerCase();
  const history = useHistory();

  const color = colorDic[orderLower];
  const localeDate = new Date(order.saleDate).toLocaleDateString('pt-br');
  const totalPricePt = order.totalPrice.replace('.', ',');

  return (
    <div
      className="order-card"
      aria-hidden="true"
      onClick={ () => history.push(`/customer/orders/${order.id}`) }
    >
      <div className="order">
        <p>Pedido</p>
        <p
          className="number"
          data-testid={ `customer_orders__element-order-id-${order.id}` }
        >
          {order.id}
        </p>
      </div>
      <div className="status" style={ { backgroundColor: color } }>
        <p data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
          {order.status}
        </p>
      </div>
      <div className="info">
        <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
          {localeDate}
        </p>
        <p>
          R$
          <span
            data-testid={ `customer_orders__element-card-price-${order.id}` }
          >
            {` ${totalPricePt}`}

          </span>
        </p>
      </div>
    </div>
  );
}

export default UserOrderCard;

UserOrderCard.propTypes = {
  order: PropTypes.shape({
    totalPrice: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
