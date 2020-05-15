
var express = require("express");
var gqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var _ = require("lodash");

//This schema is according to the NINJS 1.3 schema

var schema = buildSchema(`

    type NINJS {
        uri: String!
        type: String
        mimetype: String
        representationtype: String
        profile: String
        version: String
        firstcreated: String
        versioncreated: String
        embargoed: String
        pubstatus: String
        urgency: Int
        copyrightholder: String
        copyrightnotice: String
        usageterms: String
        ednote: String
        language: String
        person: [PersonType]
        organisation: [OrganisationType]
        place: [PlaceType]
        subject: [SubjectType]
        event: [EventType]
        object: [ObjectType]
        infosource: [InfosourceType]
        title: String
        byline: String
        headline: String
        slugline: String
        located: String
        charcount: Int
        wordcount: Int
        description_text: String
        description_usage: String
        body_text: String
        trustindicator: [TrustindicatorType]
        genre: [GenreType]
      }
    
      type PersonType {
        code: String
        name: String
        rel: String
        scheme: String
      }

      type OrganisationType {
        code: String
        name: String
        rel: String
        scheme: String
        symbols: [OrgSymbolsType]
      }

      type OrgSymbolsType {
        ticker: String
        exchange: String
      }

      type PlaceType {
        code: String
        name: String
        rel: String
        scheme: String
        geometry_geojson: GeoType
      }

      type GeoType {
        coordinates: [Float]
        type: String
    }

    type SubjectType {
        code: String
        name: String
        rel: String
        scheme: String
      }
    
      type EventType {
        code: String
        name: String
        rel: String
        scheme: String
      }
    
      type ObjectType {
        code: String
        name: String
        rel: String
        scheme: String
      }
    
      type InfosourceType {
        code: String
        name: String
        rel: String
        scheme: String
      }

      type TrustindicatorType {
        code: String
        title: String
        href: String
        scheme: String
      }

      type GenreType {
        code: String
        name: String
        scheme: String
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
        svaret = svaret.filter(item => item.uri === args.uri);
    } else { 
        if (args.urgency) {
            svaret = svaret.filter(item => item.urgency === args.urgency);
        } 
        if (args.pubstatus) {
            svaret = svaret.filter(item => item.pubstatus === args.pubstatus);
        } 
        if (args.language) {
            svaret = svaret.filter(item => item.language === args.language);
        } 
        if (args.copyrightholder) {
            svaret = svaret.filter(item => item.copyrightholder === args.copyrightholder);
        } 
        if (args.startAfter) {
            svaret = svaret.filter(item => item.versioncreated >= args.startAfter);
        } 
        if (args.startBefore) {
            svaret = svaret.filter(item => item.versioncreated <= args.startBefore);
        } 
      if (args.filter) {
            svaret = svaret.filter(item => (item.headline.indexOf(args.filter) !== -1) || (item.body_text.indexOf(args.filter) !== -1));
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
