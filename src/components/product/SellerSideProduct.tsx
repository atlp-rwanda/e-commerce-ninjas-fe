/* eslint-disable */
import React from 'react';

interface ProductCardProps {
  number: number;
  image: string;
  title: string;
  availability: string;
}

const SellerSideProduct: React.FC<ProductCardProps> = ({ number, image, title, availability }) => {
  return (
    <div className="product-card">
      <div className="product-card__number">{number}</div>
      <img src={image} alt={title} className="product-card__image" />
      <div className="product-card__details">
        <h3 className="product-card__details__title">{title}</h3>
      </div>
      <div className={`product-card__availability ${availability.toLowerCase()}`}>
        {availability}
      </div>
    </div>
  );
};

export default SellerSideProduct;