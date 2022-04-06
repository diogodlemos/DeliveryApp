import React, { useEffect, useState } from 'react';
import { getSalesByUserId } from '../../api/sale';
import { useUserContext } from '../../context/UserContext';
import UserOrderCard from './UserOrderCard';

function UserOrdersContainer() {
  const [sales, setSales] = useState([]);
  const { token, user } = useUserContext();
  console.log(sales);

  useEffect(() => {
    if (token === '') return;
    const fetchSales = async () => {
      const { sales: salesResponse } = await getSalesByUserId(token, user.id);
      setSales(salesResponse);
    };
    fetchSales();
  }, [token, user.id]);
  return (
    <div className="user-orders">
      {sales.map((order) => (
        <UserOrderCard key={ order.id } order={ order } />
      ))}
    </div>
  );
}

export default UserOrdersContainer;
