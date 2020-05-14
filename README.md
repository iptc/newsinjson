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
by Business Wire. Examples show how NewsML 1.3 files convert to their
equivalents in ninjs.

Unit tests
----------

To run unit tests in the `validation/test_suite` folder against each
of the ninjs 1.0, 1.1, 1.2 and 1.3 schemas, run the following tool in a
command/terminal window:

    validation/python/runtests.py 
