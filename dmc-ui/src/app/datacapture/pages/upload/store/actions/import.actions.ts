import { Action } from '@ngrx/store';

export enum ImportActionTypes {
  UPLOAD_FILE = '[Import] upload file',
  SAVE_FILE = '[Import] Save Uploaded File',
  SELECT_DOMAIN = '[Import] Select Domain',
  SELECT_ROW_RANGE = '[Import] Select Rows range',
  SELECT_COL_RANGE = '[Import] Select Columns range',
  RESET = '[Import] Reset'
}

export class ActionUploadFile implements Action {
  readonly type = ImportActionTypes.UPLOAD_FILE;
  constructor(readonly payload: any) {}
}

export class ActionSelectColRange implements Action {
  readonly type = ImportActionTypes.SELECT_COL_RANGE;
  constructor(readonly payload: number[]) {}
}
export class ActionSelectRowRange implements Action {
  readonly type = ImportActionTypes.SELECT_ROW_RANGE;
  constructor(readonly payload: number[]) {}
}

export class ActionSelectDomain implements Action {
  readonly type = ImportActionTypes.SELECT_DOMAIN;
  constructor(readonly payload: any, readonly superDomain: any) {}
}

export class ActionSaveFile implements Action {
  readonly type = ImportActionTypes.SAVE_FILE;
  constructor(readonly payload: any) {}
}

export class ActionImportReset implements Action {
  readonly type = ImportActionTypes.RESET;
}

export type ImportActions = ActionImportReset | ActionUploadFile | ActionSaveFile | ActionSelectDomain |
            ActionSelectColRange | ActionSelectRowRange;
