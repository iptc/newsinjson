import {IPTCNinjsNewsInJSONVersion20DraftForApprovalAtIPTCStandardsCommittee} from './ninjs20'
const xml = require('libxmljs2')
import {getElementWithNS,getAttributeWithNS} from './xmlget'

//Create the connection with the ts-unit compiled from News in JSON 2.0
//Provider specific extensions can be added in the object below
type Ninjs = IPTCNinjsNewsInJSONVersion20DraftForApprovalAtIPTCStandardsCommittee & {
    extraproperty?: string
}
  

export default class Converter {

    private ninjs: Ninjs

    //Setting default values is optional
    constructor() {
        this.ninjs = {
          uri: undefined,
          type: 'text',
          representationtype: 'full',
          subjects: [],
          events: [],
          people: [],
          places: [],
          organisations: [],
          urgency: 4,
          copyrightholder: 'TT',
          bodies: [],
          associations: []
        }
      }

      //call this function with the xml as a string
      async convert(indata) {

        const xmldata = xml.parseXml(indata)
        const nm = xmldata.get('/newsMessage')

        const idref = getAttributeWithNS(nm,'itemSet/packageItem/groupSet/group[@role = "group:main"]/itemRef/@residref',[],'')

        const newsitem = nm.get('itemSet/newsItem[@guid = "' + idref + '"]')

        const copyright = getElementWithNS(newsitem,'rightsInfo/copyrightHolder/name',[],'TT')
        const version = getAttributeWithNS( newsitem,'@version',[],'')
        const vc = getElementWithNS(newsitem,'itemMeta/versionCreated',[],'')
        const pub = getAttributeWithNS(newsitem,'itemMeta/pubStatus/@qcode',[],'').split(':')[1]
        const urg = getElementWithNS(newsitem,'contentMeta/urgency',[],'')
        const cc = getElementWithNS(newsitem,'contentMeta/contentCreated',[],'')
        const lang = getAttributeWithNS(newsitem,'contentMeta/language/@tag',[],'')
        const slug = getElementWithNS(newsitem,'contentMeta/slugline',[],'')
        const note = getElementWithNS(newsitem,'itemMeta/edNote',[],'')
        const by = getElementWithNS(newsitem,'contentMeta/by',[],'')
        

        this.ninjs.copyrightholder = copyright
        this.ninjs.uri = idref
        this.ninjs.version = version
        this.ninjs.versioncreated = vc
        this.ninjs.pubstatus = pub
        this.ninjs.urgency = +urg
        this.ninjs.contentcreated = cc
        this.ninjs.language = lang
        this.ninjs.slugline = slug
        this.ninjs.by = by
        
        if (note != ''){ this.ninjs.ednote = note }


        let value = getElementWithNS(newsitem,'contentMeta/headline',[],'')
        this.ninjs.headlines = [{value}]

        for (const onesub of newsitem.find('contentMeta/subject[@type= "cpnat:abstract"]')) {
            const name = getElementWithNS(onesub,'name',[],'')
            const literal = getAttributeWithNS(onesub,'@qcode',[],'').split(':')[1]
            this.ninjs.subjects.push({name,literal})
        }
        for (const onesub of newsitem.find('contentMeta/subject[@type= "cpnat:person"]')) {
            const name = getElementWithNS(onesub,'name',[],'')
            this.ninjs.people.push({name})
        }
        for (const onesub of newsitem.find('contentMeta/subject[@type= "cpnat:organisation"]')) {
            const name = getElementWithNS(onesub,'name',[],'')
            this.ninjs.organisations.push({name})
        }
        for (const onesub of newsitem.find('contentMeta/subject[@type= "cpnat:place"]')) {
            const name = getElementWithNS(onesub,'name',[],'')
            const literal = getAttributeWithNS(onesub,'@literal',[],'')
            if (literal != '' && literal != undefined) {
                const lat = getAttributeWithNS(newsitem,'assert[@literal = "' + literal +'"]/geoAreaDetails/position/@latitude',[],'')
                const long = getAttributeWithNS(newsitem,'assert[@literal = "' + literal +'"]/geoAreaDetails/position/@longitude',[],'')
                let coordinates = []
                coordinates.push(+lat)
                coordinates.push(+long)
                const type = 'Point'
                const GeoJSONObject = {coordinates,type}
                this.ninjs.places.push({GeoJSONObject,name})

            } else {
                this.ninjs.places.push({name})
            }
        }
        for (const body of newsitem.find('contentSet/inlineXML')) {
            const value = getElementWithNS(body,'.',[],'')
            const contenttype = getAttributeWithNS(body,'./@contenttype',[],'')
            const role =  getAttributeWithNS(body,'./@contenttypevariant',[],'')
            
            this.ninjs.bodies.push({contenttype,role,value})
        }

        for (const oneref of nm.find('itemSet/packageItem/groupSet/group[@role = "group:package"]/itemRef')) {
            const id = getAttributeWithNS(oneref,'./@residref',[],'')
            const ni = nm.get('itemSet/newsItem[@guid = "' + id + '"]')  
            const name = getElementWithNS(oneref,'./altId',[],'')         
            const type = getAttributeWithNS(ni,'./itemMeta/itemClass/@qcode',[],'').split(':')[1]
            const versioncreated = getElementWithNS(ni,'./itemMeta/versionCreated',[],'')
            const uri = getAttributeWithNS(ni,'./@guid',[],'')
            const by = getElementWithNS(ni,'./contentMeta/by',[],'')
            const version = getAttributeWithNS( newsitem,'@version',[],'')
            const value = getElementWithNS(ni,'./contentMeta/description[@role= "drol:caption"]',[],'')
            const role = 'caption'
            const bodies = [{role,value}]

            const renditions = []
            for (const onerend of ni.find('./contentSet/remoteContent')) {
                const href = getAttributeWithNS(onerend,'./@href',[],'')
                const variant = getAttributeWithNS(onerend,'./remoteContentExtProperty[@type = "ttrend:variant"]/@literal',[],'')
                const usage = getAttributeWithNS(onerend,'./remoteContentExtProperty[@type = "ttrend:usage"]/@literal',[],'')
                const name =  variant + '_' + usage
                const contenttype = getAttributeWithNS(onerend,'./@contenttype',[],'')
                const height = getAttributeWithNS(onerend,'./@height',[],'')
                const width = getAttributeWithNS(onerend,'./@width',[],'')
                const sizeinbytes = getAttributeWithNS(onerend,'./@size',[],'')
                renditions.push({name,href,contenttype,height,width,sizeinbytes})

            }

            this.ninjs.associations.push({name,uri,type,versioncreated,version,by,bodies,renditions})

        }

        return this.ninjs

      }

}