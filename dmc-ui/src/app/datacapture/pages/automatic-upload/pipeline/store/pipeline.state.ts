import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { AppState } from '@app/core';
import { PipelineActionTypes } from './pipeline.actions';
import * as _ from 'lodash'
import { PipelineMetadata } from '../models/metadata.model';

export class PipelineState {
  edit_nodes :any[]
  edit_links :any[]
  metadata: PipelineMetadata
  run_id: string
}

export const initialState: PipelineState = {
  edit_nodes : [],
  edit_links : [],
  metadata: {pipeline_id: null, name: '', description: ''},
  run_id: null
};

export const FEATURE_NAME = 'pipeline';
export const selectPipeline = createFeatureSelector<State, PipelineState>(
  FEATURE_NAME
);

export function PipelineReducer(state: PipelineState = initialState, action: any): PipelineState {
    switch (action.type) {
      case PipelineActionTypes.EDIT_NODES:
        return {...state, edit_nodes: _.cloneDeep(action.nodes)};

      case PipelineActionTypes.EDIT_LINKS:
        return {...state, edit_links: _.cloneDeep(action.links)};

      case PipelineActionTypes.EDIT_PIPELINE_METADATA:
        return {...state, metadata: action.metadata}

      case PipelineActionTypes.EDIT_PIPELINE:
        return {...state, metadata: action.metadata}

      case PipelineActionTypes.EDIT_RUN_ID:
        return {...state, run_id: action.event.run_id}
        
      case PipelineActionTypes.RESET:
        return {...initialState};

      default:
        return state;
    }
  }

export interface State extends AppState {
  pipeline: PipelineState;
}
