/* eslint-disable */
export interface IWelcomeMessage {
  status: boolean;
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

export interface AuthService{
  user: IUserData | undefined,
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  isVerified: boolean
  message: string
}

export interface IEmail {
  email: string;
}