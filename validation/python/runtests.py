#!/usr/bin/env python3

# -*- coding: utf-8 -*-

# Copyright (c) 2018 International Press Telecommunications Council (IPTC)
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
EXAMPLE_FILES_FOLDER = os.path.join('..', '..', 'examples')

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
        ninjs12_schema_filename = os.path.join(
            self.current_path,
            '..',
            '..',
            'specification',
            'ninjs-schema_1.2.json'
        )
        ninjs11_schema_filename = os.path.join(
            self.current_path,
            '..',
            '..',
            'specification',
            'ninjs-schema_1.1.json'
        )
        with open(ninjs12_schema_filename) as schemafile:
            self.ninjs12_schema = json.load(schemafile)
        with open(ninjs11_schema_filename) as schemafile:
            self.ninjs11_schema = json.load(schemafile)
        return super(TestNinJSSchema, self).__init__(*args, **kwargs)

    def test_simplest_instance_ninjs11(self):
        """
        jsonschema.validate returns None if valid, raises an exception for
        schema validation errors. So we use assertIsNone.
        """
        self.assertIsNone(jsonschema.validate({"uri": "test11"}, self.ninjs11_schema))

    def test_simplest_instance_ninjs12(self):
        """
        jsonschema.validate returns None if valid, raises an exception for
        schema validation errors. So we use assertIsNone.
        """
        self.assertIsNone(jsonschema.validate({"uri": "test12"}, self.ninjs12_schema))

    def get_files_in_folder(self, folder_name):
        folder_name = os.path.join(
                        self.current_path,
                        folder_name
                    )
        return [os.path.join(folder_name, file) for file in os.listdir(folder_name) if file.endswith('.json')]

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


    def test_all_passing_unit_test_files_against_strict_schema(self):
        """
        Run all files in TEST_FILES_FOLDER/should_pass against the schema.
        They should all pass (ie they are all valid against the schema).

        We use "subTest" so we can see which file failed in test output.
        """
        self.folder_should_pass(
            schema=self.ninjs12_schema,
            folder_name='should_pass'
        )
        self.folder_should_pass(
            schema=self.ninjs11_schema,
            folder_name='should_pass'
        )

    def test_failing_unit_test_files_against_strict_schema(self):
        """
        Run all files in TEST_FILES_FOLDER/should_fail against the schema.
        They should all fail (ie they are all invalid in some way).

        We use "subTest" so we can see which file failed in test output.
        """
        self.folder_should_fail(
            schema=self.ninjs12_schema,
            folder_name='should_fail'
        )
        self.folder_should_fail(
            schema=self.ninjs11_schema,
            folder_name='should_fail'
        )

if __name__ == '__main__':
    unittest.main()
