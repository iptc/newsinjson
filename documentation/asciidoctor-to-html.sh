#!/bin/sh
echo "Converting file... IPTC-NinJS-Guidelines.adoc"
asciidoctor -r asciidoctor-tabs -b html5 -o index.html IPTC-NinJS-Guidelines.adoc
echo "Done."
