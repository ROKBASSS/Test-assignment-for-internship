<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <xsl:variable name="width" select="root/графика/эллипс/ширина" />
            <xsl:variable name="height" select="root/графика/эллипс/высота" />
            <body>
                <svg width='{$width}' height='{$height}'
                    xmlns="http://www.w3.org/2000/svg">
                    <xsl:for-each select="root/графика/эллипс">
                        <xsl:variable name="id">
                            <xsl:value-of select="@id" />
                        </xsl:variable>
                        <xsl:variable name="fill">
                            <xsl:value-of select="@заливка" />
                        </xsl:variable>
                        <xsl:variable name="stroke">
                            <xsl:value-of select="@ободок" />
                        </xsl:variable>
                        <xsl:variable name="stroke-width">
                            <xsl:value-of select="@ширина-ободка" />
                        </xsl:variable>
                        <xsl:variable name="cx">
                            <xsl:value-of select="@cx" />
                        </xsl:variable>
                        <xsl:variable name="cy">
                            <xsl:value-of select="@cy" />
                        </xsl:variable>
                        <xsl:variable name="rx">
                            <xsl:value-of select="@rx" />
                        </xsl:variable>
                        <xsl:variable name="ry">
                            <xsl:value-of select="@ry" />
                        </xsl:variable>
                        <ellipse cx="{$cx}" cy="{$cy}" rx="{$rx}" ry="{$ry}" fill="{$fill}" stroke="{$stroke}" stroke-width="{$stroke-width}"/>
                    </xsl:for-each>
                </svg>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
