import { Action } from '@ngrx/store';

export enum AdminActionTypes {
  CHANGE_DISPLAY_TYPE = '[ADMIN] CHANGE_DISPLAY_TYPE',
  CHANGE_DISPLAY_SIZE = '[ADMIN] CHANGE_DISPLAY_SIZE',
}

export class AdminChangeDisplayType implements Action {
  readonly type = AdminActionTypes.CHANGE_DISPLAY_TYPE;
  constructor(readonly list: boolean) {}
}

export class AdminChangeDisplaySize implements Action {
  readonly type = AdminActionTypes.CHANGE_DISPLAY_SIZE;
  constructor(readonly size:string) {}
}


export type AdminActions =  AdminChangeDisplayType | AdminChangeDisplaySize;
