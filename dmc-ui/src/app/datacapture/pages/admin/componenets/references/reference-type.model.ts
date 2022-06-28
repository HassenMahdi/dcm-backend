export class RefernceType{
    id
    label
    domain_ids = []
    created_on
    modified_on
    shared

    properties :RefernceTypeProperty[] = []

    constructor(domain_id?){
        if (domain_id){
            this.domain_ids = [domain_id]
        } else {
            this.shared = true 
        }
    }
}

export class RefernceTypeProperty{
    label
    code
    type
}

export class RefernceTypeVersion extends RefernceType{
    version_label
    parent_id

    constructor(parent_id){
        super()
        this.parent_id = parent_id
    }
}