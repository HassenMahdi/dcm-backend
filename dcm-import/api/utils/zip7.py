from api.utils.utils import get_path


def extract_file_from_7z(file_id, target, rename):
    import py7zr
    seven_file_path = get_path(file_id, filename=file_id, extension='7z')
    extraction_seven_file_path = get_path(file_id, as_folder=True)

    with py7zr.SevenZipFile(seven_file_path, mode='r') as z:
        z.extract(path=extraction_seven_file_path, targets=[target])
        extracted_file_original_path = get_path(file_id, filename=target, extension='')
        extracted_file_path = get_path(file_id, filename=uuid)
        import os
        os.rename(extracted_file_original_path, extracted_file_path)
