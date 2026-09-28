# 0004. Add aiInfo and aiInfoRef to describe AI-generated content

- Status: Proposed
- Date: 2026-09-18
- Pull request: #251
- Branches: 1.x, 2.x, 3.x
- Related: NewsML-G2 change request CR00222 (in review), NewsML-G2 issue 143

## Context

Providers must state which artificial intelligence created or enhanced the
content of a news object, and which part of the content it created.

NewsML-G2 CR00222 proposes `AiInfoType`. It describes the system, its
provider, the prompt and the prompt writer. G2 links content to an `aiInfo`
entry through a hop action: `action/@idrefs` names `aiInfo/@id`.

ninjs has no hop history and no action element. It cannot copy the G2 link.
This record has three decisions, because the change has three independent
choices.

## Decision A: The direction of the link

### Option A1: Item level only

Add `aiInfo` to the news object and no reference. This is about 120 schema
lines. But it cannot describe mixed provenance. An item has a body that a
journalist wrote, and a summary and subject tags that a model produced. An
item-level statement overstates the AI involvement in the body.

### Option A2: Link from the content to the aiInfo entry

Add `aiInfoRef` to each object that can hold generated content. The value is
the name of an `aiInfo` entry.

### Option A3: Link from the aiInfo entry to the content

This is the G2 direction. But most ninjs content objects have no identifier
to point at.

### Choice A

Option A2. The mixed provenance case is the main reason for the change.

This choice answers a question that G2 has not answered.

## Decision B: The key of an aiInfo entry

### Option B1: id

This matches `aiInfo/@id` in G2. But `id` appears once in ninjs, on a 3.x
event, and not at all in 1.x or 2.x.

### Option B2: name

ninjs already uses `name` as the identifier of an addressable object. `name`
is required on a rendition in 2.x and 3.x. In 1.x the rendition name is the
object key.

### Choice B

Option B2. `name` is required on each entry.

## Decision C: The shape of promptInfo

### Option C1: A string

This matches CR00222, which uses one `IntlStringType2`. The CR examples put
structure inside the text, for example `Positive: ... Negative: ...`.

### Option C2: An object with value, uri and version

A prompt from a prompt library carries its own `uri` and `version`.

### Option C3: An array of prompt objects

This lists each prompt that built the content. But `promptInfo` describes
the overall request to the system. It is not a breakdown of each prompt.

### Choice C

Option C2. Two versioned prompts cannot share one string and one version
number.

## Shape

- Every member except `name` is optional. This matches the 0..1
  cardinality of each member of `AiInfoType`.
- `system`, `provider` and `promptWriter` use the ninjs concept shape of
  `name`, `uri` and `literal`, like `genres` and `infoSources`.
- `role` is an open string, like every other role in ninjs.
- Each description states its `nar:` mapping.
- This record uses the 3.x names. 1.x and 2.x use lowercase names, for
  example `aiinfo`, `aiinforef`, `promptinfo` and `promptwriter`.

## Consequences

- 1.x cannot state which part of the content an AI created. Every content
  property in 1.x is a plain string or a `patternProperties` key. A 1.x
  provider states `aiInfoRef` on the news object only.
- In 2.x, `by`, `slugline`, `ednote` and `title` are plain strings. In 3.x,
  `by`, `slugline`, `edNote` and `title` are plain strings. They cannot carry
  `aiInfoRef` either.
- JSON Schema cannot check that an `aiInfoRef` value names an existing
  entry. The provider must check it.
- ninjs is different from G2 in the link direction and in the shape of
  `promptInfo`. A NewsML-G2 converter must map both.

## Open questions

1. Does ninjs lead G2 on the direction of the link?
2. Does the NAR working group accept `promptInfo` as an object?
3. How does `aiInfo` relate to `digitalSourceType`? Must the two agree?
4. Must the AI system also appear in `infoSources`?
5. Is a named person appropriate as `promptWriter`?
6. `AiInfoType` allows `##other`. Does `aiInfo` need an extension point like
   the one in [0003](0003-rendition-extensions.md)?

## Committee outcome

Not yet decided.
