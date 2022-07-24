from app.db.document import Document
from app.db.connection import mongo


class MapperDocument(Document):
  __TABLE__ = "mappings"

  def get_mappings(self, mapping_id):
    """Fetches a document from the mappings collection based on the given params"""
    mapping = mongo.db.mappings.find_one({"mappingId": mapping_id}, projection=["rules", "name"])
    if mapping:
      return {"rules": mapping["rules"], "_id": mapping["_id"], "name": mapping["name"]}
