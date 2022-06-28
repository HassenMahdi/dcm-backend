import { createSelector } from '@ngrx/store';
import { selectPipeline, PipelineState } from './pipeline.state';


export const selectPipelineEditNodes = createSelector(
  selectPipeline,
  (object: PipelineState) => object.edit_nodes
);

export const selectPipelineEditLinks = createSelector(
  selectPipeline,
  (object: PipelineState) => object.edit_links
);

export const selectPipelineMetaData = createSelector(
  selectPipeline,
  (object: PipelineState) => object.metadata
);

export const selectRunId = createSelector(
  selectPipeline,
  (object: PipelineState) => object.run_id
)