XSLT
==========================

Here you find three samples of converting various variants of xml to ninjs (json).

nitf-to-json.xslt uses the NTB_nitf_sample.xml to produce a ninjs item, picking up some metadata and making sure the nitf body is ok in the json environment.

newsml12-2-json.xsl uses the afp.com_newsml1.2_sample.xml to show the conversion of a NewsML 1.2 item to ninjs.

newsmlg2-2-ninjs.xsl uses the TT_newsmlg2_samples.xml to show conversion of a NewsML G2 item to ninjs.

Please note that all three are conversions specific to the respective variant of xml items. So the xslt files are not general conversion tools, but samples that you can use as a start for your own conversion.

2021-09-21