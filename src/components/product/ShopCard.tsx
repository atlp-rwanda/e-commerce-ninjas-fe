/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchProductsByShopId } from '../../store/features/product/shopSlice';
import { useNavigate } from 'react-router-dom';

interface ShopCardProps {
  shopId: string;
}

const ShopCard: React.FC<ShopCardProps> = ({ shopId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const shop = useAppSelector((state) => state.shop.shops.find((shop) => shop.id === shopId));
  // const products = useAppSelector((state) => state.shop.shopProductsByShop?.[shopId] || []);
  const {
    shops,
    shopProductsByShop
  } = useAppSelector((state: any) => state.shop);

  const shop = shops.find((shop: any) => shop.id === shopId);
  const products = shopProductsByShop?.[shopId] || [];

  useEffect(() => {
    if (shopId) {
      dispatch(fetchProductsByShopId(shopId));
    }
  }, [dispatch, shopId]);

  const truncateText = (text: string, length: number) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  if (products.length < 4) {
    return null;
  }

  return (
    <div className="shop-card">
      <h2>{shop?.name || 'Shop Name'}</h2>
      <div className="items">
        {products.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="item"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.images[0]} alt={product.name} />
            <p>{truncateText(product.name, 20)}</p>
          </div>
        ))}
      </div>
      <button
        className="see-more"
        onClick={() => navigate(`/shops/${shopId}/products`)}
      >
        See more
      </button>
    </div>
  );
};

export default ShopCard;
