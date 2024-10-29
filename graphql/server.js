
var express = require("express");
var gqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var _ = require("lodash");

//This schema is according to the NINJS 2.0 schema

var schema = buildSchema(`

    type NINJS {
        uri: String!
        type: String
        representationType: String
        profile: String
        version: String
        firstCreated: String
        versionCreated: String
        contentCreated: String
        embargoedUntil: String
        pubStatus: String
        urgency: Int
        copyrightHolder: String
        copyrightNotice: String
        usageTerms: String
        edNote: String
        language: String
        descriptions: [DescriptionType]
        bodies: [BodyType]
        headlines: [HeadlineType]
        people: [PersonType]
        organisations: [OrganisationType]
        places: [PlaceType]
        subjects: [SubjectType]
        events: [EventType]
        eventDetails: EventDetailType
        plannedCoverage: [PlannedCoverageType]
        objects: [ObjectType]
        infoSources: [InfosourceType]
        title: String
        by: String
        slugline: String
        located: String
        renditions: [RenditionType]
        altIds: [AltIDType]
        trustIndicators: [TrustindicatorType]
        genres: [GenreType]
        expires: String
        rightsInfo: RightsType
      }

      type RightsType {
        langId: String
        linkedRights: String
        encodedRights: String
      }

      type AltIDType {
        role: String
        value: String
      } 

      type RenditionType {
        name: String!
        href: String
        contentType: String
        title: String
        height: Float
        width: Float
        sizeInBytes: Float
        duration: Float
        format: String
        aspectRatio: String
        videoCodec: String
        frameRate: Float
        poi: PoiType
        transportProtocol: String
        scanType: String
        bitrate: String
      }
      
      type PoiType {
          x: Int
          y: Int
      }

      type HeadlineType {
        role: String
        contentType: String
        value: String!
      }
      
      type DateObjectType {
          startDate: String
          endDate: String
          expectedStartDate: String
          expectedEndDate: String
          expectedDuration: String
          recurrence: RecurrenceType
      }
      
      type RecurrenceType {
          recurrenceDates: [String]
          recurrenceRules: [recurrenceRuleType]
      } 
      
      type recurrenceRuleType {
          frequency: String
          interval: String
          until: String
          count: String
      }
      
      type ContactInfoType {
          type: String
          role: String
          lang: String
          name: String
          value: String
          address: AddressType
      }
      
      type AddressType {
          lines: [String]
          locality: String
          area: String
          postalCode: String
          country: String
      }
      
      type CommissionedType {
          by: String
          on: String
          references: [ReferenceType]
      }
      
      type ReferenceType {
          name: String
          value: String
      }

      type BodyType {
        role: String
        contentType: String
        charCount: Int
        wordCount: Int
        value: String!
      }

      type DescriptionType {
        role: String
        contentType: String
        value: String!
      }
    
      type PersonType {
        literal: String
        name: String
        rel: String
        uri: String
        contactInfo: [ContactInfoType]
      }

      type OrganisationType {
        literal: String
        name: String
        rel: String
        uri: String
        symbols: [OrgSymbolsType]
        contactInfo: [ContactInfoType]
      }

      type OrgSymbolsType {
        ticker: String
        exchange: String
        symbolType: String
        symbol: String
      }

      type PlaceType {
        literal: String
        name: String
        rel: String
        uri: String
        contactInfo: [ContactInfoType]
        geoJSON: GeoType
      }

      type GeoType {
        coordinates: [Float]
        type: String
    }

    type SubjectType {
        literal: String
        name: String
        rel: String
        uri: String
        creator: String
        relevance: Int
        confidence: Int
      }
    
      type EventType {
        id: String
        literal: String
        name: String
        rel: String
        uri: String
      }
      
      type EventDetailType {
          eventStatus: String
          plannedCoverageStatus: String
          dates: DateObjectType
          organiser: OrganisationType
      }
      
      type PlannedCoverageType {
          uri: String
          title: String
          pubStatus: String
          type: String
          comissioned: CommissionedType
          audiences: [AudienceType]
          exclAudience: [String]
          edNote: String
          urgency: Int
          language: String
          itemCount: ItemCountType
          wordCount: Int
          renditions: [RenditionType]
      }
      
      type ItemCountType {
          rangeFrom: Int
          rangeTo: Int
      }
      
      type AudienceType {
          audience: String
          significance: Int
      }
    
      type ObjectType {
        literal: String
        name: String
        rel: String
        uri: String
      }
    
      type InfosourceType {
        literal: String
        name: String
        rel: String
        uri: String
        contactInfo: [ContactInfoType]
      }
      
      type TrustindicatorType {
        role: String
        title: String
        href: String
      }

      type GenreType {
        literal: String
        name: String
        uri: String
      }
    

      type Query {
        ninjs(uri: String,
            type: String,
            urgency: Int, 
            pubStatus: String,
            language: String,
            startAfter: String,
            startBefore: String,
            copyrightHolder: String,
            topicid: String,
            filter: String): [NINJS]
    }
`);

const items = require("./data.json")

var getItems = function(args) {
    svaret = items
    if (args.uri) {
        svaret = svaret.filter(item => item.uri === args.uri);
    } else { 
        if (args.type) {
            svaret = svaret.filter(item => item.type === args.type);
        } 
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
        if (args.topicid) {
            const temp = svaret;
            svaret = [];
            _.forEach(temp, function(element, i) 
            {if (_.find(element.subject,['code',args.topicid])) {svaret.push(element);}});
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
