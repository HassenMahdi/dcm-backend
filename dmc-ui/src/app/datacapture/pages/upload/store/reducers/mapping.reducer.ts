import { Mapping } from '../models/mapping.model';
import { MappingActionTypes } from '../actions/mapping.actions';
import { ImportActionTypes } from '../actions/import.actions';


export const initialState: Mapping = {
  mappingFields : [],
  mappedSources : {},
  sourcesPreview: {},
  mandatories: {},
  mappingId: '',
  mappingVersion: '',
  mappingName: null,
  sheetsTypes: {},
  mappingValid: true,
  isModified: false,
};


export function MappingReducer(state: Mapping = initialState, action: any): Mapping {
  switch (action.type) {
    case MappingActionTypes.SaveMappingFields: {
      let mandatories = 0;
      action.payload.forEach((e) => {if (e.mandatory && !e.value) { mandatories++; }});
      return {
        ...state,
        mappingFields: action.payload,
        mandatories
      };
    }

    case MappingActionTypes.ClearSelectedMapping:
      return {
        ...state,
        mappingId: '',
        mappingVersion: '',
      };

    case MappingActionTypes.SaveSheetsTypes:
      return {
        ...state,
        sheetsTypes: action.payload
      };

    case MappingActionTypes.SaveIsModified:
      return {
        ...state,
        isModified: action.payload
      };

    case MappingActionTypes.SaveSourcesPreview:
      return {
        ...state,
        sourcesPreview: action.payload
      };

    case MappingActionTypes.SaveMappingValid:
      return {
        ...state,
        mappingValid: action.payload
      };

    case MappingActionTypes.SaveMappingId:
      return {
        ...state,
        mappingId: action.payload
      };

    case MappingActionTypes.SaveMappingVersion:
      return {
        ...state,
        mappingVersion: action.payload
      };

      case MappingActionTypes.SaveMappingName:
      return {
        ...state,
        mappingName: action.payload
      };

    case MappingActionTypes.SaveMappedSources:
      return {
        ...state,
        mappedSources: action.payload
      };

    case MappingActionTypes.SaveMandatories:
      return {
        ...state,
        mandatories: action.payload
      };

    case ImportActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}

