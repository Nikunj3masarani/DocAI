import os
import json

with open(os.path.join(os.getcwd(), 'models.json'), 'r') as models_file:
    data = json.loads(models_file.read())
