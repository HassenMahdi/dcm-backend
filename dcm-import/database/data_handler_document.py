#!/usr/bin/python
# -*- coding: utf-8 -*-

import datetime
from database.connection import mongo


class DataHandlerDocument:

    @staticmethod
    def update_worksheet_metadata(sheet_id, total_lines):
        mongo.db.worksheet_metadata.update_one({"worksheetId": sheet_id}, {"$set": {"totalExposures": total_lines}})

    def get_modification(self, file_id, index):
        """Fetches a document from modifications collection based on given params"""

        modification = mongo.db.import_modifications

        return modification.find_one({"fileId": file_id, "index": index})

    def save_modifications(self, params):
        """inserts a document in modifications collection based on given params,
           if a document exists with the given fileId, an update is occurred instead"""

        modification = mongo.db.import_modifications

        exist_modif = self.get_modification(params["file"], params["index"])
        if exist_modif:
            _id = exist_modif["_id"]
            modification.update_one(
                {'_id': _id},
                {'$set': {"content": params["content"]}},
                upsert=False
            )
        else:
            modif = modification.insert_one(
                {"fileId": params["file"], "index": params["index"], "content": params["content"]})

    def create_file_metadata(self, file_id, lob_id, headers, total_lines):
        """Creates the sheet metadata document"""

        metadata = mongo.db.worksheet_metadata

        columns = []
        for header in headers:
            column = {"name": header, "isMapped": False}
            columns.append(column)
        metadata.insert_one({"fileId": file_id, "lobId": lob_id, "totalExposures": total_lines, "columns": columns})

    def get_file_metadata(self, file_id, fields=None):
        """Fetches worksheet metadata document from worksheet_metadata"""

        metadata = mongo.db.worksheet_metadata

        return metadata.find_one({"worksheetId": file_id}, projection=fields)

    def get_imported_file_metadata(self, file_id):
        """Fetches worksheet metadata document from worksheet_metadata"""

        metadata = mongo.db.file_metadata
        return metadata.find_one({"file_id": file_id})


    def get_worksheet_metadata(self, file_id, sheetId,cs,ce,rs,re, base_sheet=False):
        """Fetches worksheet metadata document from worksheet_metadata"""

        metadata = mongo.db.worksheet_metadata
        return metadata.find_one({"fileId": file_id, "sheetId": sheetId, "cs": cs, "ce": ce, "rs": rs, "re": re, "base_sheet": base_sheet})

    def get_worksheet_metadata_by_id(self, sheet_id):
        """Fetches worksheet metadata document from worksheet_metadata"""
        metadata = mongo.db.worksheet_metadata
        return metadata.find_one({"worksheetId":sheet_id})

    def create_file_metadata_by_domain(self, file_id, worksheet_id,file_name, worksheet_name, domain_id, headers, total_lines, **kwargs):
        """Creates the sheet metadata document"""

        metadata = mongo.db.worksheet_metadata

        columns = []
        for header in headers:
            column = {"name": header, "isMapped": False}
            columns.append(column)
        metadata.insert_one(
            {"fileId": file_id,"file_name":file_name,"worksheetId": worksheet_id, "worksheet_name":worksheet_name, "domainId": domain_id, "totalExposures": total_lines, "columns": columns, **kwargs})

    def create_imported_file_metadata(self, import_status):
        """Creates the sheet metadata document"""
        file_metadata = dict(import_status)
        metadata = mongo.db.file_metadata
        metadata.insert_one(file_metadata)

    @staticmethod
    def converted_excel_sheet(file_id, sheetId):
        result = DataHandlerDocument().get_worksheet_metadata(file_id, sheetId, 0, 0, 0, 0, base_sheet=True)
        if result:
            return {
                "uuid": result['worksheetId'],
                "sheetName": result['worksheet_name'],
                "rowCount": result['totalExposures'],
            }
        else:
            return None

    def create_excel_sheet_metadata(file_id, sheet_id ,sheetId, sheet_name, total_lines, columns, cs,ce,rs,re, base_sheet=False):
        metadata = mongo.db.worksheet_metadata
        metadata.insert_one({
            "fileId": file_id,
            # File Sheet ID
            "worksheetId": sheet_id,
            "worksheet_name": sheet_name,
            "totalExposures": total_lines,
            "columns": columns,
            # Limits
            "cs": cs, "ce": ce, "rs": rs, "re":re,
            # Execl sheet ID
            "sheetId": sheetId,
            "base_sheet": base_sheet,
        })

    def get_connector_by_id(self,id):
        connectors = mongo.db.connectors
        return connectors.find_one({"_id": id})






