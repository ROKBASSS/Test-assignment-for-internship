<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:strip-space elements="*"/>

<!-- identity transform -->
<xsl:template match="@*|node()">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>

<xsl:template match="строка">
    <mrow>
        <xsl:apply-templates/>
    </mrow>
</xsl:template>

<xsl:template match="операнд">
    <mi>
        <xsl:apply-templates/>
    </mi>
</xsl:template>

<xsl:template match="оператор">
    <mo>
        <xsl:apply-templates/>
    </mo>
</xsl:template>

<xsl:template match="число">
    <mn>
        <xsl:apply-templates/>
    </mn>
</xsl:template>

<xsl:template match="корень">
    <msqrt>
        <xsl:apply-templates/>
    </msqrt>
</xsl:template>

<xsl:template match="дробь">
    <mfrac>
        <xsl:apply-templates/>
    </mfrac>
</xsl:template>

<xsl:template match="низ">
    <msub>
        <xsl:apply-templates/>
    </msub>
</xsl:template>

<xsl:template match="верх">
    <msup>
        <xsl:apply-templates/>
    </msup>
</xsl:template>

<xsl:template match="низверх">
    <msubsup>
        <xsl:apply-templates/>
    </msubsup>
</xsl:template>

<xsl:template match="math">
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Lab 1.1</title>
</head>
<body>
    <xsl:apply-templates/>
</body>
</html>
</xsl:template>


</xsl:stylesheet>