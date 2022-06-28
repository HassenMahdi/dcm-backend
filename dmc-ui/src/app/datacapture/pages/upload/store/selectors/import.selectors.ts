import { createSelector } from '@ngrx/store';
import { selectImport } from '../upload.selectors';
import { Import, Sheet } from '../models/import.model';

export const selectImported = createSelector(
  selectImport,
  (object: Import) => object.imported
);

export const selectImportProgress = createSelector(
  selectImport,
  (object: Import) => object.progress
);

export const selectImporting = createSelector(
  selectImport,
  (object: Import) => object.importing
);

export const selectSelectedFile = createSelector(
  selectImport,
  (object: Import) => object.selectedFile
);

export const selectError = createSelector(
  selectImport,
  (object: Import) => object.error
);

export const selectFileData = createSelector(
  selectImport,
  (object: Import) => object.fileData
);

export const selectColRange = createSelector(
  selectImport,
  (object: Import) => object.colRange
);
export const selectRowRange = createSelector(
  selectImport,
  (object: Import) => object.rowRange
);

export const selectFileHeaders = createSelector(
  selectFileData,
  (object: Sheet) => object.headers
);

export const selectFileMetaData = createSelector(
  selectFileData,
  (object: Sheet) => object.metaData
);

export const selectDomain = createSelector(
  selectImport,
  (object: Import) => object.selectedDomain
);

export const selectSuperDomain = createSelector(
  selectImport,
  (object: Import) => {if (object) { return object.superDomain; }}
);
export const selectHeaders = createSelector(
  selectImport,
  (object: Import) => object.fileData.headers
);
