import { Import } from '../models/import.model';
import { ImportActionTypes } from '../actions/import.actions';


export const initialState: Import = {
  imported : false,
  importing : false,
  error: false,
  selectedFile : null,
  fileData : {metaData: null, sheets: [], data: [], headers: []},
  progress : null,
  selectedDomain: null,
  superDomain: null,
  colRange: [0, 0],
  rowRange: [0, 0]
};

export function ImportReducer(state: Import = initialState, action: any): Import {
  switch (action.type) {
    case ImportActionTypes.UPLOAD_FILE:
      return {
        ...state,
        selectedFile : action.payload.file,
        importing: action.payload.importing,
        imported: action.payload.imported,
        error: action.payload.error,
        progress: action.payload.progress
      };

    case ImportActionTypes.SELECT_DOMAIN:
      return {
        ...state,
        selectedDomain: action.payload,
        superDomain: action.superDomain
      };

    case ImportActionTypes.SAVE_FILE:
      return {
        ...state,
        fileData: action.payload
      };

    case ImportActionTypes.SELECT_COL_RANGE:
      return {
        ...state,
        colRange: action.payload
      };
    case ImportActionTypes.SELECT_ROW_RANGE:
      return {
        ...state,
        rowRange: action.payload
      };

    case ImportActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}
