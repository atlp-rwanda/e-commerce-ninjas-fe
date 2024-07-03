/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/order */
/* eslint-disable react/jsx-tag-spacing */
import React from 'react'
import Product from '../components/product/Product'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  const { id } = useParams()
  return (
    <>
      <div>
        PRODUCT ({id})
      </div>
      <div>
        <Product />
      </div>
    </>

  )
}

export default SingleProduct