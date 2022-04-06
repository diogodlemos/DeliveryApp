import React from 'react';
import PropTypes from 'prop-types';
import socket from '../../api/socketClient';

function OrderStatusbar({ sale }) {
  if (sale.id === undefined) return null;
  const saleDatePt = new Date(sale.saleDate).toLocaleDateString('pt-br');
  return (
    <div className="statusbar">
      <p
        className="order"
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        {`PEDIDO ${sale.id}`}
      </p>
      <p
        className="seller"
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        P Vend:
        <span>{` ${sale.sellerId.name}`}</span>
      </p>
      <p
        className="date"
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {saleDatePt}
      </p>
      <p
        className="status"
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {sale.status}
      </p>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled={ sale.status !== 'Em Trânsito' }
        onClick={ () => {
          socket.emit('changeStatus', {
            id: sale.id,
            status: 'Entregue',
            role: 'customer',
          });
        } }
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );
}

export default OrderStatusbar;

OrderStatusbar.propTypes = {
  sale: PropTypes.shape({
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    id: PropTypes.number,
    saleDate: PropTypes.string,
    sellerId: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    userId: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
