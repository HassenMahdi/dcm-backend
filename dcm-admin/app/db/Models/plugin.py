from app.db.document import Document


class Plugin(Document):
    __TABLE__ = "plugins"

    name = None
    type = None
    created_on = None
    modified_on = None

    super_domain_id = None

    mapping_id = None
    pipe_id = None
    file_id = None
    sheet_id = None

