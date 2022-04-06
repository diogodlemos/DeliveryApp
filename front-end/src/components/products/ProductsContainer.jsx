import React from 'react';
import { useHistory } from 'react-router-dom';
import { useProductsContext } from '../../context/ProductsContext';
import Product from './Product';

const FIXED_DECIMALS = 10;

function ProductsContainer() {
  const { products, setProducts } = useProductsContext();
  const history = useHistory();

  const totalCost = products.reduce((prev, curr) => {
    const actualNumber = prev + curr.quantity * Number(curr.price);
    return +actualNumber.toFixed(FIXED_DECIMALS);
  }, 0);

  return (
    <div className="products-container">
      {products.map((product) => (
        <Product
          key={ product.id }
          product={ product }
          setSelectedProducts={ setProducts }
        />
      ))}
      <button
        type="button"
        className="product-container-total"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ totalCost === 0 }
      >
        <p>
          Ver Carrinho: R$
          <span data-testid="customer_products__checkout-bottom-value">
            {` ${totalCost.toFixed(2).toString().replace('.', ',')}`}
          </span>
        </p>
      </button>
    </div>
  );
}

export default ProductsContainer;
