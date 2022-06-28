import { Uploading } from '../models/uploading.model';
import { UploadingAtionTypes } from '../actions/uploading.actions';
import { ImportActionTypes } from '../actions/import.actions';


export const initialState: Uploading = {
  uploadingId: null,
  result: null,
  status: 'READY'
};


export function UploadingReducer(state: Uploading = initialState, action: any): Uploading {
  switch (action.type) {
    case UploadingAtionTypes.SaveUploadId:
      return {
        ...state,
        uploadingId: action.payload
      };

    case UploadingAtionTypes.SaveUploadingStatus:
      return {
        ...state,
        status: action.payload
      };

    case UploadingAtionTypes.SaveUploadResults:
      return {
        ...state,
        result: action.payload
      };

    case ImportActionTypes.RESET:
        return initialState;
    default:
      return state;
  }
}

