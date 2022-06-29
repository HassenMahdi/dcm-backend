import os

from sqlalchemy import MetaData, Table
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from config import config_by_name


env = os.getenv('DEPLOY_ENV') or 'dev'
db_uri = config_by_name[env].SQLALCHEMY_DATABASE_URI


class FieldsMapper:

    def __init__(self):

        self.engine = create_engine(db_uri)
        self.metadata = MetaData(self.engine)
        self.Session = sessionmaker(bind=self.engine)

    def get_mapping_fields(self, lob_id):
        """Fetches the mapping fields based on LOB identifier"""

        mapping_fields = []
        session = self.Session()

        dcm_fields = Table('DCM_BORDEREAU_FIELD', self.metadata, autoload=True)
        fields = session.query(dcm_fields).filter_by(LOB_ID=lob_id)
        for row in fields:
            mapping_field = {}
            for column, field in zip(dcm_fields.c, row):
                column = column.name.__str__().lower()
                mapping_field[column] = field

            mapping_fields.append(mapping_field)

        return mapping_fields
