import { Action } from '@ngrx/store';

export enum PreviewActionTypes {
  SelectSheet = '[Preview] select sheet',
  UpdateSheet = '[Preview] update sheet',
  SaveTotal = '[Preview] save total',
  Reset = '[Preview] Reset',
}

export class ActionSelectSheet implements Action {
  readonly type = PreviewActionTypes.SelectSheet;
  constructor(readonly payload: number) {}
}

export class UpdateSheet implements Action {
  readonly type = PreviewActionTypes.UpdateSheet;
  constructor(readonly payload: string) {}
}

export class SaveTotal implements Action {
  readonly type = PreviewActionTypes.SaveTotal;
  constructor(readonly payload: number) {}
}

export class ResetPreview implements Action {
  readonly type = PreviewActionTypes.Reset;
  constructor() {}
}

export type PreviewActions = ActionSelectSheet | UpdateSheet | SaveTotal | ResetPreview;
