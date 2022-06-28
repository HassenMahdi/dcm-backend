import { createSelector } from '@ngrx/store';
import { selectupload, UploadState } from '../upload.state';
import { SelectUploading } from '../upload.selectors';
import { Uploading } from '../models/uploading.model';

export const selectUploadOverview = createSelector(
  selectupload,
  (object: UploadState) => {
    return {
      fileName: object.import.selectedFile ? object.import.selectedFile.token : null,
      fileExtension: object.import.selectedFile ? object.import.selectedFile.extension : null,
      sheet: object.import.fileData ? object.import.fileData.sheets[object.preview.selectedSheet] : null,
      domain: object.import.selectedDomain ? object.import.selectedDomain.name : null,
      pipe: object.transformation.activePipe ? object.transformation.activePipe.name : null,
      mappingName: object.mapping.mappingName,
      mappingId: object.mapping.mappingVersion || object.mapping.mappingId,
      domainId: object.import.selectedDomain ? object.import.selectedDomain.id : null,
      fileId: object.import.fileData.metaData ? object.import.fileData.metaData.file_id : null,
      transformationId: object.transformation.transformedFilePath,
      cleansingId: object.cleansing.jobId,
      // tslint:disable-next-line: max-line-length
      sheetId: object.preview.generatedSheetId
    };
  }
);

export const selectUploadingId = createSelector(
  SelectUploading,
  (object: Uploading) => object.uploadingId
);

export const selectUploadingResults = createSelector(
  SelectUploading,
  (object: Uploading) => object.result
);

export const selectUploadingStatus = createSelector(
  SelectUploading,
  (object: Uploading) => object.status
);
