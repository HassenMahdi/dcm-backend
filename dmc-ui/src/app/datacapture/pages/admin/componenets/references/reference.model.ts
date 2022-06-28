import { RefernceType } from './reference-type.model'

export class RefernceData{
    id
    code
    ref_type_id
    alias
    properties
    
    constructor(refType:RefernceType){
        this.ref_type_id = refType.id
        this.alias = []
        this.properties = {}
    }
}