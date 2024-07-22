import React, { useEffect } from 'react'
import { ISingleProduct } from '../utils/types/product';
import { useAppDispatch, useAppSelector } from '../store/store';
import { deleteItem } from '../store/features/product/productSlice';

interface ProductProps {
  id: string;
  images: string[];
  name: string;
  price: string;
  stock: number;
  description: string;
  discount: number;
}

const SellerDeleteItem:React.FC<ProductProps>= ({id, images, name, price}) => {
    const dispatch = useAppDispatch();
    // const { product, isError, isSuccess, isLoading, message }: ISingleProduct = useAppSelector((state: any) => state.products);

    useEffect(()=>{
        dispatch(deleteItem(id))
    },[dispatch])
    

  return (
    <div>
        <p>{name}</p>
        <p>{price}</p>
        <img src={images[0]} alt="" />
    </div>
  )
}

export default SellerDeleteItem
