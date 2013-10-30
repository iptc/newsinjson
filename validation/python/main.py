__author__ = 'Mohammed M S Alhajeri'

from jsonschema import validate
from jsonschema.exceptions import ValidationError
import json
import os, glob,sys

def main():
    schema = openFile('json/schema/ninjs-schema_1.0_2013-09-04.json')

    for filename in glob.glob("json/data/*.json"):
        try:
            validate(openFile(filename),schema)
        except ValidationError:
            print (" Validation Error of %s" % filename)


def openFile(filename):
    json_data = open(filename)
    data = json.load(json_data)
    json_data.close()
    return data


if __name__ == "__main__":
   main()