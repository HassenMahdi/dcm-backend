import { Action } from '@ngrx/store';
import { PipelineMetadata } from '../models/metadata.model';

export enum PipelineActionTypes {
  EDIT_NODES = '[PIPELINE] EDIT_NODES',
  EDIT_LINKS = '[PIPELINE] EDIT_LINKS',
  EDIT_RUN_ID = '[PIPELINE] EDIT_RUN_ID',
  EDIT_PIPELINE = '[PIPELINE] EDIT_PIPELINE',
  EDIT_PIPELINE_METADATA = '[PIPELINE] EDIT_PIPELINE_METADATA',
  RESET = '[PIPELINE] RESET',
}

export class PipelineEditNodes implements Action {
  readonly type = PipelineActionTypes.EDIT_NODES;
  constructor(readonly nodes: any[]) {}
}

export class PipelineEditRunId implements Action {
  readonly type = PipelineActionTypes.EDIT_RUN_ID;
  constructor(readonly event: any) {}
}

export class PipelineEditMetaData implements Action {
  readonly type = PipelineActionTypes.EDIT_PIPELINE_METADATA;
  constructor(readonly metadata: PipelineMetadata) {}
}

export class PipelineEdit implements Action {
  readonly type = PipelineActionTypes.EDIT_PIPELINE;
  constructor(readonly metadata: PipelineMetadata) {}
}
export class PipelineEditLinks implements Action {
  readonly type = PipelineActionTypes.EDIT_LINKS;
  constructor(readonly links:any[]) {}
}

export class PipelineReset implements Action {
  readonly type = PipelineActionTypes.RESET;
  constructor() {}
}


export type PipelineActions =  PipelineEditNodes | PipelineEditLinks | PipelineEditRunId | PipelineEditMetaData | PipelineReset;
