import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllProducts } from '../api/products';

const productsList = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    url_image: '/images/skol_lata_350ml.jpg',
    quantity: 0,
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    url_image: '/images/heineken_600ml.jpg',
    quantity: 0,
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: '2.49',
    url_image: '/images/antarctica_pilsen_300ml.jpg',
    quantity: 0,
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: '7.50',
    url_image: '/images/brahma_600ml.jpg',
    quantity: 0,
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: '2.19',
    url_image: '/images/skol_269ml.jpg',
    quantity: 0,
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: '4.49',
    url_image: '/images/skol_beats_senses_313ml.jpg',
    quantity: 0,
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: '4.99',
    url_image: '/images/becks_330ml.jpg',
    quantity: 0,
  },
  {
    id: 8,
    name: 'Brahma Duplo Malte 350ml',
    price: '2.79',
    url_image: '/images/brahma_duplo_malte_350ml.jpg',
    quantity: 0,
  },
  {
    id: 9,
    name: 'Becks 600ml',
    price: '8.89',
    url_image: '/images/becks_600ml.jpg',
    quantity: 0,
  },
  {
    id: 10,
    name: 'Skol Beats Senses 269ml',
    price: '3.57',
    url_image: '/images/skol_beats_senses_269ml.jpg',
    quantity: 0,
  },
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: '3.49',
    url_image: '/images/stella_artois_275ml.jpg',
    quantity: 0,
  },
];

const ProductsContext = createContext();

export function ProductContextWrapper({ children }) {
  const [products, setProducts] = useState(productsList);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getAllProducts();
      const { products: fetchedProducts } = data;
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={ { products, setProducts } }
    >
      {children}
    </ProductsContext.Provider>
  );
}

ProductContextWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function useProductsContext() {
  return useContext(ProductsContext);
}
