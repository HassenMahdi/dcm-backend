import csv
import pyodbc

def get_access_tables(filepath, password=""):
    MDB = filepath
    PWD = password

    conn_str = (
        r'DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};'
        r'DBQ=%s;'
        r'Trusted_Connection=yes;' % (MDB)
    )
    conn = pyodbc.connect(conn_str)
    curs = conn.cursor()

    # return [{"sheetId":x[2], "sheetName": x[2]}  for x in curs.tables().fetchall() if x[3] == 'TABLE']
    return [{"sheetId":x[2], "sheetName": x[2]}  for x in curs.tables().fetchall()]


def access_to_csv(source_path, destination_path, table_name, password=''):
    MDB = source_path
    PWD = password

    conn_str = (
            r'DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};'
            r'DBQ=%s;'
            r'Trusted_Connection=yes;' % (MDB)
    )
    conn = pyodbc.connect(conn_str)
    curs = conn.cursor()
    curs.execute(f'SELECT * FROM {table_name};')

    header = [column[0] for column in curs.description]
    rows = curs.fetchall()

    curs.close()
    conn.close()

    csv_writer = csv.writer(open(f'{destination_path}', 'w'), lineterminator='\n', delimiter =';')

    row_count = 0
    csv_writer.writerow(header)
    for row in rows:
        row_count += 1
        csv_writer.writerow(row)

    return row_count
