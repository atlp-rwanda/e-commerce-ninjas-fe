import React from 'react';
import { addProduct } from '../../store/features/cartSlice';
import { useAppDispatch } from '../../store/store';

const Add = () => {
  const dispatch = useAppDispatch();
  const addNewProduct = () => {
    const randomNum = Math.floor(Math.random() * 100);
    dispatch(addProduct({ name: `Product-${randomNum}` }));
  };
  return (
    <div>
      <button type="button" onClick={addNewProduct}>Add New random Product to Redux store </button>
    </div>
  );
};

export default Add;
