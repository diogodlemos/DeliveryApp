import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createSale } from '../../api/sale';
import { getAllUsers } from '../../api/register';
import { useProductsContext } from '../../context/ProductsContext';
import { useUserContext } from '../../context/UserContext';

function CheckoutDeliver() {
  const { user, token } = useUserContext();
  const { products } = useProductsContext();
  const cart = products.filter((product) => product.quantity > 0);
  const cartTotal = cart.reduce(
    (prev, curr) => prev + curr.quantity * Number(curr.price),
    0,
  );

  const history = useHistory();

  const [infoSale, setInfoSale] = useState({
    sellerId: '',
    deliveryAddress: '',
    deliveryNumber: '',
  });
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState('');

  function handleChangeInfoSale({ target }) {
    setInfoSale({
      ...infoSale,
      [target.name]: target.value,
    });
    setError('');
  }

  async function onSubmitSaleProducts(event) {
    event.preventDefault();
    const itens = cart.map(({ id, quantity }) => ({ id, quantity }));

    const sale = {
      ...infoSale,
      userId: user.id,
      totalPrice: cartTotal,
      saleDate: Date.now(),
      status: 'Pendente',
    };

    const newSale = await createSale(sale, itens, token);

    if (newSale.id) {
      history.push({ pathname: `/customer/orders/${newSale.id}` });
    }

    if (newSale.message) setError(newSale.message);
  }

  useEffect(() => {
    const getAllSellers = async () => {
      const { users } = await getAllUsers(user.token);
      setSellers(users.filter((item) => item.role === 'seller'));
      setInfoSale((prev) => (
        { ...prev, sellerId: users.find((item) => item.role === 'seller').id }));
    };
    getAllSellers();
  }, [user.token]);

  return (
    <div className="checkout">
      teste
      <form className="checkout-container">
        <div>
          <select
            className="addres"
            name="sellerId"
            id="sellerId"
            onChange={ handleChangeInfoSale }
            data-testid="customer_checkout__select-seller"
          >
            { sellers && sellers
              .map((seller) => (
                <option value={ seller.id } key={ seller.name }>{seller.name}</option>))}
          </select>
          <input
            className="addres"
            type="text"
            name="deliveryAddress"
            value={ infoSale.deliveryAddress }
            onChange={ handleChangeInfoSale }
            data-testid="customer_checkout__input-address"
          />
          Endereço
          <input
            className="addres"
            type="text"
            name="deliveryNumber"
            value={ infoSale.deliveryNumber }
            onChange={ handleChangeInfoSale }
            data-testid="customer_checkout__input-addressNumber"
          />
        </div>
        Nº
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ onSubmitSaleProducts }
        >
          FINALIZAR PEDIDO
        </button>

      </form>
      <span style={ { color: 'red' } }>{error}</span>
    </div>
  );
}

export default CheckoutDeliver;
