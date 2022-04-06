import React from 'react';
import PropTypes from 'prop-types';
import socket from '../../api/socketClient';
import { useUserContext } from '../../context/UserContext';

function SellerOrderStatusbar({ details }) {
  const datePt = new Date(details.saleDate).toLocaleDateString('pt-br');
  const { user } = useUserContext();
  return (
    <div className="seller-statusbar">
      <p
        className="order"
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {`PEDIDO ${details.id}`}
      </p>
      <p
        className="date"
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {datePt}
      </p>
      <p
        className="status"
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {details.status}
      </p>
      <button
        type="button"
        className="prepare"
        data-testid="seller_order_details__button-preparing-check"
        disabled={ details.status !== 'Pendente' }
        onClick={ () => {
          socket.emit('changeStatus', {
            id: details.id,
            status: 'Preparando',
            role: user.role,
          });
        } }
      >
        PREPARAR PEDIDO
      </button>
      <button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        disabled={ details.status !== 'Preparando' }
        onClick={ () => {
          socket.emit('changeStatus', {
            id: details.id,
            status: 'Em Trânsito',
            role: user.role,
          });
        } }
      >
        SAIU PARA ENTREGA
      </button>
    </div>
  );
}

export default SellerOrderStatusbar;

SellerOrderStatusbar.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
  }).isRequired,
};
