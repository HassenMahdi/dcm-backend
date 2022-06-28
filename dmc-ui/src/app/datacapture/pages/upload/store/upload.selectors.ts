import { createSelector } from '@ngrx/store';
import { UploadState, selectupload } from './upload.state';

export const selectImport = createSelector(
  selectupload,
  (state: UploadState) => {if (state) { return state.import; }}
);

export const selectPreview = createSelector(
  selectupload,
  (state: UploadState) => state.preview
);

export const SelectMapping = createSelector(
  selectupload,
  (state: UploadState) => state.mapping
);

export const SelectUploading = createSelector(
  selectupload,
  (state: UploadState) => state.uploading
);

export const SelectCleansing = createSelector(
  selectupload,
  (state: UploadState) => state.cleansing
);
