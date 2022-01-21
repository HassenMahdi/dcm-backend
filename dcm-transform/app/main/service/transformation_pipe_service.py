import uuid
import datetime

from app.db.Models.transformation_pipe import TransformationPipe


def save_pipe(data):
    id = data.get('id', None)
    pipe = TransformationPipe(**{'id': id}).load()

    if not pipe.id:
        identifier = uuid.uuid4().hex.upper()

        new_pipe = TransformationPipe(
            **{**data, **{
                'id': identifier,
                'identifier': identifier,
                'created_on': datetime.datetime.utcnow()
            }})
        #     CREATE NEW TABLES HERE
        pipe = new_pipe
    else:
        pipe.name = data['name']
        pipe.description = data.get('description', None)
        pipe.nodes = data['nodes']
        pipe.domain_id = data['domain_id']
        pipe.modified_on = datetime.datetime.utcnow()

    pipe.save()

    return pipe


def delete_pipe(data):
    id = data['id']
    pipe = TransformationPipe(**{'id': id}).load()

    if pipe.id:
        pipe = TransformationPipe(**data).delete()
    else:
        raise Exception(f'NO TRANSFORMATION WITH ID {id} FOUND')

    return pipe


def get_all_pipes():
    return TransformationPipe.get_all()


def get_domains_by_domain_id(domain_id):
    return TransformationPipe.get_all(query={'domain_id': domain_id})


def get_pipe_by_id(pipe_id):
    return TransformationPipe.get_all(query={'identifier': pipe_id})
