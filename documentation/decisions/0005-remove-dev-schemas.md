# 0005. Remove the dev schemas

- Status: Accepted
- Date: 2026-10-26
- Pull request: #253
- Branches: 1.x, 2.x, 3.x

## Context

The `specification` folder contains dev schemas, for example
`ninjs-schema-dev_0.3_v3.json`. The working group uses them to test possible
additions to future versions of ninjs.

Record 0001 adds one working draft per major version. Option 3 of record 0001
also keeps a copy of each change in the dev schemas. A candidate change then
goes into two files for each branch.

This duplication has three problems:

- A contributor edits six files for one change: two files on each of three
  branches.
- The dev schemas carry experimental properties, for example `advice`. No
  candidate pull request proposes these properties.
- A negative test in `validation/test_suite/<major>/should_fail` must also
  fail against the dev schema. A dev-only property can make it pass.

The folder holds 13 dev schemas. Before this change, `runtests.py` tests the
three unversioned files. `javascript.sh` tests `ninjs-schema-dev_0.1_v2.1.json`
and `ninjs-schema-dev_0.2_v1.5.json`. The README links to
`ninjs-schema-dev_0.1_v2.0.json` and `ninjs-schema-dev_0.2_v1.4.json`.

This record amends option 3 of record 0001. Contributors no longer copy
changes to the dev schemas.

## Options considered

### Option 1: Keep the dev schemas beside the working drafts

The group keeps a place for experiments. But the duplication stays.

### Option 2: Remove the dev schemas and their tests

The working draft is the only place for a candidate change. An experiment
becomes a candidate pull request against the working draft.

## Decision

Option 2. The working draft does the job of the dev schema. A candidate pull
request shows the full change, and the committee decides on each change.

The change removes these files:

- all `specification/ninjs-schema-dev_*.json` files
- the `validation/test_suite/1.x_dev`, `2.x_dev` and `3.x_dev` folders
- the dev schema tests in `validation/python/runtests.py` and
  `validation/javascript.sh`
- the "Dev schema" section of `README.md`

## Consequences

- A contributor edits one working draft for each affected branch.
- The experimental properties of the dev schemas leave the repository. Git
  history keeps them. A contributor who wants one proposes it against the
  working draft, with a record.
- The URLs under `http://www.iptc.org/std-dev/ninjs/` stop working when the
  IPTC removes the files from the web site.

## Open questions

1. Does the IPTC remove the dev schemas from `www.iptc.org/std-dev/ninjs/`?
2. Does the committee want to propose any of the experimental properties,
   for example `advice`, as a candidate change?

## Committee outcome

- Date: 2026-10-26
- Decision: Accepted. The committee approved the removal of the dev
  schemas.
