import React from 'react';
import { useAppSelector } from '../../store/store';

const List = () => {
  const products = useAppSelector((state) => state.cart.products);
  return (
    <div>
      <div>
        <h2>All Products in Redux Store</h2>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
