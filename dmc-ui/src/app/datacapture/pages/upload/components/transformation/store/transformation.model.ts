export interface Transformation{
    // PRE MAPPING TRANSFORMERS
    nodes: any[];
    editedPipeInfo: any;
    validation_states: any[];
    expanded: boolean;
    activePipe: any;
    previwMode: 'SOURCE' | 'TARGET';
    transformedFilePath: string;
    loadingTransformation: boolean;
    tarnsformationHeaders: string[]
    // ADD SIMILAR FIELDS FOR POST MAPPING TRANSFORMERS
}
