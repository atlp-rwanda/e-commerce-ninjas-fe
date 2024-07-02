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
