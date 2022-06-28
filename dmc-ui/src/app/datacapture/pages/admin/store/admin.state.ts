import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { AppState } from '@app/core';
import { AdminActionTypes } from './admin.actions';

export class AdminState {
  displayList: boolean;
  displaySize: 'small' | 'default' | 'large';
}

export const initialState: AdminState = {
  displayList : true,
  displaySize : 'default',
};

export const FEATURE_NAME = 'admin';
export const selectAdmin = createFeatureSelector<State, AdminState>(
  FEATURE_NAME
);

export function AdminReducer(state: AdminState = initialState, action: any): AdminState {
    switch (action.type) {
        case AdminActionTypes.CHANGE_DISPLAY_SIZE:
            return {...state, displaySize: action.size};

        case AdminActionTypes.CHANGE_DISPLAY_TYPE:
            return {...state, displayList: action.list};

      default:
        return state;
    }
  }

export interface State extends AppState {
  admin: AdminState;
}
