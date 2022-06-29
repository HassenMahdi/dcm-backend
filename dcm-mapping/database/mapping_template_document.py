#!/usr/bin/python
# -*- coding: utf-8 -*-

from database.connectors import mongo


class MappingTemplateDocument:

    def get_mapping_template(self, template):
        """Fetches a mapping_template document from mappings_templates collection"""

        mappings_templates = mongo.db.mappings_templates

        template = mappings_templates.find_one({"templateId": template})

        return {"mapping_id": template["mappingId"], "top_panel": template["topPanel"], "mapping": template["mapping"]}

    def get_mappings(self, domain_id):
        """ Gets the list of saved mappings """
        mappings = mongo.db.mappings.find({"domainId": domain_id, "deleted": {"$in": [False, None]}})
        return [{"id": m["mappingId"], "name": m["name"]} for m in mappings]

    def get_mappings_grouped(self, domain_id):
        parents = mongo.db.mappings.find(
            {"domainId": domain_id, "parentMappingId": None, "deleted": {"$in": [False, None]}})
        parentsList = [{"id": m["mappingId"], "name": m["name"]} for m in parents if m["mappingId"]]
        for parent in parentsList:
            versions = mongo.db.mappings.find({"parentMappingId": parent["id"], "deleted": {"$in": [False, None]}})
            parentversions = [{"id": m["mappingId"], "name": m["name"], "version": m["version"],
                               "description": m["description"] if "description" in m else ""} for m in versions]
            parentversions.insert(0, {"id": parent["id"], "name": parent["name"], "version": 1, "description": ""})
            parent["versions"] = parentversions
        return parentsList

    def get_archived_mappings(self, domain_id):
        """ Gets the list of saved mappings """
        mappings = mongo.db.mappings.find({"domainId": domain_id, "deleted": True})
        return [{"id": m["mappingId"], "name": m["name"]} for m in mappings]

    def check_name(self, params):
        mappings = mongo.db.mappings.find({"domainId": params["domainId"]})
        names = [m["name"] for m in mappings]
        return params["name"] in names

    def save_mapping_template(self, template):
        """Saves a mapping_template document in mappings_templates collection"""

        mappings_templates = mongo.db.mappings_templates

        template["templateId"] = template.pop("template")
        template["topPanel"] = template.pop("top_panel")
        template["mappingId"] = template.pop("mapping_id")
        mappings_templates.insert_one(template)

    def get_templates_id(self, header):
        """Fetches mapping templates_documents based on header param"""

        mappings_templates = mongo.db.mappings_templates

        templates = mappings_templates.find({})
        templates_name = []
        for template in templates:
            sources = []
            for mapping in template["mapping"]:
                sources.extend(mapping["source"])
            if len(header) == len(sources):
                if sorted(header) == sorted(sources):
                    templates_name.append(template["templateId"])

        return templates_name

    def check_mapping_usability(self, mapping_id):
        flow_templates = mongo.db.flow.find({"mapping_id": mapping_id})
        flow = [m["mapping_id"] for m in flow_templates]
        if flow is None or len(flow) == 0:
            return False
        return True
