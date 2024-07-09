/* eslint-disable*/
import React from 'react'
import Product from '../components/product/SingleProduct'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  const { id } = useParams()
  return (
    <>
      {id ? <Product productId={id} /> : <div>ID is required please!</div>}
    </>

  )
}

export default SingleProduct