import { access } from 'fs';
import { IResponse } from './common';

export interface ILoginData {
  phone: string;
  password: string;
}

export interface ISignUpData {
  phone: string;
  name: string;
  password: string;
}

export interface IUserData {
  phone: string;
  name: string;
  isAnonymous: boolean;
}

export interface ILoginResponse extends IResponse<IUserData> {
  accessToken: string;
}

export interface IPutAccountData {
  phone: string;
  name: string;
  password: string;
}
