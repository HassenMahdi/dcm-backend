#!/usr/bin/python
# -*- coding: utf-8 -*-

from database.connectors import mongo


class TopPanelDocument:

    def get_top_panel_data(self, mapping_id):
        """Fetches a document from top_panel collection"""

        top_panel = mongo.db.top_panel

        top_panel_data = top_panel.find_one({"mappingId": mapping_id}, projection=["_id", "content"])
        if top_panel_data:
            top_panel_data = {"_id": top_panel_data["_id"], "content": top_panel_data["content"]}

        return top_panel_data

    def save_top_panel_data(self, params):
        """Saves the top panel elements in top panel collection"""

        top_panel = mongo.db.top_panel
        top_panel_data = self.get_top_panel_data(params["mapping_id"])
        if top_panel_data:
            _id = top_panel_data["_id"]            
            top_panel.update_one(
                {'_id': _id},
                {'$set': {
                    'content': params["content"]
                }
                }, upsert=False
            )
        
        else:
            top_panel_data = {"mappingId": params["mapping_id"], "content": params["content"]}
            top_panel.insert_one(top_panel_data)

    def get_currencies(self):
        """Fetches all currencies code from CURRENCY collections"""

        currency = mongo.db.CURRENCY

        currencies = currency.find({}, projection=["CODE"])
        currencies = [currency["CODE"] for currency in currencies]

        return currencies

    def get_countries(self):
        """Fetches countries code and name from GEOSCOPE collection"""

        geo_scope = mongo.db.GEOSCOPE

        countries = geo_scope.find({"GEO_LEVEL": "1"}, projection=["GEO_CD", "GEO_DESCRIPTION"])
        countries = [{"code": country["GEO_CD"], "name": country["GEO_DESCRIPTION"]} for country in countries]

        return countries
