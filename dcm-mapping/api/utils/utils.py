#!/usr/bin/python
# -*- coding: utf-8 -*-

import hashlib
import datetime
from pathlib import Path

from flask import current_app as app


def get_upload_file_path(folder=""):
    """constructs the full path for a file under UPLOAD FOLDER """

    upload_path = Path(app.config['UPLOAD_FOLDER'])
    
    return upload_path.joinpath(folder)
    

def get_path(folder, filename="", as_folder=False, create=False, extension="csv"):

    """Creates the full path for a file under UPLOAD FOLDER"""
    folder_path = Path(get_upload_file_path(folder=folder))
    if create:
        folder_path.mkdir(parents=True, exist_ok=True)
    if as_folder:
        return str(folder_path)
    else:
        return str(folder_path.joinpath(f"{filename}.{extension}"))


def generate_id(token):
    """Generates a unique hashed id for token based on timestamp"""

    timestamp = f"{str(datetime.datetime.now().date())}_{str(datetime.datetime.now().time()).replace(':', '.')}"
    token = f"{token}_{timestamp}"

    return f"{hashlib.sha256(token.encode('utf-8')).hexdigest()}"