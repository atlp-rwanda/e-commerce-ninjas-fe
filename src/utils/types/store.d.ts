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

export interface IWelcomeMessageState {
  welcomeMessage: IWelcomeMessage;
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