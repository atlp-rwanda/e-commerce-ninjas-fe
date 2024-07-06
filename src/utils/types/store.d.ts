/* eslint-disable */
export interface IWelcomeMessage {
  status: boolean;
  message: string;
}

export interface IWelcomeMessageState {
  welcomeMessage: IWelcomeMessage;
}

export interface IUser {
  data?: any;
  email: string;
  password: string;
  }

export interface IUserData {
  data : object
  message: string;
}


export interface IUserDataState {
  user: IUserData | undefined;
}

export interface IVerification{
  status: number;
  message: string;
}