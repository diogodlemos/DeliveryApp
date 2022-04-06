import React from 'react';
import PropTypes from 'prop-types';

function OrderProduct({ product, index }) {
  return (
    <div className="checkout-product">
      <div style={ { display: 'flex', width: '100%', height: '100%' } }>
        <p
          className="checkout-product-index"
          data-testid={ `customer_order_details__element-order-table-item-number-${
            index - 1
          }` }
        >
          {index}
        </p>
        <p
          className="checkout-product-name"
          data-testid={ `customer_order_details__element-order-table-name-${index - 1}` }
        >
          {product.name}
        </p>
      </div>
      <div style={ { display: 'flex', height: '100%' } }>
        <div
          className="checkout-product-common checkout-green"
          data-testid={ `customer_order_details__element-order-table-quantity-${
            index - 1
          }` }
        >
          {product.quantity}
        </div>
        <div
          className="checkout-product-common checkout-purple"
          data-testid={ `customer_order_details__element-order-table-price-${
            index - 1
          }` }
        >
          R$
          {' '}
          {product.price}
        </div>
        <div
          className="checkout-product-common checkout-blue"
          data-testid={ `customer_order_details__element-order-table-sub-total-${
            index - 1
          }` }
          style={ { borderTopRightRadius: '7px', borderBottomRightRadius: '7px' } }
        >
          R$
          {' '}
          {(product.price * product.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;

OrderProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    url_image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
