
var express = require("express");
var gqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`

    type NINJS {
        uri: String!
        type: String
        charcount: Int
        wordcount: Int
        mimetype: String
        representationtype: String
        profile: String
        firstcreated: String
        versioncreated: String
        pubstatus: String
        copyrightholder: String
        language: String
        urgency: Int
        ednote: String
        headline: String
        description_text: String
        description_usage: String
        body_text: String
        subject: [Subject]
        place: [Place]
        slugline: String
      }
    
      type Subject {
        code: String
        name: String
        rel: String
        scheme: String
      }
    
      type Place {
        code: String
        name: String
        rel: String
        scheme: String
        geometry_geojson: Geo
      }

      type Geo {
          coordinates: [Float]
          type: String
      }

      type Query {
        ninjs(uri: String, 
            urgency: Int, 
            pubstatus: String,
            language: String,
            startAfter: String,
            startBefore: String,
            copyrightholder: String,
            filter: String): [NINJS]
    }
`);

const items = require("./data.json")

var getItems = function(args) {
    svaret = items
    if (args.uri) {
        var uri = args.uri;
        svaret = svaret.filter(item => item.uri === uri);
    } else { 
        if (args.urgency) {
            var urg = args.urgency;
            svaret = svaret.filter(item => item.urgency === urg);
        } 
        if (args.pubstatus) {
            var ps = args.pubstatus;
            svaret = svaret.filter(item => item.pubstatus === ps);
        } 
        if (args.language) {
            var lang = args.language;
            svaret = svaret.filter(item => item.language === lang);
        } 
        if (args.copyrightholder) {
            var cp = args.copyrightholder;
            svaret = svaret.filter(item => item.copyrightholder === cp);
        } 
        if (args.startAfter) {
            var sa = args.startAfter;
            svaret = svaret.filter(item => item.versioncreated >= sa);
        } 
        if (args.startBefore) {
            var sb = args.startBefore;
            svaret = svaret.filter(item => item.versioncreated <= sb);
        } 
        if (args.filter) {
            var word = args.filter;
            svaret = svaret.filter(item => (item.headline.indexOf(word) !== -1) || (item.body_text.indexOf(word) !== -1));
        } 
    }
    return svaret
};

var root = {
    ninjs: getItems
};

var app = express();

app.use(
  "/graphql",
  gqlHTTP({ schema: schema, rootValue: root, graphiql: true })
);

app.listen(4001);

console.log("Running GraphQL on localhost:4001/graphql");
