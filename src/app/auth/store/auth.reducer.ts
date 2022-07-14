import { User } from '../user.model';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface State {
  user: User;
  authError: string | Error;
  loading: boolean;
}

const INITIAL_STATE: State = { user: null, authError: null, loading: false };

export function authReducer(state: State = INITIAL_STATE, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.LoginStart:
    case AuthActionTypes.SignupStart:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActionTypes.AuthenticateSuccess:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: false,
      };
    case AuthActionTypes.AuthenticateFail:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case AuthActionTypes.ClearError:
      return {
        ...state,
        authError: null,
      };
    case AuthActionTypes.Logout:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
