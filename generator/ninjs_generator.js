'use strict';

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

class NinjsGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: '',
            outputformat: 'ninjs20',
            firstcreated: '',
            representationtype: 'full',
            type: 'text',
            pubstatus: 'usable',
            urgency: 1,
            genre: '',
            language: 'en',
            headline: '',
            subheadline: '',
            provider: '',
            profile: '',
            copyrightholder: '',
            copyrightnotice: '',
            usageterms: '',
            slugline: '',
            bodytext: '',
            by: '',
            location: '',
            altid_name: '',
            altid_role: '',
            medtop: [],
            ednote: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.guid = generateUUID();
    }
    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
        this.refreshOutput();
    }
    componentDidUpdate() {
        $('[ata-toggle="tooltip"]').tooltip();
    }
    refreshOutput() {    
        var output;
        if (this.state.outputformat == 'ninjs20') {
            this.state.qcodeVisible = false;
            // output = this.getninjs20Output();
            output = this.getninjsOutput("ninjs20");
        } else if (this.state.outputformat == 'ninjs13') {
            this.state.qcodeVisible = false;
            // output = this.getninjs13Output();
            output = this.getninjsOutput("ninjs13");
        }
        this.setState({output: output});
    }
    getninjsOutput(version) {
        var jsonObj = {};
        var lang = this.state.language;

        var type = this.state.type;
        var provider = this.state.provider || "provider";

        var uri = 'http://' + provider + '.com/' + type + '/' + this.guid;
        jsonObj['uri'] = uri;

        var standard = {}; var standardkey = "";
        if (version == "ninjs13") {
            standard = {
                "name": "ninjs",
                "version": "1.3",
                "schema": "https://iptc.org/std/ninjs/ninjs-schema_1.3.json"
            };
            standardkey = '$standard';
        } else {
            standard = {
                "name": "ninjs",
                "version": "2.0",
                "schema": "https://iptc.org/std/ninjs/ninjs-schema_2.0.json"
            };
            standardkey = 'standard';
        }
        jsonObj[standardkey] = standard;

        if (this.state.firstcreated) {
            jsonObj['firstcreated'] = this.state.firstcreated;
        }
        if (lang) {
            jsonObj['language'] = lang;
        }
        if (this.state.type) {
            jsonObj['type'] = this.state.type;
        }
        if (this.state.representationtype) {
            if (version == "ninjs13") {
                jsonObj['representationtype'] = this.state.representationtype == "full" ? "complete" : "incomplete";
            } else {
                jsonObj['representationtype'] = this.state.representationtype;
            }
        }
        if (this.state.pubstatus) {
            jsonObj['pubstatus'] = this.state.pubstatus;
        }
        if (this.state.urgency) {
            jsonObj['urgency'] = parseInt(this.state.urgency);
        }
        if (version == "ninjs13") {
            if (this.state.headline) {
                jsonObj['headline'] = this.state.headline;
            }
            if (this.state.subheadline) {
                jsonObj['headline_subheadline'] = this.state.subheadline;
            }
        } else {
            if (this.state.headline || this.state.subheadline) {
                jsonObj['headlines'] = [];
            }
            if (this.state.headline) {
                jsonObj['headlines'].push({
                    "role": "main",
                    "value": this.state.headline
                });
            }
            if (this.state.subheadline) {
                jsonObj['headlines'].push({
                    "role": "subheadline",
                    "value": this.state.subheadline
                });
            }
        }
        if (this.state.profile) {
            jsonObj['profile'] = this.state.profile;
        }
        if (this.state.copyrightholder) {
            jsonObj['copyrightholder'] = this.state.copyrightholder;
        }
        if (this.state.copyrightnotice) {
            jsonObj['copyrightnotice'] = this.state.copyrightnotice;
        }
        if (this.state.usageterms) {
            jsonObj['usageterms'] = this.state.usageterms;
        }
        if (this.state.slugline) {
            jsonObj['slugline'] = this.state.slugline;
        }
        if (this.state.bodytext) {
            if (version == "ninjs13") {
                jsonObj['body_text'] = this.state.bodytext;
                jsonObj['charcount'] = this.state.bodytext.length;
                jsonObj['wordcount'] = this.state.bodytext.split(' ').length;
            } else {
                jsonObj['bodies'] = [{
                    "charcount": this.state.bodytext.length,
                    "wordcount": this.state.bodytext.split(' ').length,
                    "role": "main",
                    "value": this.state.bodytext
                }];
            }
        }
        if (this.state.genre) {
            var genreitems = [];
            var genrekey = "";
            if (version == "ninjs13") {
                genreitems.push({
                    'scheme': 'http://cv.iptc.org/newscodes/genre/',
                    'code': this.state.genre
                });
                genrekey = "genre";
            } else {
                genreitems.push({
                    'uri': 'http://cv.iptc.org/newscodes/genre/'+this.state.genre
                });
                genrekey = "genres";
            }
            jsonObj[genrekey] = genreitems;
        }
        if (this.state.medtop.length > 0) {
            var mediatopics = [];
            var medtopkey = '';
            for (var elem of this.state.medtop) {
                if (version == "ninjs13") {
                    mediatopics.push({
                        'scheme': 'http://cv.iptc.org/newscodes/mediatopic/',
                        'rel': 'classifies',
                        'code': elem[0],
                        'name': elem[1]
                    });
                    medtopkey = 'subject';
                } else {
                    mediatopics.push({
                        'rel': 'classifies',
                        'uri': 'http://cv.iptc.org/newscodes/mediatopic/'+elem[0],
                        'name': elem[1]
                    });
                    medtopkey = 'subjects';
                }
            }
            jsonObj[medtopkey] = mediatopics;
        }
        if (this.state.by) {
            if (version == "ninjs13") {
                jsonObj['byline'] = this.state.by;
            } else {
                jsonObj['by'] = this.state.by;
            }
        }
        if (this.state.location) {
            jsonObj['located'] = this.state.location;
        }
        if (this.state.altid_role || this.state.altid_value) {
            if (version == "ninjs13") {
                jsonObj['altids'] = {
                    "role": this.state.altid_role || "",
                    "value": this.state.altid_value || ""
                };
            } else {
                jsonObj['altids'] = [{
                    "role": this.state.altid_role || "",
                    "value": this.state.altid_value || ""
                }]
            }
        }
        if (this.state.ednote) {
            jsonObj['ednote'] = this.state.ednote;
        }
        return JSON.stringify(jsonObj, null, '\t');
    }
    handleSubmit(event) {
        /* there's no submit button but just in case some automatic feature tries to submit the form... */
        event.preventDefault();
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked
            : target.type === 'select-multiple' ? [...target.selectedOptions].map(o => [ o.value, o.text ])
            : target.value;
        const name = target.name;
        if (name == 'newsmlg2') {
            $('#qcodeSelector').toggle('d-none');
        }
        // setState is asynchronous so we update the output after completion using the callback
        this.setState({
            [name]: value
        }, this.refreshOutput);
    }
    copyToClipboard = (e) => {
        this.textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
        e.preventDefault();
    };
    // used by xmlpretty below
    createShiftArr(step) {
        var space = '    ';
        if ( isNaN(parseInt(step)) ) {  // argument is string
            space = step;
        } else { // argument is integer
            switch(step) {
                case 1: space = '  '; break;
                case 2: space = '    '; break;
                case 3: space = '      '; break;
                case 4: space = '        '; break;
                case 5: space = '          '; break;
                case 6: space = '            '; break;
                case 7: space = '              '; break;
                case 8: space = '                '; break;
                case 9: space = '                  '; break;
                case 10: space = '                    '; break;
                case 11: space = '                      '; break;
                case 12: space = '                        '; break;
            }
        }

        var shift = ['\n']; // array of shifts
        for(var ix=0;ix<100;ix++){
            shift.push(shift[ix]+space);
        }
        return shift;
    }
    xmlpretty(text,step) {
        var shift = this.createShiftArr(step);
        var ar = text.replace(/>\s{0,}</g,"><")
                     .replace(/</g,"~::~<")
                     .replace(/\s*xmlns\:/g,"~::~xmlns:")
                     .replace(/\s*xmlns\=/g,"~::~xmlns=")
                     .split('~::~'),
            len = ar.length,
            inComment = false,
            deep = 0,
            str = '',
            ix = 0,
            shift = step ? this.createShiftArr(step) : shift;

        for(ix=0;ix<len;ix++) {
            // start comment or <![CDATA[...]]> or <!DOCTYPE //
            if(ar[ix].search(/<!/) > -1) {
                str += shift[deep]+ar[ix];
                inComment = true;
                // end comment  or <![CDATA[...]]> //
                if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) {
                    inComment = false;
                }
            } else
            // end comment  or <![CDATA[...]]> //
            if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
                str += ar[ix];
                inComment = false;
            } else
            // <elm></elm> //
            if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
                /^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) {
                str += ar[ix];
                if(!inComment) deep--;
            } else
             // <elm> //
            if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
                str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
            } else
             // <elm>...</elm> //
            if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
                str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
            } else
            // </elm> //
            if(ar[ix].search(/<\//) > -1) {
                str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
            } else
            // <elm/> //
            if(ar[ix].search(/\/>/) > -1 ) {
                str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
            } else
            // <? xml ... ?> //
            if(ar[ix].search(/<\?/) > -1) {
                str += shift[deep]+ar[ix];
            } else
            // xmlns //
            if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1) {
                str += shift[deep]+ar[ix];
            }

            else {
                str += ar[ix];
            }
        }

        return  (str[0] == '\n') ? str.slice(1) : str;
    }

    render() {
        var outputtext = "View the generated ninjs data";
        return (
<form name="indata" method="post" onSubmit={this.handleSubmit}>
    <div className="row">
        <div className="col">
            <legend>Enter news metadata</legend>
            <div className="form-row">
                <div className="col form-group">
                    <label htmlFor="firstcreated">First created</label>
                    <input className="form-control form-control-sm" type="date" id="firstcreated" name="firstcreated" size="10" title="Date Created" value={this.state.firstcreated} onChange={this.handleInputChange}  tabIndex="1" />
                </div>
                <div className="col form-group">
                    <label htmlFor="type">Type</label>
                    <select className="form-control form-control-sm" name="type" size="1" tabIndex="2" value={this.state.type} onChange={this.handleInputChange}>
                        <option value="text"> Text </option>
                        <option value="audio"> Audio </option>
                        <option value="video"> Video </option>
                        <option value="picture"> Picture </option>
                        <option value="graphic"> Graphic </option>
                        <option value="composite"> Composite </option>
                        <option value="component"> Component </option>
                    </select>
                </div>
                <div className="col form-group">
                    <label htmlFor="type">Rep. type <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title='Representation type: Indicates the completeness of this representation of the news item' /></label>
                    <select className="form-control form-control-sm" id="representationtype" name="representationtype" size="1" tabIndex="3" value={this.state.representationtype} onChange={this.handleInputChange}>
                        <option value="full"> Full </option>
                        <option value="partial"> Partial </option>
                    </select>
                </div>
                <div className="col form-group">
                    <label htmlFor="pubstatus">Publication status</label>
                    <select className="form-control form-control-sm" id="pubstatus" name="pubstatus" size="1" tabIndex="4" value={this.state.pubstatus} onChange={this.handleInputChange}>
                        <option value="usable"> Usable </option>
                        <option value="withheld"> Withheld </option>
                        <option value="canceled"> Canceled </option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="col form-group">
                    <label htmlFor="pubstatus">Urgency <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title='The editorial urgency of the content from 1 to 9. 1 represents the highest urgency, 9 the lowest' /></label>
                    <select className="form-control form-control-sm" id="urgency" name="urgency" size="1" tabIndex="5" value={this.state.urgency} onChange={this.handleInputChange}>
                        <option value="1"> 1 </option> 
                        <option value="2"> 2 </option> 
                        <option value="3"> 3 </option> 
                        <option value="4"> 4 </option> 
                        <option value="5"> 5 </option> 
                        <option value="6"> 6 </option> 
                        <option value="7"> 7 </option> 
                        <option value="8"> 8 </option> 
                        <option value="9"> 9 </option> 
                    </select>
                </div>
                <div className="col form-group">
                    <label htmlFor="language">Language <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title='Language of both content and metadata items, for the sake of example' /></label>
                    <select className="form-control form-control-sm" id="language" name="language" size="1" width="3" value={this.state.language} onChange={this.handleInputChange} tabIndex="6">
                        <option value="af">Afrikaans</option>
                        <option value="sq">Albanian</option>
                        <option value="ar">Arabic</option>
                        <option value="hy">Armenian</option>
                        <option value="eu">Basque</option>
                        <option value="bn">Bengali</option>
                        <option value="bg">Bulgarian</option>
                        <option value="ca">Catalan</option>
                        <option value="km">Cambodian</option>
                        <option value="zh">Chinese (Mandarin)</option>
                        <option value="hr">Croatian</option>
                        <option value="cs">Czech</option>
                        <option value="da">Danish</option>
                        <option value="nl">Dutch</option>
                        <option value="en">English</option>
                        <option value="et">Estonian</option>
                        <option value="fj">Fijian</option>
                        <option value="fi">Finnish</option>
                        <option value="fr">French</option>
                        <option value="ka">Georgian</option>
                        <option value="de">German</option>
                        <option value="el">Greek</option>
                        <option value="gu">Gujarati</option>
                        <option value="he">Hebrew</option>
                        <option value="hi">Hindi</option>
                        <option value="hu">Hungarian</option>
                        <option value="is">Icelandic</option>
                        <option value="id">Indonesian</option>
                        <option value="ga">Irish</option>
                        <option value="it">Italian</option>
                        <option value="ja">Japanese</option>
                        <option value="jw">Javanese</option>
                        <option value="ko">Korean</option>
                        <option value="la">Latin</option>
                        <option value="lv">Latvian</option>
                        <option value="lt">Lithuanian</option>
                        <option value="mk">Macedonian</option>
                        <option value="ms">Malay</option>
                        <option value="ml">Malayalam</option>
                        <option value="mt">Maltese</option>
                        <option value="mi">Maori</option>
                        <option value="mr">Marathi</option>
                        <option value="mn">Mongolian</option>
                        <option value="ne">Nepali</option>
                        <option value="no">Norwegian</option>
                        <option value="fa">Persian</option>
                        <option value="pl">Polish</option>
                        <option value="pt">Portuguese</option>
                        <option value="pa">Punjabi</option>
                        <option value="qu">Quechua</option>
                        <option value="ro">Romanian</option>
                        <option value="ru">Russian</option>
                        <option value="sm">Samoan</option>
                        <option value="sr">Serbian</option>
                        <option value="sk">Slovak</option>
                        <option value="sl">Slovenian</option>
                        <option value="es">Spanish</option>
                        <option value="sw">Swahili</option>
                        <option value="sv">Swedish</option>
                        <option value="ta">Tamil</option>
                        <option value="tt">Tatar</option>
                        <option value="te">Telugu</option>
                        <option value="th">Thai</option>
                        <option value="bo">Tibetan</option>
                        <option value="to">Tonga</option>
                        <option value="tr">Turkish</option>
                        <option value="uk">Ukranian</option>
                        <option value="ur">Urdu</option>
                        <option value="uz">Uzbek</option>
                        <option value="vi">Vietnamese</option>
                        <option value="cy">Welsh</option>
                        <option value="xh">Xhosa</option>
                    </select>
                </div>
                <div className="col form-group">
                    <label htmlFor="genre">Genre <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title='Values are taken from https://cv.iptc.org/newscodes/genre' /></label>
                    <div className="col-sm-10">
                        <select className="form-control form-control-sm" id="genre" name="genre" size="1" width="3" value={this.state.genre} onChange={this.handleInputChange} tabIndex="7">
                            <option value=""> (None) </option>
                            <option value="Actuality"> Actuality </option>
                            <option value="Advice"> Advice </option>
                            <option value="Advisory"> Advisory </option>
                            <option value="Almanac"> Almanac </option>
                            <option value="Analysis"> Analysis </option>
                            <option value="Archive_material"> Archive material </option>
                            <option value="Background"> Background </option>
                            <option value="Biography"> Biography </option>
                            <option value="Birth_Announcement"> Birth Announcement </option>
                            <option value="Current"> Current </option>
                            <option value="Curtain_Raiser"> Curtain Raiser </option>
                            <option value="Daybook"> Daybook </option>
                            <option value="Exclusive"> Exclusive </option>
                            <option value="Feature"> Feature </option>
                            <option value="Fixture"> Fixture </option>
                            <option value="Forecast"> Forecast </option>
                            <option value="From_the_Scene"> From the Scene </option>
                            <option value="History"> History </option>
                            <option value="Horoscope"> Horoscope </option>
                            <option value="Interview"> Interview </option>
                            <option value="Listing_of_facts"> Listing of facts </option>
                            <option value="Music"> Music </option>
                            <option value="Obituary"> Obituary </option>
                            <option value="Opinion"> Opinion </option>
                            <option value="Polls_and_Surveys"> Polls and Surveys </option>
                            <option value="Press_Release"> Press Release </option>
                            <option value="Press-Digest"> Press-Digest </option>
                            <option value="Profile"> Profile </option>
                            <option value="Program"> Program </option>
                            <option value="Question_and_Answer_Session"> Question and Answer Session </option>
                            <option value="Quote"> Quote </option>
                            <option value="Raw_Sound"> Raw Sound </option>
                            <option value="Response_to_a_Question"> Response to a Question </option>
                            <option value="Results_Listings_and_Statistics"> Results Listings and Statistics </option>
                            <option value="Retrospective"> Retrospective </option>
                            <option value="Review"> Review </option>
                            <option value="Scener"> Scener </option>
                            <option value="Side_bar_and_supporting_information"> Side bar and supporting information </option>
                            <option value="Special_Report"> Special Report </option>
                            <option value="Summary"> Summary </option>
                            <option value="Synopsis"> Synopsis </option>
                            <option value="Text_only"> Text only </option>
                            <option value="Transcript_and_Verbatim"> Transcript and Verbatim </option>
                            <option value="Update"> Update </option>
                            <option value="Voicer"> Voicer </option>
                            <option value="Wrap"> Wrap </option>
                            <option value="Wrapup"> Wrapup </option>
                        </select>
                    </div>
                </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-2 col-form-label" htmlFor="headline">Headline</label>
                    <div className="col-sm-10">
                        <input className="form-control form-control-sm" type="text" id="headline" name="headline" size="40" title="Headline" value={this.state.headline} onChange={this.handleInputChange}  tabIndex="8" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-2 col-form-label" htmlFor="subheadline">Sub-headline</label>
                    <div className="col-sm-10">
                        <input className="form-control form-control-sm" id="subheadline" name="subheadline" size="40" title="subheadline" value={this.state.subheadline} onChange={this.handleInputChange} tabIndex="9" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-2 col-form-label" htmlFor="profile">Provider <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title="The supplier of this news item. Used to generate the uri which uniquely identifies this news item."/></label>
                    <div className="col-sm-4">
                        <input className="form-control form-control-sm" type="text" id="provider" name="provider" size="25" title="Provider of this news item" value={this.state.provider} onChange={this.handleInputChange} tabIndex="10" />
                    </div>
                    <label className="col-sm-2 col-form-label" htmlFor="profile">Profile <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title="An identifier for the structure of the news object. This can be any string but we suggest something identifying the structure of the content such as 'text-only' or 'text-photo'. Profiles are typically provider-specific."/></label>
                    <div className="col-sm-4">
                        <input className="form-control form-control-sm" type="text" id="profile" name="profile" size="25" title="Profile" value={this.state.profile} onChange={this.handleInputChange} tabIndex="11" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-3 col-form-label" htmlFor="copyrightholder">Copyright holder</label>
                    <div className="col-sm-9">
                        <input className="form-control form-control-sm" type="text" id="copyrightholder" name="copyrightholder" size="40" title="Copyright holder" value={this.state.copyrightholder} onChange={this.handleInputChange} tabIndex="12" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-3 col-form-label" htmlFor="copyrightnotice">Copyright notice</label>
                    <div className="col-sm-9">
                        <input className="form-control form-control-sm" type="text" id="copyrightnotice" name="copyrightnotice" size="40" title="Copyright notice" value={this.state.copyrightnotice} onChange={this.handleInputChange} tabIndex="13" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-3 col-form-label" htmlFor="usageterms">Usage terms</label>
                    <div className="col-sm-9">
                        <input className="form-control form-control-sm" type="text" id="usageterms" name="usageterms" size="40" title="Usage Terms" value={this.state.usageterms} onChange={this.handleInputChange} tabIndex="14" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-2 col-form-label" htmlFor="slugline">Slugline <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title="A human-readable identifier for the item." /></label>
                    <div className="col-sm-10">
                        <input className="form-control form-control-sm" type="text" id="slugline" name="slugline" size="40" title="Slugline" value={this.state.slugline} onChange={this.handleInputChange} tabIndex="15" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-2 col-form-label" htmlFor="bodytext">Body text</label>
                    <div className="col-sm-10">
                        <textarea className="form-control form-control-sm" id="bodytext" name="bodytext" rows="5" wrap="virtual" cols="60" value={this.state.bodytext} onChange={this.handleInputChange} tabIndex="16"></textarea>
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-2 col-form-label" htmlFor="by">By <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title="Also known as 'byline'"/></label>
                    <div className="col-sm-10">
                        <input className="form-control form-control-sm" type="text" id="by" name="by" size="40" title="By" value={this.state.by} onChange={this.handleInputChange} tabIndex="17" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-2 col-form-label" htmlFor="location">Location <i className="fas fa-info-circle" data-toggle="tooltip" data-placement="top" title="The name of the location from which the content originates. ninjs also includes 'places' for named locations."/></label>
                    <div className="col-sm-10">
                        <input className="form-control form-control-sm" type="text" id="location" name="location" size="40" title="Location" value={this.state.location} onChange={this.handleInputChange} tabIndex="18" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-2 col-form-label" htmlFor="altidName">Alt Id - Role</label>
                    <div className="col-sm-4">
                        <input className="form-control form-control-sm" type="text" id="altid_role" name="altid_role" size="25" title="Alternative ID - role" value={this.state.altid_role} onChange={this.handleInputChange} tabIndex="19" />
                    </div>
                    <label className="col-sm-2 col-form-label" htmlFor="profile">Alt Id - Value</label>
                    <div className="col-sm-4">
                        <input className="form-control form-control-sm" type="text" id="altid_value" name="altid_value" size="25" title="Alternative ID - value" value={this.state.altid_value} onChange={this.handleInputChange} tabIndex="20" />
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-3 col-form-label" htmlFor="medtop">IPTC Media Topic(s)</label>
                    <div className="col-sm-9">
                        <select className="form-control form-control-sm" id="medtop" name="medtop" size="5" width="25" multiple={true} title="Select the applicable codes." value={this.state.medtop.map(s=>s[0])} onChange={this.handleInputChange} tabIndex="21">
                            <option value="01000000">Arts, culture, entertainment and media</option>
                            <option value="02000000">Crime, law and justice</option>
                            <option value="03000000">Disaster and accident</option>
                            <option value="04000000">Economy, business and finance</option>
                            <option value="05000000">Education</option>
                            <option value="06000000">Environmental issues</option>
                            <option value="07000000">Health</option>
                            <option value="08000000">Human interest</option>
                            <option value="09000000">Labour</option>
                            <option value="10000000">Lifestyle and leisure</option>
                            <option value="11000000">Politics</option>
                            <option value="12000000">Religion and belief</option>
                            <option value="13000000">Science and technology</option>
                            <option value="14000000">Social issues</option>
                            <option value="15000000">Sport</option>
                            <option value="16000000">Unrest, conflict and war</option>
                            <option value="17000000">Weather</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <label className="col-sm-3 col-form-label" htmlFor="ednote">Editorial Note</label>
                    <div className="col-sm-9">
                        <input className="form-control form-control-sm" type="text" id="ednote" name="ednote" size="40" title="Editorial note" value={this.state.ednote} onChange={this.handleInputChange} tabIndex="22"/>
                    </div>
                </div>
        </div>
        <div className="col">
            <div className="outputbox">
                <legend>{outputtext} &nbsp; <small><a href="#" onClick={this.copyToClipboard}>Copy to clipboard <i className="fas fa-copy" /></a></small></legend>
                <div className="form-row">
                    <div className="col-sm-6">
                        Choose output format:
                    </div>
                    <div className="col-sm-5">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" defaultChecked name="outputformat" id="ninjs20" value="ninjs20" title="Output format - ninjs 2.0" onChange={this.handleInputChange} tabIndex="23" />&nbsp;
                            <label className="form-check-label" htmlFor="ninjs20">ninjs 2.0</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="outputformat" id="ninjs13" value="ninjs13" title="Output format - ninjs 1.3" onChange={this.handleInputChange} tabIndex="24" />&nbsp;
                            <label className="form-check-label" htmlFor="ninjs13">ninjs 1.3</label>
                        </div>
                    </div>
                </div>
                <textarea className="form-control" name="output" style={{'height': '100%', 'fontSize': '12px'}} rows="40" tabIndex="25" value={this.state.output} ref={(textarea) => this.textArea = textarea} readOnly tabIndex="25"></textarea>
            </div>
        </div>
    </div>
</form>
        )
    }
}

const domContainer = document.querySelector('#reactcontainer');
ReactDOM.render(<NinjsGenerator/>, domContainer);
