from app.db.connection import mongo


class WorksheetDocument:

    def create_file_metadata(self, fileId, worksheetId, headers, total_lines):
        """Creates the sheet metadata document"""

        metadata = mongo.db.worksheet_metadata

        columns = []
        for header in headers:
            column = {"name": header, "isMapped": False}
            columns.append(column)
        metadata.insert_one({"fileId": fileId, "worksheetId": worksheetId, "totalExposures": total_lines, "columns": columns})

    def get_file_metadata(self, file_id, fields=None):
        """Fetches worksheet metadata document from worksheet_metadata"""

        metadata = mongo.db.worksheet_metadata
        
        return metadata.find_one({"worksheetId": file_id}, projection=fields)