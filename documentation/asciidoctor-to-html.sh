#!/bin/sh
echo "Converting file... IPTC-NinJS-Guidelines.adoc"
asciidoctor -b html5 -o index.html IPTC-NinJS-Guidelines.adoc
echo "Done."
