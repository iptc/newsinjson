[![IPTC](https://circleci.com/gh/iptc/newsinjson.svg?style=svg)](https://app.circleci.com/pipelines/github/iptc/newsinjson)

ninjs - News in JSON
====================

ninjs is [http://www.iptc.org/](IPTC)'s standard for describing news
content in JSON format.

The ninjs JSON Schema is available in this repository and at
http://www.iptc.org/std/ninjs/ninjs-schema_2.0.json

More extensive documentation, created from the source files in the
documentation folder in this repository, can be found at
https://www.iptc.org/std/ninjs/userguide/

Examples
--------

The `examples` folder contains example files, including some supplied
by Business Wire. Examples show how NewsML 1.2 files convert to their
equivalents in ninjs.

Two versions of ninjs: ninjs 1.4 and ninjs 2.0
-------------------------

This repository specifies both the 1.4 and 2.0 versions of ninjs.

The 1.x series adds new features to the version of ninjs that started
with ninjs 1.0 back in 2013, in a way that is fully backwards
compatible. The latest release in this series is 1.4, which includes
new fields _contentcreated_, _expires_ and _rightsinfo_. The 1.4
version of ninjs was approved by the IPTC Standards Committee on May
18th, 2022.

The 2.x series fixes some issues that made the 1.x series tricky for
developers to work with. The main change is that we avoid the use of
patternProperties, so all properties now have well-defined names. This
work is intended to make ninjs easier for work with binary protocols
such as Protocol Buffers and Avro. We also took the opportunity to make
property names more consistent with NewsML-G2 and to add some fields to
handle rights.

We wanted to issue a new release which fixed these problems, but this
meant breaking backwards-compatibility with the 1.x versions of ninjs.
This is why we increased the major version number to 2.0.

The 2.0 version of ninjs was approved by the IPTC Standards Committee on
October 20th, 2021.

An errata update was made in May 2022 to fix a problem with the way GeoJSON
properties were integrated into the "places" object.

Which version should I choose for my project?
-------------------------

If you are starting a green-field project, we recommend using ninjs 2.0.
This version should be easiest for developers to work with.

If you are already using a 1.x version of ninjs, we recommend at least
upgrading to version 1.4. This should be an easy change as 1.4 is
backwards-compatible with versions 1.0, 1.1, 1.2 and 1.3.

Protocol Buffers demo
---------------------

In the [protobufs](/protobufs) folder we have included a demonstration
Protocol Buffers schema based on ninjs 2.0.

We also show how a code library can be automatically generated from
the protobufs schema and we include an example Python script showing
how a ninjs Protobufs document can be written and read via code.

See [the protobufs README](/protobufs/README.md) for details.

Unit tests
----------

To run unit tests in the `validation/test_suite` folder against each
of the ninjs 1.0, 1.1, 1.2, 1.3 and 2.0 schemas, run the following
tool in a command/terminal window:

    pip install -r validation/python/requirements.txt
    validation/python/runtests.py 

We automatically run unit tests on every commit using CircleCI. The
badge above the title on this page indicates the current status of the
unit tests.

Dev schema
----------

A "development" version of the 1.3 schema is available in the `specification`
folder and at 
http://www.iptc.org/std-dev/ninjs/ninjs-schema-dev_0.2_v1.3.json

The dev schema is used to test possible additions to future versions of ninjs.
It is not guaranteed to be maintained and is subject to change at any time.
Please do not create production projects based on this schema.

ninjs Generator
---------------

In the `generator` folder is the source code to the ninjs generator, a
user-facing tool to generate sample ninjs files of either 1.3 or 2.0 version,  which is hosted at
https://www.iptc.org/std/ninjs/generator/. 
