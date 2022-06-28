export interface Import {
  imported: boolean ;
  importing: boolean ;
  error: boolean;
  selectedFile: FileData ;
  fileData: Sheet;
  progress: number;
  selectedDomain: any;
  superDomain: string;
  colRange: number[];
  rowRange: number[];
}

export interface SheetData {
  headers: any;
  data: any;
}

export interface Sheet {
  metaData: any;
  data: SheetData[];
  sheets: string[];
  headers: string[];
}
export interface FileData {
  token: string;
  sheets: string[];
  numberOfRows: string[];
  extension: string;
  data: any[];
  headers: any[];
  file: any;
}
