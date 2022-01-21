from flask import current_app
from pymongo import InsertOne, UpdateOne

from app.db.Models.domain_collection import DomainCollection
from app.db.Models.field import TargetField
from app.db.Models.flow_context import FlowContext
from app.engine import SinkEngine, DataFrameEngine
from pydrill.client import PyDrill

from app.main.util.storage import get_path
import pandas as pd
import pyarrow as pa


class DocumentSinkEngine(SinkEngine):
    __SINK_TYPE__ = 'document'

    context: FlowContext = None

    def __init__(self, context: FlowContext = None):
        super(DocumentSinkEngine, self).__init__(context)
        if context:
            self.fields = TargetField.get_all(domain_id = context.domain_id)
            self.primary_keys = list(map(lambda f: f.name,filter(lambda f: f.primary , self.fields)))

    def upload(self, frame: DataFrameEngine):
        frame.frame.fillna("", inplace=True)
        dict_gen = frame.to_dict_generator()
        with DomainCollection.start_session() as session:
            # TODO CHUNK INTO THREADS
            try:
                # session.start_transaction()
                ops_gen = []
                for doc in dict_gen:
                    match = {pk:doc.get(pk) for pk in self.primary_keys}
                    update = {"$set": doc}
                    ops_gen.append(UpdateOne(match, update, upsert=True))
                # ops_gen = [UpdateOne({for } ,line, {"upsert": True}) for line in dict_gen]
                DomainCollection.bulk_ops(ops_gen, domain_id=self.context.domain_id, session=session)
            except Exception as bulk_exception:
                # session.abort_transaction()
                raise bulk_exception
            # finally:
                # session.end_session()

    def load(self, domain_id, files_to_download):
        query = {}
        if len(files_to_download)>0:
            query = {"flow_id":{'$all':{files_to_download}}}
        cursor = DomainCollection().db(domain_id=domain_id).find(query, {"_id":0})

        return pa.Table.from_pandas(pd.DataFrame(list(cursor)))




