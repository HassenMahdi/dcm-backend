import { createSelector } from '@ngrx/store';
import { SelectCleansing } from './../upload.selectors';
import { Cleansing } from '../models/cleansing.model';

export const selectJobId = createSelector(
  SelectCleansing,
  (object: Cleansing) => object.jobId
);

export const selectCleansingErrors = createSelector(
  SelectCleansing,
  (object: Cleansing) => object.errors
);
