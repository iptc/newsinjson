# 0001. Edit candidate changes in one working draft per major version

- Status: Proposed
- Date: 2026-09-16
- Pull request: #248
- Branches: 1.x, 2.x, 3.x

## Context

Before this change, a contributor started a new minor version by copying the
latest approved schema to a new file, for example `ninjs-schema_3.3.json`. The
contributor then edited the copy.

This process has two problems:

- A reviewer sees a new file of more than 1,000 lines. The actual change is
  hidden inside it.
- The version number exists before the IPTC Standards Committee approves any
  change. If the committee accepts only some of the changes, the file contains
  changes that the release must not include.

## Options considered

### Option 1: Copy to a new minor version file for each candidate

This is the previous process. It is familiar to the group. The disadvantages
are the two problems above.

### Option 2: A long-lived Git branch for each minor version

Examples are the `3.2-base` and `3.3-base` branches. The diff is readable.
But candidate changes on one branch depend on each other. The committee
cannot easily accept one change and reject another.

### Option 3: One working draft file per major version

Copy the latest approved schema of each branch to `ninjs-schema_1.json`,
`ninjs-schema_2.json` and `ninjs-schema_3.json`. Do the same for the
development schemas. Each candidate change is a separate pull request against
these files. Cut a numbered minor version only at ratification, and only with
the accepted changes.

## Decision

Option 3. Each pull request shows only its change. Candidate pull requests
are siblings, not a stack, so the committee can accept any combination.

The approved numbered files stay in place and stay unchanged. Each working
draft differs from its source only in `$id` and `title`.

## Consequences

- A contributor adds a candidate change to the working draft of each branch
  that the change affects.
- A contributor adds positive test files to
  `validation/test_suite/<major>/should_pass` and negative test files to
  `validation/test_suite/<major>/should_fail`. The test code needs no change.
- Each working draft must accept every approved `should_pass` file of its
  branch. This proves that a candidate change stays backward compatible.
- `latest_1_x_schema`, `latest_2_x_schema` and `latest_3_x_schema` in
  `validation/python/runtests.py` point at the working drafts, not at the
  latest approved release.
- At ratification, a maintainer copies the working draft to a numbered file,
  sets `$id` and `title`, and updates the documentation and the examples.

## Open questions

1. Does the committee accept this process for future minor versions?
2. Who cuts the numbered file at ratification?

## Committee outcome

Not yet decided.
