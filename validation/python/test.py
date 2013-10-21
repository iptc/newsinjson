import unittest
import json
from jsonschema import validate
from jsonschema.exceptions import ValidationError
class TestSequenceFunctions(unittest.TestCase):

    def setUp(self):
        self.schema = openFile("json/schema/ninjs-schema_1.0_2013-09-04.json")


    def test_ninjsExComplex1(self):
        result = validate(openFile('json/data/ninjsExComplex1.json'),self.schema)
        self.assertEquals(result,None)
    def test_ninjsExComplex2(self):
        result = validate(openFile('json/data/ninjsExComplex2.json'),self.schema)
        self.assertEquals(result,None)
    def test_ninjsExMediumText1(self):
        result = validate(openFile('json/data/ninjsExMediumText1.json'),self.schema)
        self.assertEquals(result,None)
    def test_ninjsExSimplePhoto1(self):
        result = validate(openFile('json/data/ninjsExSimplePhoto1.json'),self.schema)
        self.assertEquals(result,None)
    def test_ninjsExSimpleText1(self):
        result = validate(openFile('json/data/ninjsExSimpleText1.json'),self.schema)
        self.assertEquals(result,None)
    def test_ninjsExComplex2_invalid(self):
        data = openFile('json/data/ninjsExComplex2-invalid.json')
        self.assertRaises(ValidationError,validate,data,self.schema)



def openFile(filename):
        json_data = open(filename)
        data = json.load(json_data)
        json_data.close()
        return data

if __name__ == '__main__':
    unittest.main()
