# Schema decision records

This folder records each amendment to the ninjs schema. Each record states
the problem, the options that the working group considered, and the reasons
for the choice. Future working group members use these records to learn why
the schema has its current shape.

## When to write a record

Write a record in the same pull request as the change when the change does
one of these things:

- It adds, removes or renames a property.
- It changes the type, the cardinality or the constraints of a property.
- It makes ninjs different from NewsML-G2 or from another IPTC standard.
- It changes how the working group edits, tests or releases the schema.

A typographical fix or a change to a description only does not need a record.

## Files

Name each file `NNNN-short-title.md`. `NNNN` is the next free number, with
leading zeros. Do not reuse a number. Do not delete a record. When a later
decision replaces a record, set the old status to `Superseded by NNNN`.

To see all records, list this folder. This folder has no index file, so
records from parallel pull requests do not conflict.

The folder shows only merged records. Before you choose a number, also
check the open pull requests for numbers that they use. If two pull
requests use the same number, the second pull request to merge takes the
next free number.

## Status

- **Proposed**: a pull request contains the change. The IPTC Standards
  Committee has not decided.
- **Accepted**: the committee approved the change. Record the release that
  contains it.
- **Rejected**: the committee did not approve the change. Keep the record.
  Then the group does not repeat the discussion without new information.
- **Superseded by NNNN**: a later record replaces this record.

When the committee decides, update the status and complete the
"Committee outcome" section. Link to the minutes.

## Template

```markdown
# NNNN. Title

- Status: Proposed
- Date: YYYY-MM-DD
- Pull request: #NNN
- Branches: 1.x, 2.x, 3.x

## Context

The problem. Why the current schema cannot solve it.

## Options considered

### Option 1: ...

What it is. The advantages. The disadvantages.

### Option 2: ...

## Decision

The option that the pull request implements, and why.

## Consequences

What changes for providers, for consumers and for the schema.

## Open questions

The questions that the committee must answer.

## Committee outcome

Date, decision, link to the minutes, release.
```
