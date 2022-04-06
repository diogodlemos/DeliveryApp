import React from 'react';
import { useProductsContext } from '../../context/ProductsContext';
import '../../styles/checkout.css';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
  const { products } = useProductsContext();
  const cart = products.filter((product) => product.quantity > 0);
  const cartTotal = cart.reduce(
    (prev, curr) => prev + curr.quantity * Number(curr.price),
    0,
  );
  return (
    <div className="checkout">
      <p>Finalizar Pedido</p>
      <div className="checkout-container">
        {cart.map((product, index) => (
          <CheckoutProduct
            product={ product }
            key={ product.id }
            index={ index + 1 }
          />
        ))}
        <div className="checkout-total-container">
          <p className="checkout-total">
            Total: R$
            <span data-testid="customer_checkout__element-order-total-price">
              {` ${cartTotal.toFixed(2).toString().replace('.', ',')}`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
