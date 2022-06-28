import {Action} from '@ngrx/store';

export enum DashboardActionTypes {
  SAVE_PAGE = '[DASHBOARD] SAVE_PAGE',
  SAVE_SIZE = '[DASHBOARD] SAVE_SIZE',
  SAVE_SORT = '[DASHBOARD] SAVE_SORT',
  FETCH_DATA = '[DASHBOARD] FETCH_DATA',
}

export class ActionSavePage implements Action {
  readonly type = DashboardActionTypes.SAVE_PAGE;
  constructor(readonly payload: number) {}
}

export class ActionSaveSort implements Action {
  readonly type = DashboardActionTypes.SAVE_SORT;
  constructor(readonly payload: any) {}
}
export class ActionFetchData implements Action {
  readonly type = DashboardActionTypes.FETCH_DATA;
  constructor(readonly payload: boolean) {}
}

export class ActionSaveSize implements Action {
  readonly type = DashboardActionTypes.SAVE_SIZE;
  constructor(readonly payload: number) {}
}

export type DashboardActions = ActionSavePage | ActionSaveSize |ActionFetchData | ActionSaveSort;
