import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function SellerNavbar() {
  const { setToken, setUser, user } = useUserContext();
  const history = useHistory();
  const handleLogout = () => {
    setToken('');
    setUser({});
    localStorage.removeItem('user');
    history.push('/');
  };
  return (
    <div className="nav-bar">
      <button
        type="button"
        className="nav-bar-item nav-bar-selected"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => {
          history.push('/seller/orders');
        } }
      >
        PEDIDOS
      </button>
      <div className="nav-bar-item nav-bar-user-container">
        <p
          className="nav-bar-user"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user.name}
        </p>
      </div>
      <button
        type="button"
        className="nav-bar-item nav-bar-exit"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ handleLogout }
      >
        Sair
      </button>
    </div>
  );
}

export default SellerNavbar;
