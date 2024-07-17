/* eslint-disable @typescript-eslint/indent */
export interface IProduct {
  id: string;
  shopId: string;
  name: string;
  description?: string;
  price: number;
  discount?: string;
  category: string;
  expiryDate?: Date;
  expired: boolean;
  bonus?: string;
  images: string[];
  quantity: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  productReviews: IProductReview[];
  shops: IShop;
}

export interface IProductReview {
  id: string;
  productId: string;
  userId: string;
  feedback: string;
  rating: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: {
      firstName?: string;
      lastName?: string;
      profilePicture?: string;
  }
}

export interface IShop {
  id: string;
  userId: string;
  name: string;
  description?: string;
  image?: string;
}

export interface IProducts {
  nextPage:number;
  currentPage: number;
  previousPage:number;
  limit:number;
  data:[];
  error?:string
}
export interface IProductsState {
  searchProduct: searchProduct;
}

export interface SearchCriteria {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  discount?: number;
}