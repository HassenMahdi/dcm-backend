import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  profile: {}
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.SAVE:
      return { ...state, profile: action.payload };

    case AuthActionTypes.LOGIN:
      return { ...state, isAuthenticated: true, token: action.payload };

    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false, token: null, profile: {} };

    default:
      return state;
  }
}
