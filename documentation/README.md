= Generating the ninjs user guide from source

We use asciidoctor with a plugin, https://github.com/asciidoctor/asciidoctor-tabs.

Install the plugin to handle tabs:

    gem install --prerelease asciidoctor-tabs

Then run the generation script in this folder to create the documentation file:

    $ ./asciidoctor-to-html.sh 
    Converting file... IPTC-NinJS-Guidelines.adoc
    Done.
