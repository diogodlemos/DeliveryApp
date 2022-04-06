import React from 'react';
import PropTypes from 'prop-types';
import { useProductsContext } from '../../context/ProductsContext';

function CheckoutProduct({ product, index }) {
  const { setProducts } = useProductsContext();

  const handleDelete = () => {
    setProducts((state) => {
      const newState = state.map((p) => {
        if (p.id === product.id) return { ...p, quantity: 0 };
        return p;
      });
      return newState;
    });
  };

  return (
    <div className="checkout-product">
      <div style={ { display: 'flex', width: '100%', height: '100%' } }>
        <p
          className="checkout-product-index"
          data-testid={ `customer_checkout__element-order-table-item-number-${
            index - 1
          }` }
        >
          {index}
        </p>
        <p
          className="checkout-product-name"
          data-testid={ `customer_checkout__element-order-table-name-${index - 1}` }
        >
          {product.name}
        </p>
      </div>
      <div style={ { display: 'flex', height: '100%' } }>
        <div
          className="checkout-product-common checkout-green"
          data-testid={ `customer_checkout__element-order-table-quantity-${
            index - 1
          }` }
        >
          {product.quantity}
        </div>
        <div
          className="checkout-product-common checkout-purple"
          data-testid={ `customer_checkout__element-order-table-unit-price-${
            index - 1
          }` }
        >
          R$
          {' '}
          {product.price.toString().replace('.', ',')}
        </div>
        <div
          className="checkout-product-common checkout-blue"
          data-testid={ `customer_checkout__element-order-table-sub-total-${
            index - 1
          }` }
        >
          R$
          {' '}
          {(product.price * product.quantity).toFixed(2).toString().replace('.', ',')}
        </div>
        <button
          type="button"
          onClick={ handleDelete }
          className="checkout-product-common checkout-greeny"
          data-testid={ `customer_checkout__element-order-table-remove-${
            index - 1
          }` }
        >
          Remover
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;

CheckoutProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    url_image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
