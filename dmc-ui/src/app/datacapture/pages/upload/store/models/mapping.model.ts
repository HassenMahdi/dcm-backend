export interface Mapping {
  mappingFields: MappingField[];
  mappedSources: any;
  sourcesPreview: any;
  mandatories: any;
  mappingId: string;
  mappingVersion: string;
  mappingName: string;
  sheetsTypes: any;
  mappingValid: boolean;
  isModified: boolean;
}

export interface MappingField {
  created_on: Date;
  description: string;
  editable: boolean;
  id: string;
  label: string;
  mandatory: boolean;
  name: string;
  rules: any;
  type: string;
  value: string;
  inError: boolean;
}
