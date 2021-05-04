#!/usr/bin/env python3

# Even though it's protobuf3, the module name must end in '_pb2' or we get weird errors
import ninjs20_dev_pb2
import textwrap

def output_meta_term(meta):
    # meta terms have name, rel, uri and/or literal properties.
    # This includes: person, organisation, place, subject, event, object, infosource, genre
    # Exceptions:
    # - Genre doesn't have "rel"
    # - Infosource has "role" and not "rel"
    # - Place also has "geometry"
    # - Organisation also has "symbols" (repeating list of ticker/exchange properties)
    outstr = ""
    for property in ['name', 'rel', 'role', 'uri', 'literal']:
        if hasattr(meta, property) and getattr(meta, property) != '':
            outstr += property + '=' + getattr(meta, property) + ' '
    return outstr

if __name__ == '__main__':

    # create a protobufs object in code

    newsitem = ninjs20_dev_pb2.Ninjs()
    newsitem.uri = 'http://IPTC.com/video/3e02fc32-9cbf-48db-a3a2-57b49a321310'
    newsitem.standard.name = 'ninjs'
    newsitem.standard.version = '2.0'
    newsitem.standard.schema = '...'
    newsitem.type = ninjs20_dev_pb2.Ninjs.Type.video
    newsitem.representationtype = ninjs20_dev_pb2.Ninjs.Representationtype.full
    newsitem.profile = "video"
    newsitem.genre.add(
        name = 'Current',
        uri = 'http://cv.iptc.org/newscodes/genre/Current'
    )
    newsitem.subject.add(
        rel = 'classifies',
        name = 'Human interest',
        uri = 'http://cv.iptc.org/newscodes/mediatopic/08000000'
    )
    newsitem.subject.add(
        rel = 'classifies',
        name = 'Animal',
        uri = 'http://cv.iptc.org/newscodes/mediatopic/20000500'
    )
    newsitem.person.add(
        literal = 'Joe Bloggs'
    )
    # showing three different ways to add to repeated fields:
    # 1. create a symbol with add(), add it to an organisation with append()
    org1 = ninjs20_dev_pb2.Ninjs.Organisation(
        name = 'Thomson Reuters Corporation',
        uri = 'https://www.thomsonreuters.com/'
    )
    org1.symbols.add(
        ticker = 'TRI',
        exchange = 'NYSE'
    )
    newsitem.organisation.append(org1)
    # 2. create symbols using Python constructor, add them
    # to the organisation with append()
    org2 = ninjs20_dev_pb2.Ninjs.Organisation(
        name = 'Adobe',
        uri = 'https://www.adobe.com/'
    )
    org2sym1 = ninjs20_dev_pb2.Ninjs.Organisation.Symbols(
        ticker = 'ADBE',
        exchange = 'Nasdaq'
    )
    org2sym2 = ninjs20_dev_pb2.Ninjs.Organisation.Symbols(
        ticker = 'ADBX',
        exchange = 'NYSE'
    )
    org2.symbols.append(org2sym1)
    org2.symbols.append(org2sym2)
    newsitem.organisation.append(org2)
    # 3. Define everything as a Python object and let the module figure it out
    newsitem.organisation.add(
        name = 'Google',
        uri = 'https://www.google.com/',
        symbols = [
            {
                'ticker': 'GOOG',
                'exchange': 'Nasdaq',
            },
            {
                'ticker': 'GOGX',
                'exchange': 'NYSE'
            }
        ]
    )        
    newsitem.versioncreated = '2020-07-13T11:59:09.102Z'
    newsitem.pubstatus = ninjs20_dev_pb2.Ninjs.Pubstatus.usable
    newsitem.urgency = 2
    newsitem.copyrightholder = "IPTC"
    newsitem.copyrightnotice = "Copyright (C) 2021, IPTC"
    newsitem.usageterms = "Test content. Not to be published under any circumstances."
    newsitem.ednote = "Test content. Not to be published under any circumstances."
    newsitem.language = "EN"
    newsitem.body.add(
        name = "main",
        value = "It's a cliche, but we managed to catch it on camera for the first time: a man actually bit a dog."
    )
    newsitem.byline = "Brendan Quinn"
    newsitem.located = "Anywhere, North Carolina"
    newsitem.headline.add(
        name = "main",
        value = "Man bites dog"
    )
    ninjs_protobuf_string = newsitem.SerializeToString()

    print("Protobuf serialised version of ninjs article:")
    print(ninjs_protobuf_string)

    print()

    # and now demonstrate reading from that object

    ninjs_obj = ninjs20_dev_pb2.Ninjs()
    ninjs_obj.ParseFromString(ninjs_protobuf_string)

    print("Data read from protobuf serialisation:")
    print("\tURI: " + ninjs_obj.uri)
    print("\tType: " + ninjs20_dev_pb2.Ninjs.Type.Name(ninjs_obj.type))
    print("\tRepresentation type: " +
          ninjs20_dev_pb2.Ninjs.Representationtype.Name(ninjs_obj.representationtype)
         )
    print("\tProfile: " + ninjs_obj.profile)
    if ninjs_obj.genre:
        print("\tGenres: ")
        for genre in ninjs_obj.genre:
            print("\t- "+output_meta_term(genre))
    if ninjs_obj.subject:
        print("\tSubjects: ")
        for subject in ninjs_obj.subject:
            print("\t- "+output_meta_term(subject))
    if ninjs_obj.person:
        print("\tPeople: ")
        for person in ninjs_obj.person:
            print("\t- "+output_meta_term(person))
    if ninjs_obj.organisation:
        print("\tOrganisations: ")
        for organisation in ninjs_obj.organisation:
            print("\t- "+output_meta_term(organisation))
            if hasattr(organisation, 'symbols'):
                print("\t\tSymbols: ")
                for symbol in organisation.symbols:
                    symbolstr = ""
                    if hasattr(symbol, 'ticker'):
                        symbolstr += "ticker="+symbol.ticker
                    if hasattr(symbol, 'exchange'):
                        symbolstr += ", exchange="+symbol.exchange
                    print("\t\t- "+symbolstr)
    if ninjs_obj.place:
        print("\tPlaces: ")
        for place in ninjs_obj.place:
            print("\t- "+output_meta_term(place))
    # event, object, infosource, genre
    print("\tCopyright Holder: " + ninjs_obj.copyrightholder)
    print("\tCopyright Notice: " + ninjs_obj.copyrightnotice)
    print("\tUsage Terms: " + ninjs_obj.usageterms)
    print("\tEditorial Note: " + ninjs_obj.ednote)
    print("\tLanguage: " + ninjs_obj.language)
    for headline in ninjs_obj.headline:
        print("\tHeadline ("+headline.name+"): " + headline.value)
    for body in ninjs_obj.body:
        print("\tBody ("+body.name+"):")
        print(textwrap.fill(body.value, initial_indent='\t', subsequent_indent='\t'))
