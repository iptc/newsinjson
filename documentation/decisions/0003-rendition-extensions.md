# 0003. Add an extensions property to the rendition object

- Status: Proposed
- Date: 2026-09-18
- Pull request: #250
- Branches: 1.x, 2.x, 3.x

## Context

A provider sometimes needs to carry data about one rendition that ninjs does
not define. Examples are a mirror URL or a checksum.

The rendition object sets `additionalProperties` to `false` in every branch.
A provider cannot add such data today.

The Guidelines already describe one extension mechanism:

1. Copy the schema.
2. Change its `id`.
3. Add typed properties.
4. Publish the result.

`examples/2.3/schema-extension/` demonstrates it.

## Options considered

### Option 1: Use the existing schema extension mechanism

This needs no schema change. The provider gets typed properties. But the
provider must mint and publish a new schema id. This is disproportionate for
one mirror URL on one rendition.

### Option 2: Set additionalProperties to true on the rendition

This is the smallest change. But ninjs then cannot detect a misspelt
property name on a rendition. Provider data also mixes with standard data.

### Option 3: Add an extensions object with string values

A provider puts its own keys inside one named object. Standard properties
stay closed. The shape maps to a string map in Protocol Buffers and Avro.

### Option 4: Option 3, with keys that must have a namespace prefix

A `propertyNames` pattern can enforce a prefix such as `mirror:eu`. ninjs 1.x
uses a comparable pattern for `description_`, `body_` and `headline_`. But
2.x and 3.x removed pattern-based names on purpose, because binary protocol
tooling needs well-known names. See "patternProperties vs arrays" in the
Guidelines.

### Option 5: Option 3, with values of any JSON type

A provider can carry structured data. But no other ninjs property carries
open structured provider data, and binary protocols need a fixed type.

## Decision

Option 3:

```json
"extensions": {
  "type": "object",
  "additionalProperties": { "type": "string" }
}
```

The description says that keys SHOULD have a namespace prefix. The schema
does not enforce it.

In 3.x the property sits on `$defs/renditionType`, so it reaches every use of
a rendition. In 2.x there is one inline declaration. In 1.x the property sits
inside the `patternProperties` rendition object.

## Consequences

- ninjs has two extension mechanisms. The Guidelines must say when to use
  each mechanism.
- Two providers can use the same key with different meanings.
- A provider that needs structured data must encode it in a string or
  publish a profile schema.
- In 1.x a rendition named `extensions` can also carry an `extensions`
  property. This produces `renditions.extensions.extensions`. It is legal and
  harmless.

## Open questions

1. Can the two extension mechanisms coexist? If yes, which one applies when?
2. Must the schema enforce the namespace prefix?
3. Are string values sufficient?

## Committee outcome

Not yet decided.
