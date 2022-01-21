import math
from urllib.parse import urlencode

import pandas as pd

from api.utils.dataframe import read_csv


class Paginator:
    """
    A general purpose paginator based on offset/limit style.
    """

    # maximun size per page that we can reach
    MAX_LIMIT = 500
    DEFAULT_PAGE = 1  # first page
    DEFAULT_LIMIT = 50  # default size per page

    total = None
    offset = None

    def __init__(self, base_url, query_dict={}, page=0, limit=0):
        self.base_url = base_url
        self.query_dict = query_dict.copy()

        if page <= 0:
            page = self.DEFAULT_PAGE
        else:
            page = int(page)

        if limit <= 0:
            limit = self.DEFAULT_LIMIT
        elif limit > self.MAX_LIMIT:
            limit = self.MAX_LIMIT
        else:
            limit = int(limit)

        self.query_dict["page"] = self.page = page
        self.query_dict["nrows"] = self.limit = limit

    def __generate_self_link(self):
        return self.base_url + "?" + urlencode(self.query_dict)

    def __generate_first_link(self):
        updated_query = self.query_dict.copy()
        updated_query["page"] = 1

        return self.base_url + "?" + urlencode(updated_query)

    def __generate_prev_link(self):
        if self.query_dict["page"] <= 1:
            return None
        updated_query = self.query_dict.copy()
        updated_query["page"] -= 1
        return self.base_url + "?" + urlencode(updated_query)

    def __generate_next_link(self):
        if self.query_dict["page"] >= self.last_page:
            return None
        updated_query = self.query_dict.copy()
        updated_query["page"] += 1
        return self.base_url + "?" + urlencode(updated_query)

    def __generate_last_link(self):
        updated_query = self.query_dict.copy()
        updated_query["page"] = self.last_page
        return self.base_url + "?" + urlencode(updated_query)

    def __generate_links(self, last_page):
        self.last_page = last_page
        self.links = {
            "self": self.__generate_self_link(),
            "first": self.__generate_first_link(),
            "prev": self.__generate_prev_link(),
            "next": self.__generate_next_link(),
            "last": self.__generate_last_link()
        }

    def load_paginated_dataframe(self, file_path, total_exposures, filtred, filter_indices=None):
        self.total = total_exposures
        last_page = math.ceil(self.total / self.limit)
        if last_page <= 0:
            last_page = self.DEFAULT_PAGE

        self.__generate_links(last_page)

        offset = (self.page - 1) * self.limit
        delta_nrows = total_exposures - (self.page * self.limit)
        nrows = self.limit if delta_nrows >= 0 else total_exposures - ((self.page - 1) * self.limit)
        end = offset + nrows
        if filtred:
            if len(filter_indices) == 0:
                skiprows = range(0, total_exposures)
            else:
                indices = filter_indices[offset:end]
                in_rows = {index + 1 for index in indices}
                skiprows = set(range(1, max(indices) + 1)) - in_rows if indices else {}
                self.absolute_index = indices
        else:
            skiprows = lambda x: x != 0 and x <= offset
            indices = list(range(offset, end))

        exposures = read_csv(file_path, skip_rows=skiprows, n_rows=nrows)
        # save offset for later use
        self.offset = offset

        return exposures

    def get_paginated_response(self, data, columns, categories):
        paginated_response = {
            "_links": self.links,
            "current_page": self.page,
            "first_page": self.DEFAULT_PAGE,
            "last_page": self.last_page,
            "total": self.total,
            "count": len(data),
            "data": data.to_dict(orient="split")["data"],
            "headers": columns,
            "categories": categories
        }

        exposures = paginated_response["data"]
        if isinstance(exposures, dict) and "index" in exposures:
            del exposures["index"]

        end = self.limit + self.offset
        if end > self.total:
            end = self.total
        paginated_response["index"] = list(range(self.offset, end))

        return paginated_response
