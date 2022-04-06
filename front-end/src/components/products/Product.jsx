import React from 'react';
import PropTypes from 'prop-types';
import ProductCounter from './ProductCounter';

function Product({ product, setSelectedProducts }) {
  return (
    <div className="product-container">
      <img
        src={ product.urlImage }
        alt=""
        className="product-image"
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
      />
      <div className="product-infos">
        <p
          style={ { textAlign: 'center' } }
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          {product.name}
        </p>
        <ProductCounter
          id={ product.id }
          product={ product }
          setSelectedProducts={ setSelectedProducts }
        />
      </div>
      <div className="product-container-price">
        <p>
          R$
          <span
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            {` ${product.price.replace('.', ',')}`}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
};
