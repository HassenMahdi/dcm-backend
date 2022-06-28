import { Action } from '@ngrx/store';

export enum MappingActionTypes {
  SaveMappingFields = '[Mapping] Save Mapping Fields',
  SaveMappedSources = '[Mapping] Save Mapped Sources',
  SaveSourcesPreview = '[Mapping] Save sources Preview',
  SaveMandatories = '[Mapping] Save Mandatories',
  SaveMappingSheet = '[Mapping] Save Mapping Sheet',
  SaveMappingId = '[Mapping] Save Mapping Id',
  SaveMappingVersion = '[Mapping] Save Mapping Version',
  SaveMappingName = '[Mapping] Save Mapping Name',
  SaveSheetsTypes = '[Mapping] Save Sheets Types',
  SaveMappingValid = '[Mapping] Save Mapping Valid',
  SaveIsModified = '[Mapping] Save IsModified',
  ClearSelectedMapping = '[Mapping] Clear Selected Mapping',
}

export class SaveMappingFields implements Action {
  readonly type = MappingActionTypes.SaveMappingFields;
  constructor(public payload: any) {}
}

export class ClearSelectedMapping implements Action {
  readonly type = MappingActionTypes.ClearSelectedMapping;
}

export class SaveSourcesPreview implements Action {
  readonly type = MappingActionTypes.SaveSourcesPreview;
  constructor(public payload: any) {}
}

export class SaveIsModified implements Action {
  readonly type = MappingActionTypes.SaveIsModified;
  constructor(public payload: boolean) {}
}

export class SaveMappingValid implements Action {
  readonly type = MappingActionTypes.SaveMappingValid;
  constructor(public payload: boolean) {}
}

export class SaveSheetsTypes implements Action {
  readonly type = MappingActionTypes.SaveSheetsTypes;
  constructor(public payload: any) {}
}

export class SaveMappingId implements Action {
  readonly type = MappingActionTypes.SaveMappingId;
  constructor(public payload: string) {}
}

export class SaveMappingVersion implements Action {
  readonly type = MappingActionTypes.SaveMappingVersion;
  constructor(public payload: string) {}
}

export class SaveMappingName implements Action {
  readonly type = MappingActionTypes.SaveMappingName;
  constructor(public payload: string) {}
}

export class SaveMappedSources implements Action {
  readonly type = MappingActionTypes.SaveMappedSources;
  constructor(public payload: any) {}
}

export class SaveMappingSheet implements Action {
  readonly type = MappingActionTypes.SaveMappingSheet;
  constructor(public payload: any) {}
}

export class SaveMandatories implements Action {
  readonly type = MappingActionTypes.SaveMandatories;
  constructor(public payload: any) {}
}
export type MappingActions = SaveMappingFields | SaveMappedSources | SaveMandatories | SaveMappingValid | SaveSourcesPreview |
  SaveMappingSheet | SaveSheetsTypes | SaveMappingId | SaveMappingVersion | SaveMappingName | SaveIsModified | ClearSelectedMapping;
