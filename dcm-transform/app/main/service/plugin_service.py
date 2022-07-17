
from app.db.Models.plugin import Plugin


def get_plugin_by_id(plugin_id):
    return Plugin().db().find_one({'_id': plugin_id})
