#!/usr/bin/python
# -*- coding: utf-8 -*-

from database.connectors import mongo


class MapperDocument:

    def get_mappings(self, mapping_id):
        """Fetches a document from the mappings collection based on the given params"""

        mappings = mongo.db.mappings

        mapping = mappings.find_one({"mappingId": mapping_id}, projection=["rules", "name"])
        if mapping:
            return {"rules": mapping["rules"], "_id": mapping["_id"],"name":mapping["name"]}

    def save_mappings(self, params, mapping_id=None, mapping=None, version=1, parentId=None):
        """Saves the mapping data in mappings collection,
        mapping param is a dict contains the source/target key value"""

        mappings = mongo.db.mappings
        exist_mapping = self.get_mappings(params.get("mapping_id"))
        if exist_mapping:
            _id = exist_mapping["_id"]
            mappings.update_one(
                {'_id': _id},
                {'$set': {
                    'rules': exist_mapping["rules"],
                    'deleted': exist_mapping["deleted"] if ("deleted" in exist_mapping) else False,
                    'version': exist_mapping["version"] if "version" in exist_mapping else 1,
                    'parentMappingId': exist_mapping["parentId"] if "parentId" in exist_mapping else None,
                    'mappingId': mapping_id,
                    'name': params["name"],
                    'fileId': params["file"],
                    'domainId': params["domainId"],
                }
                }, upsert=False
            )
            return exist_mapping["rules"]
        else:
            new_mappings = {"mappingId": mapping_id, "name": params["name"], "fileId": params["file"],
                            "domainId": params["domainId"], "deleted": False, "version": version,
                            "parentMappingId": parentId, "description": params["description"],
                            "rules": mapping}
            mappings.insert_one(new_mappings)
            return new_mappings["rules"]

    def update_mappings(self, params, mapping_id=None, mapping=None):
        """Saves the mapping data in mappings collection,
        mapping param is a dict contains the source/target key value"""

        mappings = mongo.db.mappings
        exist_mapping = self.get_mappings(params.get("mapping_id"))
        if exist_mapping:
            _id = exist_mapping["_id"]
            mappings.update_one(
                {'_id': _id},
                {'$set': {
                    'rules': params["mapping"],
                    "deleted": False
                }
                }, upsert=False
            )
            return exist_mapping["rules"]
        else:
            new_mappings = {"mappingId": mapping_id, "name": params["name"], "fileId": params["file"],
                            "domainId": params["domainId"], "deleted": False,
                            "rules": mapping}
            mappings.insert_one(new_mappings)
            return new_mappings["rules"]

    def delete_mapping(self, params):
        mappings = mongo.db.mappings
        exist_mapping = self.get_mappings(params.get("mapping_id"))
        if exist_mapping:
            _id = exist_mapping["_id"]
            mappings.update_one(
                {'_id': _id},
                {'$set': {
                    "deleted": True
                }
                }, upsert=False
            )
            return True
        else:
            return False

    def load_auto_mapping(self, params, mapping=None):
        """Saves the mapping data in mappings collection,
        mapping param is a dict contains the source/target key value"""

        new_mappings = {"fileId": params["file"],
                        "domainId": params["domainId"],
                        "rules": mapping}
        return new_mappings["rules"]

    def get_target_field(self, lob_id, target_name):
        """Fetches a document from the Scor Fields collection to get mapping's target field code"""

        scor_fields = mongo.db.scor_fields
        target_field = scor_fields.find_one({"name": {'$regex': f'^{target_name}$', '$options': 'i'},
                                             "lob": lob_id}, projection=["code", "isMappable"])
        if target_field:
            if target_field.get("isMappable"):
                return target_field["code"]

    def get_all_target_fields(self, lob_id, projection):
        """Fetches all the the documents from Scor Fields collection to get all lob fields names"""

        scor_fields = mongo.db.scor_fields

        fields_names = scor_fields.find({"lob": lob_id}, projection=projection)
        target_names = []
        for field_name in fields_names:
            if field_name["isMappable"]:
                target_names.append({key: field_name.get(key) for key in projection})
        return target_names

    def get_all_target_fields_by_domain(self, domain_id):
        """Fetches all the Target Fields By Domain"""
        Table = "fields"
        scor_fields = mongo.db[f"{domain_id}.{Table}"]
        # fields_names = scor_fields.find({"lob": lob_id}, projection=projection)
        fields_names = list(scor_fields.find({}))
        target_names = []
        for field_name in fields_names:
            target_names.append({'code': field_name["name"], 'name': field_name["label"]})
        return target_names

    def get_mappings_by_file_id(self, file_id):
        """Fetches a document from the mappings collection based on the given params"""

        mappings = mongo.db.mappings

        mapping = mappings.find_one({"fileId": file_id}, projection=["rules", "mappingId"])
        if mapping:
            return {"rules": mapping["rules"], "_id": mapping["_id"], "mappingId": mapping["mappingId"]}

    def getVersion(self, mapping_id):
        mappings = mongo.db.mappings

        return len(list(mappings.find({"parentMappingId": mapping_id}))) + 2