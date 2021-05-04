= Protocol Buffers and ninjs

For ninjs 2.0, we have converted the schema so that it can easily be used with
Protocol Buffers (also known as "protobufs").

Specifically, protobufs can't cope with wildcards in property names, so we have
changed the "patternProperties" fields in the JSON Schema to have fixed names.

Protocol Buffers was developed by Google as a "language-neutral, platform-
neutral, extensible mechanism for serializing structured data – think XML, but
smaller, faster, and simpler."

For more information on Protocol Buffers, see Google's documentation at
https://developers.google.com/protocol-buffers

== Generating a protobuf schema from ninjs JSON Schema

We generate a Protocol Buffers schema from the ninjs JSON Schema using 
https://github.com/Army-U/jsonschema-protobuf/ (which is a patched version of
https://www.npmjs.com/package/jsonschema-protobuf)

`jsonschema-protobuf specification/ninjs-schema_dev_2.0.json >protobufs/ninjs20-dev.proto`

The jsonschema-protobuf tool doesn't yet support enum fields so we have to add
them manually. The version of ninjs20-dev.proto in this repository has enums
added. We also manually change the version to "proto2" so we can use `required`
fields.

== Generating code from the protobuf schema

If you install the 
https://github.com/protocolbuffers/protobuf/releases/[Google protobuf compiler],
you can create a code library in many languages.

For example, we create a Python library with:

`$PATH_TO_PROTOBUF/bin/protoc --python_out=. ninjs20-dev.proto`

This generates the file `ninjs20_dev_pb2.py` which can be included in Python
scripts with `import ninjs20_dev_pb2`. (Note that the name must end with `_pb2`,
even if the schema uses proto3, or the tool won't work)

== Using the generated code

We have included a simple example, `python-proto-example.py` which demonstrates
use of the generated code to create and serialise a simple ninjs story in
Protocol Buffers.
