/* eslint-disable*/
import React from 'react'
import SellerProduct from '../../components/product/SellerProduct'
import { useParams } from 'react-router-dom'

const SellerViewProduct = () => {
  const { id } = useParams()
  return (
    <div className='seller-view-product-parent'>
      {id ? <SellerProduct productId={id} /> : <div>ID is required please!</div>}
    </div>

  )
}

export default SellerViewProduct