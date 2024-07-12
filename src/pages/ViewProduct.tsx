/* eslint-disable*/
import React from 'react'
import SingleProduct from '../components/product/SingleProduct'
import { useParams } from 'react-router-dom'

const ViewProduct = () => {
  const { id } = useParams()
  return (
    <>
      {id ? <SingleProduct productId={id} /> : <div>ID is required please!</div>}
    </>

  )
}

export default ViewProduct