import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginStart = '[Auth] Login Start',
  SignupStart = '[Auth] Signup Start',
  AuthenticateSuccess = '[Auth] Authenticate Success',
  AuthenticateFail = '[Auth] Authenticate Fail',
  ClearError = '[Auth] Clear Error',
  Logout = '[Auth] Logout',
  AutoLogin = '[Auth] Auto Login',
}

export class LoginStart implements Action {
  readonly type = AuthActionTypes.LoginStart;

  constructor(public payload: { email: string; password: string }) {}
}

export class SignupStart implements Action {
  readonly type = AuthActionTypes.SignupStart;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthActionTypes.AuthenticateSuccess;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = AuthActionTypes.AuthenticateFail;

  constructor(public payload: string | Error) {}
}

export class ClearError implements Action {
  readonly type = AuthActionTypes.ClearError;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class AutoLogin implements Action {
  readonly type = AuthActionTypes.AutoLogin;
}

export type AuthActions =
  | LoginStart
  | SignupStart
  | AuthenticateSuccess
  | AuthenticateFail
  | ClearError
  | Logout
  | AutoLogin;
