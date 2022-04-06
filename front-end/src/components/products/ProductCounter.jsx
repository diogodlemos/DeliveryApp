import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { MdOutlineAdd, MdOutlineRemove } from 'react-icons/md';

function ProductCounter({ id, setSelectedProducts }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setSelectedProducts((state) => {
      const newState = state.map((p) => {
        if (p.id === id) return { ...p, quantity: counter };
        return p;
      });
      return newState;
    });
  }, [counter, id, setSelectedProducts]);

  return (
    <div className="product-counter">
      <button
        type="button"
        className="product-counter-button left"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => {
          setCounter((state) => {
            if (state === 0) return 0;
            return state - 1;
          });
        } }
      >
        <MdOutlineRemove size={ 20 } />
      </button>
      <input
        type="number"
        className="product-container-counter"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ counter.toString() }
        onChange={ (evt) => setCounter(Number(evt.target.value)) }
      />
      <button
        type="button"
        className="product-counter-button right"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ () => {
          setCounter((state) => state + 1);
        } }
      >
        <MdOutlineAdd size={ 20 } />
      </button>
    </div>
  );
}

export default ProductCounter;

ProductCounter.propTypes = {
  id: PropTypes.number.isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
};
