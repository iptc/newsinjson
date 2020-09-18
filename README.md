[![IPTC](https://circleci.com/gh/iptc/newsinjson.svg?style=svg)](https://app.circleci.com/pipelines/github/iptc/newsinjson)

ninjs - News in JSON
====================

ninjs is [http://www.iptc.org/](IPTC)'s standard for describing news
content in JSON format.

The ninjs JSON Schema is available in this repository and at
http://www.iptc.org/std/ninjs/ninjs-schema_1.3.json

More extensive documentation, created from the source files in the
documentation folder in this repository, can be found at
https://www.iptc.org/std/ninjs/userguide/

Examples
--------

The `examples` folder contains example files, including some supplied
by Business Wire. Examples show how NewsML 1.2 files convert to their
equivalents in ninjs.

Unit tests
----------

To run unit tests in the `validation/test_suite` folder against each
of the ninjs 1.0, 1.1, 1.2 and 1.3 schemas, run the following tool in a
command/terminal window:

    validation/python/runtests.py 

We automatically run unit tests on every commit using CircleCI. The badge above the title on this page indicates the current status of the unit tests.

Dev schema
----------

A "development" version of the schema is available in the `specification`
folder and at 
http://www.iptc.org/std-dev/ninjs/ninjs-schema-dev_0.2_v1.3.json

The dev schema is used to test possible additions to future versions of ninjs.
It is not guaranteed to be maintained and is subject to change at any time.
Please do not create production projects based on this schema.

ninjs Generator
---------------

In the `generator` folder is the source code to the ninjs generator, a
user-facing tool to generate sample ninjs files,  which is hosted at
https://www.iptc.org/std/ninjs/generator/. 
