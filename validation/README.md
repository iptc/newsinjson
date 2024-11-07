# Validation

ninjs documents can be validated using [JSON Schema](http://json-schema.org).

The IPTC maintains a schema for each release of the ninjs standard. IPTC ninjs
schemas can be found [here](http://www.iptc.org/std/ninjs/).

The most recent ninjs specification files areavailable at
http://www.iptc.org/std/ninjs/ninjs-schema_1.5.json
http://www.iptc.org/std/ninjs/ninjs-schema_2.1.json
http://www.iptc.org/std/ninjs/ninjs-schema_3.0.json

# Test Suite

The `validation/test_suite` folder contains basic test documents that exercise
the capabilities of ninjs, and ensure that the schema correctly validates the
properties defined in ninjs. Mainly useful during development of the schemas.

## Running the test suite

* Install Python 3
* From a command line, run

    $ pip3 install jsonschema
    $ validation/python/runtests.py

This will run each of the files in the test suite against the ninjs 1.x, 2.x
and 3.x schemas.

# JavaScript validator (using ajv)

The script at `validation/javascript.sh` runs the same tests using the
JavaScript `ajv` validator.

## Running the JavaScript test suite

* Install npm
* From a command line, run
    $ npm i
    $ cd validation/
    $ npm run test

# License

Source code is published under the Creative Commons Attribution 4.0 license -
see the full license agreement at http://creativecommons.org/licenses/by/4.0/.
