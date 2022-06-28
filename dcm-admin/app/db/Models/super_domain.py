from app.db.Models.domain import Domain
from app.db.document import Document


class SuperDomain(Document):
    __TABLE__ = "super-domains"

    name = None
    description = None
    identifier = None
    created_on = None
    modified_on = None

    parent_super_domain_id = None

    super_domains = None
    domains = None

    def load_hierarchy(self):
        super_domains = SuperDomain().get_all({"parent_super_domain_id":self.id})

        for child in super_domains:
            child.load_hierarchy()

        self.super_domains = [sd.to_dict() for sd in super_domains]

        self.domains = [d.to_dict() for d in Domain().get_all({"super_domain_id":self.id})]

        return self.to_dict()

