/* eslint-disable */
import { IProduct, ISingleProduct } from "./product";

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
  [x: string]: any;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: number;
  profilePicture?: string;
  gender?: string;
  birthDate?: string;
  language?: string;
  currency?: string;
  role?: string;
  isGoogleAccount?: boolean;
  isVerified?: boolean;
  is2FAEnabled?: boolean;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  passwordUpdatedAt?: Date;
}

export interface IPaymentMethod{
  id?: string;
  bankPayment: boolean;
  mobilePayment: boolean;
  bankAccount: number;
  mobileNumber: number;
}

export interface IRequest {
  [x: string]: any;
  id?: string;
  shopId?: string;
  userId?: string;
  paymentMethodId?: string;
  businessName?: string;
  tin?: number;
  rdbDocument?:string;
  terms?:boolean;
  requestStatus?:string;
  user:IUser;
  shop?: IShop;
  paymentMethod?: IPaymentMethod;
}

export interface IUserData {
  data: {user:IUser};
  message: string;
}

export interface IUserDataState {
  user: IUserData | null;
}

export interface IVerification {
  status: number;
  message: string;
}

export interface AuthService {
  user: IUserData | undefined;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isVerified: boolean;
  isAuthenticated?: boolean;
  message: string;
  error: string;
  token: string;
  userId?: any;
  fail:boolean;
  isOtpFail:boolean;
  isOtpSuccess:boolean;
  isEmailResend:boolean;
  isNotVerified:boolean;
  isRegister:boolean; 
  isEmailSuccess:boolean;
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
  product: IProduct | null;
  isError: boolean | null;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | null;
}

export interface INotifications {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INotificationInitialResource {
  notifications: INotifications[];
  isError: boolean | null;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | null;
  passwordExpiryMessage: string | null;
  isLoggedOut: boolean;
}

export interface iCartInitialResource {
  carts: any[];
  isError: boolean | null;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | null;
  isLoggedOut: boolean;
  cartCounter: number;
  cartTotalMoney: number;
  cartProductslist: any[];
  orders: any
}
export interface IProfile {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  profilePicture?: string;
  gender: string,
  birthDate: date,
  language: string,
  currency: string,
  addresses: {
    province,
    district,
    sector,
    street
  }
};

export interface IPassword {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
}

export interface ILocation {
  country: string;
  province: string;
  district: string;
  sector: string;
}

export interface UserService {
  user: IProfile | null,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  message: string
}


export interface AdminReponse {
  message?: string;
  data?: { sellerProfiles?: IRequest; user?: IUser ;sellerRequest?: IRequest};
  error?: string;
  status?: number;
}

export interface IAdminInitialResponse {
  users: IUser;
  requests: IRequest,
  request: IRequest,
  isError: boolean | null;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | null;
  passwordExpiration:null;
  terms:null;
  term:null;
}

export interface ISingleProductResponse {
  message?: string;
  data?: { product: ISingleProduct[] | ISingleProduct };
  error?: string;
  status?: number;
}

export interface ISingleProductInitialResponse {
  product: ISingleProduct | null;
  isError: boolean | null;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | null;
  newProduct?: ISingleProduct | null;
  newAddedProduct?: ISingleProduct | null;
  isUpdate?: boolean;
  isUpdateSuccess?: boolean;
  updateError?: string;
  isDeletedSuccess?: boolean;
}

export interface ISellerCollectionProductResponse {
  message?: string;
  data?: {
    products: ISingleProduct[]
    previousPage: number,
    currentPage: number,
    nextPage: number,
    limit: number,
  };
  error?: string;
  status?: number;
}

export interface ISellerCollectionProductInitialResponse {
  data?: {
    products: ISingleProduct[] | null,
    previousPage: number,
    currentPage: number,
    nextPage: number,
    limit: number,
  };
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  OrderHistory: null
}

export interface IEligibilityData {
  businessName: string;
  Tin: string;
  rdbDocument: File | null;
  businessDescription: string;
}

export interface IPaymentData {
  mobilePayment?: string;
  bankPayment?: string;
  bankAccount?:string | null;
  mobileNumber?: string | null;
}

export interface ITermsData {
  terms: boolean | null;
}

export interface ICollectedData {
  eligibility: IEligibilityData;
  paymentMethods: IPaymentData;
  termsAndConditions: ITermsData;
}