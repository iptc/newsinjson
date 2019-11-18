<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
 
  <xsl:output method="text" encoding="UTF-8"/>
 
  <!-- MATCHES EVERYTHING, CREATES A JSON OBJECT, THEN CALLS A SUB-TEMPLATE TO GRAB AND ESCAPE THE NITF BODY CONTENT -->
  <xsl:template match="/">
    <xsl:text>{</xsl:text>
    <xsl:text>   "body_nitf": "</xsl:text><xsl:apply-templates select="/nitf/body"/>" <xsl:text>}</xsl:text>
  </xsl:template>
 
  <!-- GRAB AND ESCAPES THE NITF BODY -->
  <xsl:template match="/nitf/body">
    <xsl:apply-templates select="node()" mode="recur-copy-escape"/>
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
