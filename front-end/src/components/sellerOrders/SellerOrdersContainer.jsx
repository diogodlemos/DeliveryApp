import React, { useEffect, useState } from 'react';
import { getSalesByUserId } from '../../api/sale';
import { useUserContext } from '../../context/UserContext';
import SellerOrdersCard from './SellerOrdersCard';

function SellerOrdersContainer() {
  const [sales, setSales] = useState([]);
  const { user } = useUserContext();
  console.log(sales);

  useEffect(() => {
    if (!user.id) return;
    const fetchSales = async () => {
      const { sales: salesResponse } = await getSalesByUserId(user.token, user.id);
      setSales(salesResponse);
    };
    fetchSales();
  }, [user.id, user.token]);

  return (
    <div className="user-orders">
      {sales.map((order) => (
        <SellerOrdersCard key={ order.id } order={ order } />
      ))}
    </div>
  );
}

export default SellerOrdersContainer;
