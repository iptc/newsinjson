# 0002. Add contentDigitised to record when content was digitised

- Status: Proposed
- Date: 2026-09-18
- Pull request: #249
- Branches: 1.x, 2.x, 3.x

## Context

ninjs records when content was made (`contentCreated`) and when the news
object was first created or changed (`firstCreated`, `versionCreated`). It
cannot record when analogue content became digital.

A scanned photograph from the 1940s has two dates: the 1940s, when the
photographer took it, and the recent date of the scan. Archives and picture
libraries need both dates. Today a provider must either put the scan date in
`contentCreated`, which is wrong, or leave it out.

## Options considered

### Option 1: Put the digitisation date in contentCreated

This needs no schema change. But `contentCreated` then has two meanings, and
a consumer cannot tell which meaning a value has.

### Option 2: Add a date-time property contentDigitised

This matches the shape of `contentCreated`. The change is additive and
optional, so every valid document stays valid.

### Option 3: Add a property that accepts a date or a date-time

A digitisation date is often known only to the year or to the day. A
`date-time` value cannot express this. But every date property in ninjs has
the same limitation. A fix for one property only makes the standard
inconsistent.

## Decision

Option 2. The property is an optional string with `format: date-time`.

The name follows the case of each branch. 1.x and 2.x use `contentdigitised`,
which matches `contentcreated`. 3.x uses `contentDigitised`, which matches
`contentCreated`.

## Consequences

- A provider can state the scan date without a change to the meaning of
  `contentCreated`.
- The property inherits the precision limitation of all ninjs dates.
- The negative test uses an object, not a malformed date string. The
  `jsonschema` library checks `format` only when the caller gives it a
  format checker. A malformed date string passes silently without it.
- Documentation, examples and the NewsML-G2 mapping change at ratification.

## Open questions

1. Does the committee want a date-or-date-time type across the whole
   standard? That is a separate decision with its own record.

## Committee outcome

Not yet decided.
