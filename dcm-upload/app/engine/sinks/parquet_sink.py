import os

from flask import current_app

from app.db.Models.flow_context import FlowContext
from app.engine import SinkEngine, DataFrameEngine
from pydrill.client import PyDrill

from app.main.service.azure_service import save_data_blob, download_data_as_table
import pyarrow as pa
import pyarrow.parquet as pq

class ParquetSinkEngine(SinkEngine):
    __SINK_TYPE__ = 'parquet'
    _drill = None

    context: FlowContext = None

    def __init__(self, context: FlowContext):
        super(ParquetSinkEngine, self).__init__(context)

    def upload(self, frame: DataFrameEngine):
        domain_id = self.context.domain_id
        flow_id = self.context.id
        table = pa.Table.from_pandas(frame.frame)
        frame_buffer = pa.BufferOutputStream()
        pq.write_table(table, frame_buffer)
        buffer = bytes(frame_buffer.getvalue())
        blob_name = f'{domain_id}/{flow_id}'
        save_data_blob(buffer, blob_name)

    def load(self, domain_id, files_to_download):
        return download_data_as_table(domain_id, files_to_download)


