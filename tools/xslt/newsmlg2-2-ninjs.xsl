<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="text" encoding="UTF-8"/>
    
    <!-- Example xslt to illustrate conversion of a NewsML-G2 newsitem to a ninjs item.
        It uses the sample TT_newsmlg2_sample.xml so xpath's is specific to this variant of NewsML-G2.
        But the ideas can be used in other environments.
    -->
    
    <!-- MATCHES EVERYTHING, CREATES A JSON OBJECT, THEN CALLS A SUB-TEMPLATE TO GRAB AND ESCAPE THE NITF BODY CONTENT -->
    <xsl:template match="/">
        <xsl:variable name="mainid" select="/newsMessage/itemSet/packageItem/groupSet/group[@role = 'group:main']/itemRef/@residref"/>
        <xsl:variable name="created" select="/newsMessage/itemSet/newsItem[@guid = $mainid]/itemMeta/versionCreated"/>        
        <xsl:variable name="pubstat" select="substring-after(/newsMessage/itemSet/newsItem[@guid = $mainid]/itemMeta/pubStatus/@qcode,'stat:')"/>        
        <xsl:variable name="headline" select="/newsMessage/itemSet/newsItem[@guid = $mainid]/contentMeta/headline"/>        
        <xsl:variable name="slugline" select="/newsMessage/itemSet/newsItem[@guid = $mainid]/contentMeta/slugline"/>        
        <xsl:variable name="urg" select="/newsMessage/itemSet/newsItem[@guid = $mainid]/contentMeta/urgency"/>        
        <xsl:variable name="version" select="/newsMessage/itemSet/newsItem[@guid = $mainid]/@version"/>        
        
        
        <xsl:text>{</xsl:text>
        <xsl:text>   "uri":  "</xsl:text><xsl:value-of select="$mainid"/><xsl:text>",</xsl:text>
        <xsl:text>   "type": "text",</xsl:text>
        <xsl:text>   "versioncreated": "</xsl:text><xsl:value-of select="$created"/><xsl:text>",</xsl:text>
        <xsl:text>   "version": "</xsl:text><xsl:value-of select="$version"/><xsl:text>",</xsl:text>
        <xsl:text>   "pubstatus": "</xsl:text><xsl:value-of select="$pubstat"/><xsl:text>",</xsl:text>
        <xsl:text>   "urgency": </xsl:text><xsl:value-of select="$urg"/><xsl:text>,</xsl:text>
        <xsl:text>   "slugline": "</xsl:text><xsl:value-of select="$slugline"/><xsl:text>",</xsl:text>
        <xsl:text>   "subjects": [ </xsl:text>
            <xsl:for-each select="/newsMessage/itemSet/newsItem[@guid = $mainid]/contentMeta/subject[@type = 'cpnat:abstract']">
                <xsl:variable name="mtopic" select="substring-after(./@qcode,'medtop:')"/>
                <xsl:variable name="uri" select="./@typeuri"/>
                <xsl:text>        {"uri": "</xsl:text><xsl:value-of select="$uri"/><xsl:value-of select="$mtopic"/><xsl:text>", "literal": "</xsl:text><xsl:value-of select="$mtopic"/><xsl:text>", "name": "</xsl:text><xsl:value-of select="./name"/><xsl:text>"}</xsl:text>
                <xsl:if test="position() != last()"><xsl:text>,</xsl:text></xsl:if>                
            </xsl:for-each>
        <xsl:text>],</xsl:text>
        <xsl:text>   "headlines": [{"value": "</xsl:text><xsl:call-template name="json-escape-xml"><xsl:with-param name="text" select="$headline" /></xsl:call-template><xsl:text>"}],</xsl:text>
        <xsl:variable name="type" select="/newsMessage/itemSet/newsItem[@guid = $mainid]/contentSet/inlineXML/@contenttypevariant"/>
        <xsl:text>   "bodies": [{"role": "</xsl:text><xsl:value-of select="$type"/><xsl:text>", "value": "</xsl:text><xsl:apply-templates select="/newsMessage/itemSet/newsItem[@guid = $mainid]/contentSet/inlineXML/html" mode="recur-copy-escape"/>" <xsl:text>}]}</xsl:text>
    </xsl:template>
        
    <!-- THIS IS THE ENTRY POINT FOR RECURSIVE COPY WITH ESCAPING,
    WHICH MATCHES EVERYTHING THEN USES THE TEMPLATES BELOW TO
    HANDLE TEXT AND COMMENTS. SOME THINGS ARE OMITTED FROM THIS
    EXAMPLE, LIKE NAMESPACES. -->
    <xsl:template match="*" mode="recur-copy-escape">
        <xsl:text disable-output-escaping="yes">&lt;</xsl:text>
        <xsl:value-of select="name(.)"/>
        <xsl:text> </xsl:text>
        <xsl:for-each select="@*">
            <xsl:value-of select="local-name()"/>=\"<xsl:value-of select="."/><xsl:text>\" </xsl:text>
        </xsl:for-each>
        <xsl:text disable-output-escaping="yes">&gt;</xsl:text>
        <xsl:apply-templates select="*|text()|comment()" mode="recur-copy-escape"/>
        <xsl:text disable-output-escaping="yes">&lt;/</xsl:text>
        <xsl:value-of select="local-name()"/>
        <xsl:text disable-output-escaping="yes">&gt;</xsl:text>
    </xsl:template>
    
    <!--  HANDLES TEXT NODES IN THE RECURSIVE COPY, AND USES THE TEMPLATE BELOW TO ESCAPE THE CONTENT  -->
    <xsl:template match="text()" mode="recur-copy-escape">
        <xsl:call-template name="json-escape-xml">
            <xsl:with-param name="text" select="."/>
        </xsl:call-template>
    </xsl:template>
    
    <!--  HANDLES COMMENT NODES IN THE RECURSIVE COPY, AND USES THE TEMPLATE BELOW TO ESCAPE THE CONTENT  -->
    <xsl:template match="comment()" mode="recur-copy-escape">
        <xsl:text disable-output-escaping="yes">&lt;</xsl:text>
        <xsl:text>!--</xsl:text>
        <xsl:call-template name="json-escape-xml">
            <xsl:with-param name="text" select="."/>
        </xsl:call-template>
        <xsl:text>--</xsl:text>
        <xsl:text disable-output-escaping="yes">&gt;</xsl:text>
    </xsl:template>
    
    
    <!--  ESCAPE XML CONTENT FOR INCLUSION IN JSON OBJECTS -->
    <!--  ESCAPES QUOTES as \" NEWLINES AS \n SLASHES as \\ AND TABS as \t -->
    <xsl:template name="json-escape-xml">
        <xsl:param name="text"/>
        <xsl:if test="$text != ''">
            <xsl:variable name="head" select="substring($text, 1, 1)"/>
            <xsl:variable name="tail" select="substring($text, 2)"/>
            <xsl:choose>
                <xsl:when test="$head = '&#xA;'">\n</xsl:when>
                <xsl:when test="$head = '\'">\\</xsl:when>
                <xsl:when test="$head = '&quot;'">\"</xsl:when>
                <xsl:when test="$head = '&#x9;'">\t</xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$head"/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:call-template name="json-escape-xml">
                <xsl:with-param name="text" select="$tail"/>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>
    


</xsl:stylesheet>