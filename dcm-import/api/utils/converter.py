#!/usr/bin/python
# -*- coding: utf-8 -*-

import ast
import traceback
import subprocess
from pathlib import Path

CONVERTER_VERSION = "2.2"
JAR_NAME = "./converter.jar"
SHEET_JAR_NAME = f"./converter_{CONVERTER_VERSION}.jar"


def excel_to_csv(file_path, destination):
    """Converts excel's worksheets to csv files"""

    jar_path = str(Path(__file__).parent.joinpath(JAR_NAME).absolute())
    cmd = ['java', '-jar', jar_path]
    args = [file_path, destination, '--h']

    print(cmd + args)

    return process_cmd(cmd, args)


def excel_sheet_to_csv(file_path, destination, s, cs=0, ce=0, rs=0, re=0):
    """Converts excel's worksheets to csv files"""
    jar_path = str(Path(__file__).parent.joinpath(SHEET_JAR_NAME).absolute())
    cmd = ['java', '-jar', jar_path]
    args = [file_path, destination] + [
        f"--{k}={v}" for k, v in dict(s=s,cs=cs,ce=ce,rs=rs,re=re).items()
    ]

    print(cmd + args)

    return process_cmd(cmd, args)


def get_work_sheets(file_path):
    """Converts excel's worksheets to csv files"""
    jar_path = str(Path(__file__).parent.joinpath(SHEET_JAR_NAME).absolute())
    cmd = ['java', '-jar', jar_path]
    args = [file_path, file_path]

    print(cmd + args)

    return process_cmd(cmd, args)


def process_cmd(cmd, args):
    try:
        process = subprocess.Popen(cmd + args, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                   encoding="ISO-8859-1")
        stdout_value, stderr_value = process.communicate()
        print(stdout_value)
        if process.returncode is not 0:
            raise Exception
        return ast.literal_eval(stdout_value)

    except Exception:
        traceback.print_exc()
        return False
