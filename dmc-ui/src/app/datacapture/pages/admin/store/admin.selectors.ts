import { createSelector } from '@ngrx/store';
import { selectAdmin, AdminState } from './admin.state';


export const selectDisplayList = createSelector(
  selectAdmin,
  (object: AdminState) => object.displayList
);

export const selectDisplaySize = createSelector(
  selectAdmin,
  (object: AdminState) => object.displaySize
);
