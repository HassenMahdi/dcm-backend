import { Dashboard } from '../model/dashboard.model';
import { DashboardActionTypes } from '../actions/dashboard.actions';

export const initialState: Dashboard = {
  page : 1,
  size : 20,
  fetchData: false,
  sort: {sortKey: null, sortAcn: null}
};

export function DashboardReducer(state: Dashboard = initialState, action: any): Dashboard {
  switch (action.type) {
    case DashboardActionTypes.SAVE_SIZE:
      return {
        ...state,
        size: action.payload
      };

    case DashboardActionTypes.SAVE_SORT:
      return {
        ...state,
        sort: action.payload
      };

    case DashboardActionTypes.FETCH_DATA:
      return {
        ...state,
        fetchData: action.payload
      };

    case DashboardActionTypes.SAVE_PAGE:
      return {
        ...state,
        page: action.payload
      };

    default:
      return state;
  }
}


