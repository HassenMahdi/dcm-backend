from app.db.document import Document


class TransformationPipe(Document):
    __TABLE__ = "transformation_pipe"

    name = None
    description = None
    identifier = None
    nodes = None
    domain_id = None
    created_on = None
    modified_on = None
