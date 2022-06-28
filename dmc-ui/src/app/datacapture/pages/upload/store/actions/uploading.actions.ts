import { Action } from '@ngrx/store';

export enum UploadingAtionTypes {
  SaveUploadId = '[UPLOADING] Save Upload Id',
  SaveUploadResults = '[UPLOADING] Save Upload Results',
  SaveUploadingStatus = '[UPLOADING] Save Uploading Status'
}

export class ActionSaveUploadId implements Action {
  readonly type = UploadingAtionTypes.SaveUploadId;
  constructor(public payload: string) {}
}

export class ActionSaveUploadingStatus implements Action {
  readonly type = UploadingAtionTypes.SaveUploadingStatus;
  constructor(public payload: string) {}
}

export class ActionSaveUploadResults implements Action {
  readonly type = UploadingAtionTypes.SaveUploadResults;
  constructor(public payload: any) {}
}

export type UploadingActions = ActionSaveUploadId | ActionSaveUploadResults | ActionSaveUploadingStatus;
