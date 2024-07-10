/* eslint-disable */
import { IProduct } from "./product";

export interface IWelcomeMessage {
  status: boolean;
  message: string;
}

export interface IWelcomeMessageState {
  welcomeMessage: IWelcomeMessage;
}

export interface IProductResponse {
  message?: string;
  data?: { product: IProduct };
  error?: string;
  status?: number;
}

export interface IProductInitialResponse { product: IProduct | null; isLoading: boolean; isError: string | null; isSuccess: boolean; message: string | null }
