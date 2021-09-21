<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="text" encoding="UTF-8"/>
    
    <!-- Example xslt to illustrate conversion of a NewsML-1.2 newsitem to a ninjs item.
        It uses the sample afp.com_newsml1.2_sample.xml so xpath's is specific to this variant of NewsML.
        But the ideas can be used in other environments.
    -->
    
    <!-- MATCHES EVERYTHING, CREATES A JSON OBJECT, THEN CALLS A SUB-TEMPLATE TO GRAB AND ESCAPE THE NITF BODY CONTENT -->
    <xsl:template match="/">
        <xsl:variable name="itemid" select="/NewsML/NewsItem/Identification/NewsIdentifier/PublicIdentifier"/>        
        <xsl:variable name="createdorg" select="/NewsML/NewsItem/NewsManagement/ThisRevisionCreated"/>        
        <xsl:variable name="pubstat" select=" lower-case(/NewsML/NewsItem/NewsManagement/Status/@FormalName)"/>  
        <xsl:variable name="ednote" select="/NewsML/NewsItem/NewsComponent[1]/NewsLines/NewsLine[NewsLineType/@FormalName = 'AdvisoryLine']/NewsLineText"/>        
        <xsl:variable name="headline" select="/NewsML/NewsItem/NewsComponent[1]/NewsLines/HeadLine"/>        
        <xsl:variable name="slugline" select="/NewsML/NewsItem/Identification/NameLabel"/>        
        <xsl:variable name="urg" select="/NewsML/NewsItem/NewsManagement/Urgency/@FormalName"/>        
        <xsl:variable name="version" select="/NewsML/NewsItem/Identification/NewsIdentifier/RevisionId"/>  
        
        <xsl:variable name="created"><xsl:value-of select="concat(substring($createdorg,1,4),'-',substring($createdorg,5,2),'-',substring($createdorg,7,2),'T',substring($createdorg,10,2),':',substring($createdorg,12,2),':',substring($createdorg,14,3),substring($createdorg,17,2),':',substring($createdorg,19,3))"/></xsl:variable>
        
        
        <xsl:text>{</xsl:text>
        <xsl:text>   "uri":  "</xsl:text><xsl:value-of select="$itemid"/><xsl:text>",</xsl:text>
        <xsl:text>   "type": "text",</xsl:text>
        <xsl:text>   "versioncreated": "</xsl:text><xsl:value-of select="$created"/><xsl:text>",</xsl:text>
        <xsl:text>   "version": "</xsl:text><xsl:value-of select="$version"/><xsl:text>",</xsl:text>
        <xsl:text>   "pubstatus": "</xsl:text><xsl:value-of select="$pubstat"/><xsl:text>",</xsl:text>
        <xsl:text>   "urgency": </xsl:text><xsl:value-of select="$urg"/><xsl:text>,</xsl:text>
        <xsl:text>   "ednote": "</xsl:text><xsl:value-of select="$ednote"/><xsl:text>",</xsl:text>
        <xsl:text>   "slugline": "</xsl:text><xsl:value-of select="$slugline"/><xsl:text>",</xsl:text>
        <xsl:text>   "headlines": [{"value": "</xsl:text><xsl:call-template name="json-escape-xml"><xsl:with-param name="text" select="$headline" /></xsl:call-template><xsl:text>"}],</xsl:text>
        <xsl:variable name="type" select="/NewsML/NewsItem/NewsComponent/ContentItem/Format/@FormalName"/>
        <xsl:text>   "bodies": [{"role": "</xsl:text><xsl:value-of select="$type"/><xsl:text>", "value": "</xsl:text><xsl:apply-templates select="/NewsML/NewsItem/NewsComponent/ContentItem/DataContent/nitf" mode="recur-copy-escape"/>" <xsl:text>}]}</xsl:text>
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