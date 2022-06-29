#!/usr/bin/python
# -*- coding: utf-8 -*-

from database.connectors import mongo


class DataHandlerDocument:

    def get_modification(self, file_id, index):
        """Fetches a document from modifications collection based on given params"""

        modification = mongo.db.import_modifications

        return modification.find_one({"fileId": file_id, "index": index})

    def get_file_headers(self, file_id):
        """Fetches a document from sheet_metadata collections and returns its column's names"""

        metadata = mongo.db.worksheet_metadata

        worksheet_metadata = metadata.find_one({"worksheetId": file_id}, projection=["columns"])
        if worksheet_metadata:
            return [column if isinstance(column, str) else column.get('name') for column in worksheet_metadata["columns"]]

    def set_is_mapped(self, headers, file_id):
        """Sets the isMapped field in the sheet_metadata collection to True"""

        metadata = mongo.db.worksheet_metadata

        worksheet_metadata = metadata.find_one({"worksheetId": file_id})
        if worksheet_metadata:
            columns_dict = {}
            for column in worksheet_metadata["columns"]:
                if type(column) == str:
                    columns_dict[column] = {"name": column, "isMapped": False}
                else:
                    column["isMapped"] = False
                    columns_dict[column["name"]] = column

            for header in headers:
                column = columns_dict.get(header)
                if column:
                    column["isMapped"] = True
            metadata.update_one(
                {'_id': worksheet_metadata["_id"]},
                {'$set': {
                    'columns': [column for column in columns_dict.values()]
                }
                }, upsert=False
            )

            return columns_dict