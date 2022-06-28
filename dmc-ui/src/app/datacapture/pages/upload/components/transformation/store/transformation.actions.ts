import { Action } from '@ngrx/store';


export enum TransformationActionTypes {
    ADD_NODE = '[TRANS] ADD NODE',
    UPDATE_NODE_STATUS = '[TRANS] UPDATE_NODE_STATUS',
    UPDATE_NODE_ORDER = '[TRANS] UPDATE_NODE_ORDER',
    DELETE_NODE = '[TRANS] DELETE NODE',
    UPDATE_NODE = '[TRANS] UPDATE NODE',
    UPDATE_EDITED = '[TRANS] UPDATE_EDITED',
    RESET = '[TRANS] RESET',
    LOAD = '[TRANS] LOAD',
    FLIP = '[TRANS] EXPAND/COLLAPSE',
    SET_PREVIEW_MODE = '[TRANS] SET_PREVIEW_MODE',
    UPDATE_FILE_PATH = '[TRANS] UPDATE_FILE_PATH',
    UPDATE_TRANSFORMATION_HEADERS = '[TRANS] UPDATE_TRANSFORMATION_HEADERS',
    LOADING_TRANSFORMATION = "[TRANS] LOADING_TRANSFORMATION"
}

export class AddTransNode implements Action {
  readonly type = TransformationActionTypes.ADD_NODE;
  constructor(readonly payload: any) {}
}

export class DeleteTransNode implements Action {
  readonly type = TransformationActionTypes.DELETE_NODE;
  constructor(readonly index:number) {}
}

export class UpdateTransNode implements Action {
  readonly type = TransformationActionTypes.UPDATE_NODE;
  constructor(readonly payload: any, readonly index:number) {}
}

export class ResetTransformation implements Action {
  readonly type = TransformationActionTypes.RESET;
  constructor() {}
}

export class TransformationFlipExpand implements Action {
  readonly type = TransformationActionTypes.FLIP;
  constructor() {}
}

export class LoadTransformation implements Action {
  readonly type = TransformationActionTypes.LOAD;
  constructor(readonly payload: any) {}
}

export class SetPreviewMode implements Action {
  readonly type = TransformationActionTypes.SET_PREVIEW_MODE;
  constructor(readonly mode: any) {}
}

export class UpdateTransformedFilePath implements Action {
  readonly type = TransformationActionTypes.UPDATE_FILE_PATH;
  constructor(readonly filePath: any) {}
}

export class UpdateEditedPipeInfo implements Action {
  readonly type = TransformationActionTypes.UPDATE_EDITED;
  constructor(readonly payload: any) {}
}

export class UpdateNodeStatus implements Action {
  readonly type = TransformationActionTypes.UPDATE_NODE_STATUS;
  constructor(readonly index: any, readonly status: any) {}
}

export class UpdateNodeOrder implements Action {
  readonly type = TransformationActionTypes.UPDATE_NODE_ORDER;
  constructor(readonly index: number, readonly step: number) {}
}

export class UpdateTransformationHeaders implements Action {
  readonly type = TransformationActionTypes.UPDATE_TRANSFORMATION_HEADERS;
  constructor(readonly headers: string[]) {}
}

export class UpdateLoadingTransformation implements Action {
  readonly type = TransformationActionTypes.LOADING_TRANSFORMATION;
  constructor(readonly loading:boolean) {}
}

export type TransformationAction =  UpdateNodeStatus 
                                    | UpdateEditedPipeInfo 
                                    | UpdateTransformedFilePath 
                                    | SetPreviewMode 
                                    | LoadTransformation 
                                    | TransformationFlipExpand 
                                    | AddTransNode 
                                    | UpdateTransNode 
                                    | DeleteTransNode 
                                    | UpdateNodeOrder
                                    | ResetTransformation
                                    | UpdateTransformationHeaders
                                    | UpdateLoadingTransformation
                                    ;
