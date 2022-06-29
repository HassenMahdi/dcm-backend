import os

import pandas as pd
from mapper import AutoMapper

from api.utils.utils import get_path, generate_id
from database.mapper_document import MapperDocument
from database.top_panel_document import TopPanelDocument
from database.mapping_template_document import MappingTemplateDocument
from database.data_handler_document import DataHandlerDocument
import nltk

# nltk.download('punkt')

EYE_NROWS = 10
IMPORT_FOLDER = "imports/"
EXCEL_EXTENSIONS = {"xlsx", "xlx", "xlmx"}


def start_new_mapping(params):
    """Gets the file headers, retrieves the lob mapping fields and save a new mapping in the database"""
    mapper_document = MapperDocument()
    data_document = DataHandlerDocument()

    headers = get_headers(params, data_document)
    target_fields = mapper_document.get_all_target_fields_by_domain(params["domainId"])
    mapping_id = generate_id(params["file"])

    # AUTO OR MANUAL MAPPING
    if "mapping" in params and params["mapping"]:
        unmapped_target_fields = []
        unmapped_headers = []
        mapping = params["mapping"]
    else:
        mapper = AutoMapper()
        mapping, unmapped_headers, unmapped_target_fields = mapper.map(column_names=headers, fields=target_fields)

    mapping_result = save(mapper_document, params, mapping_id, mapping)
    headers = [header for index, header in enumerate(headers) if index not in unmapped_headers]
    columns_details = data_document.set_is_mapped(headers, params["file"])
    return mapping_id, mapping_result, 1, target_fields, columns_details

def save(mapper_document, params, mapping_id, mapping):
    if "parentMappingId" in params and params["parentMappingId"] and params["parentMappingId"] is not None:
        parent = mapper_document.get_mappings(params["parentMappingId"])
        params["name"] = parent["name"]
        return mapper_document.save_mappings(params, mapping_id, mapping,
                                             mapper_document.getVersion(params["parentMappingId"]),
                                             params["parentMappingId"])
    else:
        return mapper_document.save_mappings(params, mapping_id, mapping)


def load_automatic_mapping(params):
    """Gets the file headers, retrieves the lob mapping fields and save a new mapping in the database"""

    mapper_document = MapperDocument()
    data_document = DataHandlerDocument()
    # saved_mapping = mapper_document.get_mappings_by_file_id(params["file"])

    # if saved_mapping:
    #     mapped_headers = []
    #     mapping__id = saved_mapping["mappingId"]
    #     del saved_mapping["_id"]
    #     for rule in saved_mapping["rules"]:
    #         mapped_headers.extend(rule["source"])
    #     target_fields = mapper_document.get_all_target_fields_by_domain(params["domainId"])
    #     columns_details = data_document.set_is_mapped(mapped_headers, params["file"])
    #     return mapping__id, saved_mapping["rules"], target_fields, columns_details
    # else:
    mapper = AutoMapper()
    # headers = data_document.get_file_headers(params["file"])
    headers = get_headers(params, data_document)
    target_fields = mapper_document.get_all_target_fields_by_domain(params["domainId"])
    mapping, unmapped_headers, unmapped_target_fields = mapper.map(column_names=headers, fields=target_fields)
    # mapping_id = generate_id(params["file"])
    mapping_result = mapper_document.load_auto_mapping(params, mapping)
    headers = [header for index, header in enumerate(headers) if index not in unmapped_headers]
    columns_details = data_document.set_is_mapped(headers, params["file"])
    return mapping_result, target_fields, columns_details


def read_column_head(file_id, column):
    """Reads the first 10 lines in xlsx file for a given column"""

    path = get_path(IMPORT_FOLDER, file_id)
    df = pd.read_csv(path, engine="c", dtype=str, skipinitialspace=True, nrows=EYE_NROWS,
                     usecols=[column], na_filter=False)
    preview = df.to_dict(orient="split")

    return preview


def get_top_panel_values(mapping_id):
    """Fetches top panel values from database for the mapping top panel interface"""

    top_panel_document = TopPanelDocument()
    top_panel_data = top_panel_document.get_top_panel_data(mapping_id)
    if top_panel_data:
        return top_panel_data["content"]

    return False


def save_top_panel(params):
    """Inserts top panel values in the database"""
    top_panel_document = TopPanelDocument()
    top_panel_document.save_top_panel_data(params)


def get_template(template_id):
    """finds template values from database to load a mapping"""

    template_document = MappingTemplateDocument()
    return template_document.get_mapping_template(template_id)


def get_mappings(domain_id):
    """finds template values from database to load a mapping"""

    template_document = MappingTemplateDocument()
    return template_document.get_mappings_grouped(domain_id)


def check_mapping_usability(mapping_id):
    template_document = MappingTemplateDocument()
    return template_document.check_mapping_usability(mapping_id)


def get_archived_mappings(domain_id):
    template_document = MappingTemplateDocument()
    return template_document.get_archived_mappings(domain_id)


def check_names(params):
    template_document = MappingTemplateDocument()
    return template_document.check_name(params)


def get_mapping(params):
    """finds template values from database to load a mapping"""
    mapper_document = MapperDocument()
    data_document = DataHandlerDocument()
    saved_mapping = mapper_document.get_mappings(params["mappingId"])
    if saved_mapping:
        mapped_headers = []
        mapping__id = params["mappingId"]
        del saved_mapping["_id"]
        for rule in saved_mapping["rules"]:
            mapped_headers.extend(rule["source"])
        target_fields = mapper_document.get_all_target_fields_by_domain(params["domainId"])
        columns_details = data_document.set_is_mapped(mapped_headers, params["file"])
    return mapping__id, saved_mapping["rules"], target_fields, columns_details


def delete_mapping(params):
    mapper_document = MapperDocument()
    saved_mapping = mapper_document.get_mappings(params["mapping_id"])
    if saved_mapping:
        return mapper_document.delete_mapping(params)


def save_template(template):
    """Inserts a template values in the database"""

    template_document = MappingTemplateDocument()
    template_document.save_mapping_template(template)


def find_templates_ids(header):
    """finds templates ids based on list of file's header"""

    template_document = MappingTemplateDocument()
    return template_document.get_templates_id(header)


def apply_modifications(file_id, preview):
    """Apply the modifications for a preview"""

    data_document = DataHandlerDocument()

    for index in preview["index"]:
        modification = data_document.get_modification(file_id, index)
        if modification:
            preview["data"][index] = modification["content"]

    return preview


def get_transformed_file_headers(filename):
    path = filename + ".csv"

    columns = pd.read_csv(path, sep=";", engine="c", dtype=str, skipinitialspace=True, skiprows=0, nrows=1,
                          na_filter=False) \
        .columns.tolist()
    return columns


def get_headers(params, data_document):
    if ("transformed" in params) and (params["transformed"]):
        return get_transformed_file_headers(params["transformed"])
    else:
        return data_document.get_file_headers(params["file"])
    # new new