import { Action } from '@ngrx/store';

export enum CleansingAtionTypes {
  SaveJobId = '[CLEANSING] Save Job Id',
  SaveCleansingErrors = '[CLEANSING] Save Job errors',
}

export class ActionSaveJobId implements Action {
  readonly type = CleansingAtionTypes.SaveJobId;
  constructor(public payload: string) {}
}

export class ActionSaveCleansingErrors implements Action {
  readonly type = CleansingAtionTypes.SaveCleansingErrors;
  constructor(public payload: number) {}
}
export type CleansingActions = ActionSaveJobId |ActionSaveCleansingErrors;
