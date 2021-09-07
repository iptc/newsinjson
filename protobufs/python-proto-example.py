#!/usr/bin/env python3

import ninjs20_pb2
import textwrap

def output_meta_terms(meta, indent="\t", firstindent=" - ", subsequentindent="   "):
    # meta terms have name, rel, uri and/or literal properties.
    # This includes: people, organisations, places, subjects, events, objects, infosources, genres
    # Exceptions:
    # - Genres don't have "rel"
    # - Infosources have "role" and not "rel"
    # - Places also have "geometry"
    # - Organisations also have "symbols" (repeating list of ticker/exchange properties)
    outstr = ""
    isfirst = True
    for property in ['name', 'rel', 'role', 'uri', 'literal']:
        if hasattr(meta, property) and getattr(meta, property) != '':
            print(indent + (firstindent if isfirst else subsequentindent) + property + " = " + getattr(meta, property))
            isfirst = False
            # outstr += property + ' = ' + getattr(meta, property) + ' '

def printwrapped(text):
    print(textwrap.fill(text, initial_indent='\t\t', subsequent_indent='\t\t'))

if __name__ == '__main__':

    # create a protobufs object in code

    newsitem = ninjs20_pb2.Ninjs()
    newsitem.uri = 'http://IPTC.com/video/3e02fc32-9cbf-48db-a3a2-57b49a321310'
    newsitem.standard.name = 'ninjs'
    newsitem.standard.version = '2.0'
    newsitem.standard.schema = '...'
    newsitem.type = ninjs20_pb2.Ninjs.Type.video
    newsitem.representationtype = ninjs20_pb2.Ninjs.Representationtype.full
    newsitem.profile = "video"
    newsitem.genres.add(
        name = 'Current',
        uri = 'http://cv.iptc.org/newscodes/genre/Current'
    )
    newsitem.subjects.add(
        rel = 'classifies',
        name = 'Human interest',
        uri = 'http://cv.iptc.org/newscodes/mediatopic/08000000'
    )
    newsitem.subjects.add(
        rel = 'classifies',
        name = 'Animal',
        uri = 'http://cv.iptc.org/newscodes/mediatopic/20000500'
    )
    newsitem.people.add(
        literal = 'Joe Bloggs'
    )
    # showing three different ways to add to repeated fields:
    # 1. create a symbol with add(), add it to an organisation with append()
    org1 = ninjs20_pb2.Ninjs.Organisations(
        name = 'Thomson Reuters Corporation',
        uri = 'https://www.thomsonreuters.com/'
    )
    org1.symbols.add(
        ticker = 'TRI',
        exchange = 'NYSE'
    )
    newsitem.organisations.append(org1)
    # 2. create symbols using Python constructor, add them
    # to the organisation with append()
    org2 = ninjs20_pb2.Ninjs.Organisations(
        name = 'Adobe',
        uri = 'https://www.adobe.com/'
    )
    org2sym1 = ninjs20_pb2.Ninjs.Organisations.Symbols(
        ticker = 'ADBE',
        exchange = 'Nasdaq'
    )
    org2sym2 = ninjs20_pb2.Ninjs.Organisations.Symbols(
        ticker = 'ADBX',
        exchange = 'NYSE'
    )
    org2.symbols.append(org2sym1)
    org2.symbols.append(org2sym2)
    newsitem.organisations.append(org2)
    # 3. Define everything as a Python object and let the module figure it out
    newsitem.organisations.add(
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
    newsitem.pubstatus = ninjs20_pb2.Ninjs.Pubstatus.usable
    newsitem.urgency = 2
    newsitem.copyrightholder = "IPTC"
    newsitem.copyrightnotice = "Copyright (C) 2021, IPTC"
    newsitem.usageterms = "Test content. Not to be published under any circumstances."
    newsitem.ednote = "Test content. Not to be published under any circumstances."
    newsitem.language = "EN"
    newsitem.bodies.add(
        role = "main",
        value = "It's a cliche, but we managed to catch it on camera for the first time: a man actually bit a dog."
    )
    newsitem.by = "Brendan Quinn"
    newsitem.located = "Anywhere, North Carolina"
    newsitem.headlines.add(
        role = "main",
        value = "Man bites dog"
    )
    ninjs_protobuf_string = newsitem.SerializeToString()

    print("Protobuf serialised version of ninjs article:")
    print(ninjs_protobuf_string)

    print()

    # and now demonstrate reading from that object

    ninjs_obj = ninjs20_pb2.Ninjs()
    ninjs_obj.ParseFromString(ninjs_protobuf_string)

    print("Data read from protobuf serialisation:")
    print("\tURI: " + ninjs_obj.uri)
    print("\tType: " + ninjs20_pb2.Ninjs.Type.Name(ninjs_obj.type))
    print("\tRepresentation type: " +
          ninjs20_pb2.Ninjs.Representationtype.Name(ninjs_obj.representationtype)
         )
    print("\tProfile: " + ninjs_obj.profile)
    if ninjs_obj.genres:
        print("\tGenres: ")
        for genre in ninjs_obj.genres:
            output_meta_terms(genre)
    if ninjs_obj.subjects:
        print("\tSubjects: ")
        for subject in ninjs_obj.subjects:
            output_meta_terms(subject)
    if ninjs_obj.people:
        print("\tPeople: ")
        for person in ninjs_obj.people:
            output_meta_terms(person)
    if ninjs_obj.organisations:
        print("\tOrganisations: ")
        for organisation in ninjs_obj.organisations:
            output_meta_terms(organisation)
            if hasattr(organisation, 'symbols'):
                print("\t   symbols: ")
                for symbol in organisation.symbols:
                    symbolstr = ""
                    if hasattr(symbol, 'ticker'):
                        symbolstr += "ticker="+symbol.ticker
                    if hasattr(symbol, 'exchange'):
                        symbolstr += ", exchange="+symbol.exchange
                    print("\t   - "+symbolstr)
    if ninjs_obj.places:
        print("\tPlaces: ")
        for place in ninjs_obj.places:
            output_meta_terms(place)
    # events, objects, infosources, genres
    print("\tCopyright Holder:")
    printwrapped(ninjs_obj.copyrightholder)
    print("\tCopyright Notice:")
    printwrapped(ninjs_obj.copyrightnotice)
    print("\tUsage Terms:")
    printwrapped(ninjs_obj.usageterms)
    print("\tEditorial Note:")
    printwrapped(ninjs_obj.ednote)
    print("\tLanguage: ")
    printwrapped(ninjs_obj.language)
    for headline in ninjs_obj.headlines:
        print("\tHeadline ("+headline.role+"): ")
        printwrapped(headline.value)
    for body in ninjs_obj.bodies:
        print("\tBody ("+body.role+"):")
        printwrapped(body.value)
