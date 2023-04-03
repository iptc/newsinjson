#!/usr/bin/env python3

# -*- coding: utf-8 -*-

# Copyright (c) 2022 International Press Telecommunications Council (IPTC)
#
# The MIT License
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

"""
ninjs unit tests
"""

import unittest
import json
import jsonschema
import os

TEST_FILES_FOLDER = os.path.join('..', 'test_suite')
EXAMPLE_FILES_FOLDER_1_x = os.path.join('..', '..', 'examples', '1.4')
EXAMPLE_FILES_FOLDER_2_x = os.path.join('..', '..', 'examples', '2.1')
DOCUMENTATION_EXAMPLES_FOLDER = os.path.join(
    '..', '..', 'documentation', 'includes', 'examples'
)

class TestNinJSSchema(unittest.TestCase):
    ninjs_schema = None

    def __init__(self, *args, **kwargs):
        """
        Set up paths and load the schema.

        If we put this in setUp() rather than __init__(), it would
        load the schema for each test which is unnecessary.
        """
        import os
        self.current_path = os.path.dirname(os.path.realpath(__file__))
        specification_path = os.path.join(
            self.current_path,
            '..',
            '..',
            'specification'
        )
        ninjs10_schema_filename = os.path.join(
            specification_path,
            'ninjs-schema_1.0.json'
        )
        ninjs11_schema_filename = os.path.join(
            specification_path,
            'ninjs-schema_1.1.json'
        )
        ninjs12_schema_filename = os.path.join(
            specification_path,
            'ninjs-schema_1.2.json'
        )
        ninjs13_schema_filename = os.path.join(
            specification_path,
            'ninjs-schema_1.3.json'
        )
        ninjs14_schema_filename = os.path.join(
            specification_path,
            'ninjs-schema_1.4.json'
        )
        ninjs20_schema_filename = os.path.join(
            specification_path,
            'ninjs-schema_2.0.json',
        )
        ninjs21_schema_filename = os.path.join(
            specification_path,
            'ninjs-schema_2.1.json',
        )
        ninjs1xdev_schema_filename = os.path.join(
            specification_path,
            'ninjs-schema-dev_0.2_v1.4.json'
        )
        ninjs2xdev_schema_filename = os.path.join(
            specification_path,
            'ninjs-schema-dev_0.1_v2.0.json'
        )
        with open(ninjs10_schema_filename) as schemafile:
            self.ninjs10_schema = json.load(schemafile)
        with open(ninjs11_schema_filename) as schemafile:
            self.ninjs11_schema = json.load(schemafile)
        with open(ninjs12_schema_filename) as schemafile:
            self.ninjs12_schema = json.load(schemafile)
        with open(ninjs13_schema_filename) as schemafile:
            self.ninjs13_schema = json.load(schemafile)
        with open(ninjs14_schema_filename) as schemafile:
            self.ninjs14_schema = json.load(schemafile)
        with open(ninjs1xdev_schema_filename) as schemafile:
            self.ninjs1xdev_schema = json.load(schemafile)
        with open(ninjs2xdev_schema_filename) as schemafile:
            self.ninjs2xdev_schema = json.load(schemafile)
        with open(ninjs20_schema_filename) as schemafile:
            self.ninjs20_schema = json.load(schemafile)
        with open(ninjs21_schema_filename) as schemafile:
            self.ninjs21_schema = json.load(schemafile)

        self.latest_1_x_schema = self.ninjs14_schema
        self.latest_2_x_schema = self.ninjs21_schema

        return super(TestNinJSSchema, self).__init__(*args, **kwargs)

    # HELPER FUNCTIONS

    def get_files_in_folder(self, folder_name):
        folder_name = os.path.join(
                        self.current_path,
                        folder_name
                    )
        if not os.path.isdir(folder_name):
            return []
        else:
            return [
                os.path.join(folder_name, file)
                for file in os.listdir(folder_name)
                if file.endswith('.json')
            ]

    def get_test_files_in_folder(self, test_folder_name):
        return self.get_files_in_folder(
                 os.path.join(
                    TEST_FILES_FOLDER,
                    test_folder_name
                 )
               )

    def load_test_file(self, file_name):
        with open(file_name, 'r') as jsonfile:
            instance = json.load(jsonfile)
        return instance

    def folder_should_pass(self, schema=None, folder_name=None):
        testfiles = self.get_test_files_in_folder(folder_name)
        for file in testfiles:
            with self.subTest(file=file):
                instance = self.load_test_file(file)
                self.assertIsNone(
                    jsonschema.validate(
                        instance,
                        schema
                    )
                )

    def folder_should_fail(self, schema=None, folder_name=None):
        testfiles = self.get_test_files_in_folder(folder_name)
        for file in testfiles:
            with self.subTest(file=file):
                with (
                        self.assertRaises(
                            (
                                jsonschema.exceptions.ValidationError,
                                json.decoder.JSONDecodeError
                            )
                        )
                    ):
                    instance = self.load_test_file(file)
                    self.assertIsNone(
                        jsonschema.validate(
                            instance,
                            schema
                        )
                    )

    # TESTS START HERE

    def test_simplest_instance(self):
        """
        jsonschema.validate returns None if valid, raises an exception for
        schema validation errors. So we use assertIsNone.
        """
        self.assertIsNone(jsonschema.validate({"uri": "test1.0"}, self.ninjs10_schema))
        self.assertIsNone(jsonschema.validate({"uri": "test1.1"}, self.ninjs11_schema))
        self.assertIsNone(jsonschema.validate({"uri": "test1.2"}, self.ninjs12_schema))
        self.assertIsNone(jsonschema.validate({"uri": "test1.3"}, self.ninjs13_schema))
        self.assertIsNone(jsonschema.validate({"uri": "test1.4"}, self.ninjs14_schema))
        self.assertIsNone(jsonschema.validate({"uri": "test2.0"}, self.ninjs20_schema))
        self.assertIsNone(jsonschema.validate({"uri": "test2.1"}, self.ninjs21_schema))
        self.assertIsNone(jsonschema.validate({"uri": "test-1.x-dev"}, self.ninjs1xdev_schema))
        self.assertIsNone(jsonschema.validate({"uri": "test-2.x-dev"}, self.ninjs2xdev_schema))

    def test_all_passing_unit_test_files_against_10_schema(self):
        """
        Run files in TEST_FILES_FOLDER/should_pass against the 1.0 schema.
        They should all pass (ie they are all valid against the schema).
        """
        self.folder_should_pass(
            schema=self.ninjs10_schema,
            folder_name=os.path.join('1.0', 'should_pass')
        )

    def test_failing_unit_test_files_against_10_schema(self):
        """
        Run files in TEST_FILES_FOLDER/should_fail against the 1.0 schema.
        They should all fail (ie they are all invalid in some way).
        """
        self.folder_should_fail(
            schema=self.ninjs10_schema,
            folder_name=os.path.join('1.0', 'should_fail')
        )

    def test_all_passing_unit_test_files_against_11_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.1/should_pass against the 1.1 schema.
        They should all pass (ie they are all valid against the schema).

        Also run 1.0/should_pass files against the 1.1 schema, because
        it should be backwards compatible.
        """
        self.folder_should_pass(
            schema=self.ninjs10_schema,
            folder_name=os.path.join('1.0', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs11_schema,
            folder_name=os.path.join('1.1', 'should_pass')
        )

    def test_failing_unit_test_files_against_11_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.1/should_fail against the 1.0 schema.
        They should all fail (ie they are all invalid in some way).

        We use "subTest" so we can see which file failed in test output.
        """
        self.folder_should_fail(
            schema=self.ninjs11_schema,
            folder_name=os.path.join('1.1', 'should_fail')
        )

    def test_all_passing_unit_test_files_against_12_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.2/should_pass against the 1.2 schema.
        They should all pass (ie they are all valid against the schema).

        Also run 1.0/should_pass and 1.1/should_pass files against the 1.2
        schema, because it should be backwards compatible.

        We use "subTest" so we can see which file failed in test output.
        """
        self.folder_should_pass(
            schema=self.ninjs12_schema,
            folder_name=os.path.join('1.0', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs12_schema,
            folder_name=os.path.join('1.1', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs12_schema,
            folder_name=os.path.join('1.2', 'should_pass')
        )

    def test_failing_unit_test_files_against_12_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.2/should_fail against the 1.2 schema.
        They should all fail (ie they are all invalid in some way).

        We use "subTest" so we can see which file failed in test output.
        """
        self.folder_should_fail(
            schema=self.ninjs12_schema,
            folder_name=os.path.join('1.2', 'should_fail')
        )

    def test_all_passing_unit_test_files_against_1_3_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.3/should_pass against the 1.3 schema.
        They should all pass (ie they are all valid against the schema).

        Also run 1.0, 1.1 and 1.2/should_pass against the 1.3
        schema, because it should be backwards compatible.

        We use "subTest" so we can see which file failed in test output.
        """
        self.folder_should_pass(
            schema=self.ninjs13_schema,
            folder_name=os.path.join('1.0', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs13_schema,
            folder_name=os.path.join('1.1', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs13_schema,
            folder_name=os.path.join('1.2', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs13_schema,
            folder_name=os.path.join('1.3', 'should_pass')
        )

    def test_failing_unit_test_files_against_1_3_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.3/should_fail against the 1.3 schema.
        They should all fail (ie they are all invalid in some way).

        We use "subTest" so we can see which file failed in test output.
        """
        self.folder_should_fail(
            schema=self.ninjs13_schema,
            folder_name=os.path.join('1.3', 'should_fail')
        )

    def test_all_passing_unit_test_files_against_1_4_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.3/should_pass against the 1.4 schema.
        They should all pass (ie they are all valid against the schema).

        Also run 1.0, 1.1, 1.2 and 1.3/should_pass against the 1.4
        schema, because it should be backwards compatible.
        """
        self.folder_should_pass(
            schema=self.ninjs14_schema,
            folder_name=os.path.join('1.0', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs14_schema,
            folder_name=os.path.join('1.1', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs14_schema,
            folder_name=os.path.join('1.2', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs14_schema,
            folder_name=os.path.join('1.3', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs14_schema,
            folder_name=os.path.join('1.4', 'should_pass')
        )

    def test_failing_unit_test_files_against_1_4_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.4/should_fail against the 1.4 schema.
        They should all fail (ie they are all invalid in some way).

        """
        self.folder_should_fail(
            schema=self.ninjs14_schema,
            folder_name=os.path.join('1.4', 'should_fail')
        )

    def test_1_x_example_files_against_latest_1_x_schema(self):
        """
        Run all files in EXAMPLE_FILES_FOLDER_1_x against the latest 1.x schema.
        They should all pass. (They will not all pass against old versions
        of the schema, as the examples use the latest features of ninjs)
        """
        self.folder_should_pass(
            schema=self.latest_1_x_schema,
            folder_name=EXAMPLE_FILES_FOLDER_1_x
        )

    def test_2_0_example_files_against_2_0_schema(self):
        """
        Run all files in EXAMPLE_FILES_FOLDER_2_x against the latest 2.x schema.
        They should all pass. (They will not all pass against old versions
        of the schema, as the examples use the latest features of ninjs)
        """
        self.folder_should_pass(
            schema=self.latest_2_x_schema,
            folder_name=EXAMPLE_FILES_FOLDER_2_x
        )

    def test_documentation_examples_against_latest_schema(self):
        """
        Run all files in DOCUMENTATION_EXAMPLES_FOLDER against the latest 2.x
        schema. They should all pass. (They will not all pass against old
        versions of the schema, as the examples use the latest features of
        ninjs)
        """
        self.folder_should_pass(
            schema=self.latest_2_x_schema,
            folder_name=DOCUMENTATION_EXAMPLES_FOLDER
        )

    def test_all_passing_unit_test_files_against_1_x_dev_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.x_dev/should_pass against the
        1.x dev schema.
        They should all pass (ie they are all valid against the schema).

        Also run 1.0, 1.1, 1.2, 1.3 and 1.4 tests against the dev 
        schema, because it should be backwards compatible.
        """
        self.folder_should_pass(
            schema=self.ninjs1xdev_schema,
            folder_name=os.path.join('1.0', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs1xdev_schema,
            folder_name=os.path.join('1.1', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs1xdev_schema,
            folder_name=os.path.join('1.2', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs1xdev_schema,
            folder_name=os.path.join('1.3', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs1xdev_schema,
            folder_name=os.path.join('1.4', 'should_pass')
        )
        self.folder_should_pass(
            schema=self.ninjs1xdev_schema,
            folder_name=os.path.join('1.x_dev', 'should_pass')
        )

    def test_failing_unit_test_files_against_1_x_dev_schema(self):
        """
        Run files in TEST_FILES_FOLDER/1.x_dev/should_fail against the
        1.x dev schema.
        They should all fail (ie they are all invalid in some way).

        We use "subTest" so we can see which file failed in test output.
        """
        self.folder_should_fail(
            schema=self.ninjs1xdev_schema,
            folder_name=os.path.join('1.x_dev', 'should_fail')
        )

    def test_all_passing_unit_test_files_against_2_x_dev_schema(self):
        """
        Run files in TEST_FILES_FOLDER/2.x_dev/should_pass against the
        2.x dev schema.
        They should all pass (ie they are all valid against the schema).

        We do *not* run 1.x tests against the 2.0 schema as it is
        NOT backwards compatible.
        """
        self.folder_should_pass(
            schema=self.ninjs2xdev_schema,
            folder_name=os.path.join('2.x_dev', 'should_pass')
        )

    def test_failing_unit_test_files_against_2_x_dev_schema(self):
        """
        Run files in TEST_FILES_FOLDER/2.x_dev/should_fail against the
        2.x dev schema.
        They should all fail (ie they are all invalid in some way).
        """
        self.folder_should_fail(
            schema=self.ninjs2xdev_schema,
            folder_name=os.path.join('2.x_dev', 'should_fail')
        )

    def test_passing_2_0_unit_tests_against_2_0_schema(self):
        """
        Run files in TEST_FILES_FOLDER/2.0/should_pass against the 2.0 schema.
        They should all pass (ie they are all valid against the schema).

        We do *not* run 1.x tests against the 2.0 schema as it is
        NOT backwards compatible.
        """
        self.folder_should_pass(
            schema=self.ninjs20_schema,
            folder_name=os.path.join('2.0', 'should_pass')
        )

    def test_failing_2_0_unit_tests_against_2_0_schema(self):
        """
        Run files in TEST_FILES_FOLDER/2.0/should_fail against the  2.0 schema.
        They should all fail (ie they are all invalid in some way).
        """
        self.folder_should_fail(
            schema=self.ninjs20_schema,
            folder_name=os.path.join('2.0', 'should_fail')
        )

    def test_passing_2_1_unit_tests_against_2_1_schema(self):
        """
        Run files in TEST_FILES_FOLDER/2.1/should_pass against the 2.1 schema.
        They should all pass (ie they are all valid against the schema).

        Also run 2.0/should_pass against the 2.1 schema, because it should be
        backwards compatible to 2.0.
        """
        self.folder_should_pass(
            schema=self.ninjs21_schema,
            folder_name=os.path.join('2.1', 'should_pass'),
        )
        self.folder_should_pass(
            schema=self.ninjs21_schema,
            folder_name=os.path.join('2.0', 'should_pass')
        )


    def test_failing_2_1_unit_tests_against_2_1_schema(self):
        """
        Run files in TEST_FILES_FOLDER/2.1/should_fail against the 2.1 schema.
        They should all fail (ie they are all invalid in some way).
        """
        self.folder_should_fail(
            schema=self.ninjs21_schema,
            folder_name=os.path.join('2.1', 'should_fail')
        )



if __name__ == '__main__':
    unittest.main()
