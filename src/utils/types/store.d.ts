/* eslint-disable */
import { IProduct } from "./product";

/* eslint-disable */
export interface IWelcomeMessage {
  status: boolean;
  message: string;
}

export interface IWelcomeMessageState {
  welcomeMessage: IWelcomeMessage;
}

export interface IProduct {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: string;
  discount: string;
  category: string;
  expiryDate: string;
  expired: boolean;
  bonus: string;
  images: string[];
  quantity: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IUserData {
  data: object;
  message: string;
}

export interface IUserDataState {
  user: IUserData | undefined;
}

export interface IVerification{
  status: number;
  message: string;
}

export interface AuthService{
  user: IUserData | undefined,
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  isVerified: boolean,
  isAuthenticated?: boolean,
  message: string
}

export interface IEmail {
  email: string;
}

export interface IProductResponse {
  message?: string;
  data?: { product: IProduct };
  error?: string;
  status?: number;
}

export interface IProductInitialResponse {
  product: IProduct | null,
  isError: boolean | null,
  isSuccess: boolean,
  isLoading: boolean,
  message: string | null
}

export interface SearchCriteria {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  discount?: number;
}