import { createSelector } from '@ngrx/store';
import { Preview } from './../models/preview.model';
import { selectPreview } from '../upload.selectors';

export const selectSelectedSheet = createSelector(
  selectPreview,
  (object: Preview) => object.selectedSheet
);

export const selectUpdatedSheet = createSelector(
  selectPreview,
  (object: Preview) => object.generatedSheetId
);
export const selectTotal = createSelector(
  selectPreview,
  (object: Preview) => object.total
);
