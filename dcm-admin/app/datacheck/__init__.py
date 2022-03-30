from abc import abstractmethod


class CheckParam:

    def __init__(self, name, type=None, role=None, label= None, options= None, property_types=None):

        self.type = type or 'input'
        self.role = role
        self.name = name
        self.label = label or self.name

        if options:
            self.options = options
            self.radio = True

        self.property_types = property_types


class CheckAbstract:

    id = None
    name = None
    category = None
    description = None
    parameters = []
    property_types = None

    @abstractmethod
    # CONDITION SHOULD BE TRUE IF VALUE IS VALID
    def check_column(self, df, column, *args, **kwargs):
        pass