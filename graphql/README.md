# Example of using GraphQL with some sample ninjs objects

This is not a complete solution for setting up a GraphQL server to serve ninjs
content, but it is a test to show how you can use GraphQL to filter and adjust
the ninjs data returned.

A more realistic setup would need to add support to connect to the database
where the ninjs objects are stored.

## Starting the server

1) Clone or copy this repo to your local machine.
2) Open a terminal window and move to the `tools/graphql-ninjs` folder.
3) Run `npm install`
4) Type `npm run dev`
5) and you should see this line: "Running GraphQL on localhost:4001/graphql"

## Open GraphQL testscreen

1) Open a browser
2) Go to http://localhost:4001/graphql
3) If it all worked you should see a testing interface for graphQL

## Testing graphQL
1) Start by entering this simple query:
    ```
    {
      ninjs {
        uri
      }
    }
    ```
    and press the round RUN button with the arrow. You should see a list of URIs
    from ninjs news items.
2) Try to add other properties to your query. The screen has some intellisense
    and uses the schema to show possible choices as you type.
3) Try adding more properties to your search:
    ```
    {
      ninjs {
        uri
        pubStatus
        language
        headlines {
          value
        }
      }
    }
    ```
    Press the 'run' button, and the results will show these four properties for
    each ninjs item.

4) If you want to filter the result you can add that in parentheses after `ninjs`.
    For example, the following query:

    ```
    {
      ninjs (pubStatus: "usable", language: "sv") {
        uri
        pubStatus
        language
        headlines {
          value
        }
      }
    }
    ```

    will only show the usable items in Swedish.

The samples in the data.json come from TT, NTB, DPA and AP. They have been adapted to fit the ninjs 3.0 schema. 

_Johan Lindgren, October 2024_
