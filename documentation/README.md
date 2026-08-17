= Generating the ninjs user guide from source

We use asciidoctor with a plugin, https://github.com/asciidoctor/asciidoctor-tabs.

Install asciidoctor and the plugin to handle tabs:

    gem install --prerelease asciidoctor asciidoctor-tabs

On macOS, this fails against the system Ruby with
`Gem::FilePermissionError: You don't have write permissions for the
/Library/Ruby/Gems/2.6.0 directory`. Do *not* `sudo` or `chown` that directory: it belongs
to macOS, the ownership change is undone by OS updates, and Apple's bundled Ruby is
deprecated. Install into your own gem directory instead:

    gem install --user-install --prerelease asciidoctor asciidoctor-tabs

then add the user gem bin directory to your `PATH` (add this to your shell profile to make
it permanent):

    export PATH="$(ruby -e 'print Gem.user_dir')/bin:$PATH"

Then run the generation script in this folder to create the documentation file:

    $ ./asciidoctor-to-html.sh 
    Converting file... IPTC-NinJS-Guidelines.adoc
    Done.
