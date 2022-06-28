import {createSelector} from '@ngrx/store';
import { selectDashboard } from '../dashboard.state';
import { Dashboard } from '../model/dashboard.model';

export const selectSize = createSelector(
  selectDashboard,
  (object: Dashboard) => object.size
);

export const selectPage = createSelector(
  selectDashboard,
  (object: Dashboard) => object.page
);

export const selectFetchData = createSelector(
  selectDashboard,
  (object: Dashboard) => object.fetchData
);

export const selectSort = createSelector(
  selectDashboard,
  (object: Dashboard) => object.sort
);
