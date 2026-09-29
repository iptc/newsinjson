# 0002. Add contentDigitised to record when content was digitised

- Status: Proposed
- Date: 2026-09-18
- Pull request: #249
- Issue: #246
- Branches: 1.x, 2.x, 3.x

## Context

ninjs records when content was made (`contentCreated`) and when the news
object was first created or changed (`firstCreated`, `versionCreated`). It
cannot record when analogue content became digital.

A scanned photograph from the 1940s has two dates. The first date is in the
1940s, when the photographer took it. The second date is the recent date of
the scan. Archives and picture libraries need both dates.

Today a provider must put the scan date in `contentCreated`, or leave it out.
The scan date in `contentCreated` is wrong.

### Origin

The working group found the gap in January 2026. It mapped the IPTC Video
Metadata Hub to ninjs and found no target for a digitisation date. Issue #246
records the gap for still and video archive content.

The IPTC Photo Metadata Standard has the same gap. Version 2025.1 defines
"Date Created" as the date when the content of the image was made. The
definition states that this is "rather than the date of the creation of the
digital representation". The standard defines no property for the digital
representation.

Video Metadata Hub issue
[#73](https://github.com/iptc/video-metadata-hub/issues/73) raises the same
gap. It asks if a digitisation date belongs in a future release. The issue is
still open.

ninjs therefore has no existing IPTC property to copy. This record chooses a
name and a type that the other IPTC standards can align with later.

## Options considered

### Option 1: Put the digitisation date in contentCreated

This needs no schema change. But `contentCreated` then has two meanings. A
consumer cannot tell which meaning a value has. The Photo Metadata Standard
also excludes the digitisation date from "Date Created" explicitly.

### Option 2: Add a date-time property contentDigitised

This matches the shape of `contentCreated`. The change is additive and
optional, so every valid document stays valid.

### Option 3: Add a property that accepts a truncated date-time

The 3.x branch already defines `truncatedDateTimeType`. It accepts a year, a
year and month, a date, or a full date-time. The 1.x and 2.x branches have no
such type.

The 3.x branch uses this type for event dates that are in the future:
`expectedStartDate`, `expectedEndDate` and `recurrenceDates`. A planner often
does not know the exact day or time of a future event.

A scan date is different. The scan occurs at a known time. The scanner or the
archive workflow usually records the full date and time. The working group
does not think that this property needs the flexibility of a truncated value.

A truncated `contentDigitised` beside a full `contentCreated` also makes the
pair inconsistent. The two dates of one object then have different precision
rules. The 1.x and 2.x branches also need a new type.

## Names considered

### contentDigitised

The name uses the `content` prefix of `contentCreated`. The two properties
then sort together. One property states when the content was made. The other
property states when the content became digital.

### dateDigitised

The name follows the Photo Metadata Standard, which puts `Date` first, as in
"Date Created". A future photo or video metadata property "Date Digitised"
maps to it by name.

But no date-time property of the news object starts with `date`. The name
breaks the `contentCreated`, `firstCreated`, `versionCreated` pattern, where
the event comes last.

The name also suggests a date without a time. A provider can then think that
ninjs does not accept a time. A consumer can then drop the time part of a
value. The property holds a date-time value, as `contentCreated` does.

## Decision

Option 2, with the name `contentDigitised`. The property is an optional
string with `format: date-time`.

The type matches `contentCreated`. The working group considered the truncated
date-time of option 3. It chose consistency with `contentCreated`, because a
scan date is usually known in full.

The working group prefers consistency inside ninjs to alignment of the name
with the Photo Metadata Standard. The NewsML-G2 mapping and a future photo or
video metadata mapping can connect the names.

The name follows the case of each branch. 1.x and 2.x use `contentdigitised`,
which matches `contentcreated`. 3.x uses `contentDigitised`, which matches
`contentCreated`.

## Consequences

- A provider can state the scan date without a change to the meaning of
  `contentCreated`.
- A mapping from a future Photo Metadata or Video Metadata Hub property
  "Date Digitised" needs a rename. The name does not match by default.
- The property cannot hold a date that is known only to the year or to the
  day. `contentCreated` has the same limitation.
- The negative test uses an object, not a malformed date string. The
  `jsonschema` library checks `format` only when the caller gives it a
  format checker. A malformed date string passes silently without it.
- Documentation, examples and the NewsML-G2 mapping change at ratification.

## Open questions

1. If the Photo Metadata Working Group adds a digitisation date, does it
   use the same definition? The two standards must agree on the meaning,
   even with different names.

## Committee outcome

Not yet decided.
