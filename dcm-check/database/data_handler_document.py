#!/usr/bin/python
# -*- coding: utf-8 -*-

from database.connectors import mongo


class DataHandlerDocument:

    @staticmethod
    def update_worksheet_metadata(sheet_id, total_lines):
        mongo.db.worksheet_metadata.update_one({"worksheetId": sheet_id}, {"$set": {"totalExposures": total_lines}})


