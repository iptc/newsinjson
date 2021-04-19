#!/usr/bin/env python3

# Even though it's protobuf3, the module name must end in '_pb2' or we get weird errors
import ninjs20_pb2

newsitem = ninjs20_pb2.NINJS()
newsitem.uri = 'http://IPTC.com/video/3e02fc32-9cbf-48db-a3a2-57b49a321310'
newsitem.standard.name = 'ninjs'
newsitem.standard.version = '2.0'
newsitem.standard.schema = '...'
newsitem.type = ninjs20_pb2.NINJS.Type.video
newsitem.representationtype = ninjs20_pb2.NINJS.Representationtype.full

"""
    "uri": "http://IPTC.com/video/3e02fc32-9cbf-48db-a3a2-57b49a321310",
    "$standard": {
        "name": "NINJS",
        "version": "1.3",
        "schema": "ninjs-schema_1.3.json"
    },
    "type": "video",
    "representationtype": "complete",
    "profile": "video",
    "genre": [
        {
            "name": "Current",
            "code": "Current",
            "scheme": "http://cv.iptc.org/newscodes/genre/"
        }
    ],
    "subject": [
        {
            "code": "08000000",
            "rel": "classifies",
            "name": "Human interest",
            "scheme": "http://cv.iptc.org/newscodes/mediatopic/"
        }
    ],
    "versioncreated": "2020-07-13T11:59:09.102Z",
    "pubstatus": "usable",
    "urgency": 2,
    "copyrightholder": "IPTC",
    "copyrightnotice": "Copyright (C) 2020, IPTC",
    "usageterms": "Test content. Not to be published under any circumstances.",
    "ednote": "Test content. Not to be published under any circumstances.",
    "language": "EN",
    "body_text": "It's a cliche, but we managed to catch it on camera for the first time: a man actually bit a dog.",
    "byline": "Brendan Quinn",
    "located": "Anywhere, North Carolina",
    "headline": "Man bites dog",
"""


"""
newsitem.nitype = ninjs20_pb2.NINJS.NewsItemType.video
newsitem.mimetype = 'application/quicktime'
newsitem.representationtype = ninjs20_pb2.NINJS.Representationtype.partial
description = newsitem.description.add(
    name = 'main description',
    content = 'video of the awards ceremony'
)
body = newsitem.body.add(
    name='main body',
    content='main body content'
)
newsitem.pubstatus = ninjs20_pb2.NINJS.Pubstatus.withheld
newsitem.urgency = 1
newsitem.profile = 'video'
"""
print(newsitem.SerializeToString())
