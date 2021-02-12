#!/usr/bin/env python3

# Even though it's protobuf3, the module name must end in '_pb2' or we get weird errors
import ninjs20_dev_pb2

if __name__ == '__main__':
    newsitem = ninjs20_dev_pb2.ninjs()
    newsitem.uri = 'http://IPTC.com/video/3e02fc32-9cbf-48db-a3a2-57b49a321310'
    newsitem.standard.name = 'ninjs'
    newsitem.standard.version = '2.0'
    newsitem.standard.schema = '...'
    newsitem.type = ninjs20_dev_pb2.ninjs.Type.video
    newsitem.representationtype = ninjs20_dev_pb2.ninjs.Representationtype.full
    newsitem.profile = "video"
    newsitem.genre.add(
        name = 'Current',
        code = 'Current',
        scheme = 'http://cv.iptc.org/newscodes/genre/'
    )
    newsitem.subject.add(
        code = '08000000',
        rel = 'classifies',
        name = 'Human interest',
        scheme = 'http://cv.iptc.org/newscodes/mediatopic/'
    )
    newsitem.versioncreated = '2020-07-13T11:59:09.102Z'
    newsitem.pubstatus = ninjs20_dev_pb2.ninjs.Pubstatus.usable
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
        text = "Man bites dog"
    )
    ninjs_protobuf_string = newsitem.SerializeToString()
    print(ninjs_protobuf_string)



