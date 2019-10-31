# Example of using graphQL with some sample ninjs objects

This is not a complete solution for setting up a graphQL server to serve ninjs content. But it is a test to show how you can use graphQL to filter and adjust the ninjs-data returned.
In a more realistic setup you would need to add support to connect to the database where the ninjs objects are stored.

## Starting the server
1) Clone or copy this repo to your local machine.
2) Open a terminal window and move to the tools/graphql-ninjs folder.
3) Run npm install
4) Type npm run dev 
5) and you should get this line: "Running GraphQL on localhost:4001/graphql"


##Open graphQL testscreen
1) Open a browser
2) Go to http://localhost:4001/graphql
3) If it all worked you should see a testing interface for graphQL

##Testing graphQL
1) Start with {ninjs {uri}} and press the round RUN-button with the arrow. You should see a list of uri's from ninjs-items.
2) You can try to add other properties. The screen has some intellisense and uses the schema to show possible choises as you type.
3) Add more properties to your search:
{ninjs {
  uri
  pubstatus
  language
  headline
}
}
Will show these four properties for each ninjs item.

4) If you want to filter the result you can add that in parenteses after ninjs:
{ninjs (pubstatus: "usable", language: "sv") {
  uri
  pubstatus
  language
  headline
}
}
Will only show the usable items that is in Swedish.









Johan Lindgren October 2019

