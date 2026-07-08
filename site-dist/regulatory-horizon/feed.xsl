<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="rss/channel/title"/></title>
        <style>
          body { margin: 0; background: #e7e1d3; color: #15140f; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.55; }
          main { max-width: 980px; margin: 0 auto; padding: 32px 24px 64px; }
          .eyebrow { margin: 0 0 12px; color: #a07e2e; font: 600 12px ui-monospace, SFMono-Regular, monospace; letter-spacing: .16em; text-transform: uppercase; }
          h1 { margin: 0 0 12px; font: 700 clamp(34px, 6vw, 62px) Georgia, serif; line-height: 1.02; }
          p { max-width: 70ch; margin: 0 0 16px; }
          .note { color: #6b6555; font-size: 14px; }
          .item { padding: 20px 0; border-top: 1px solid rgba(15,34,51,.16); }
          .meta { color: #6b6555; font-size: 14px; }
          a { color: #0f2233; }
        </style>
      </head>
      <body>
        <main>
          <p class="eyebrow">RSS feed</p>
          <h1><xsl:value-of select="rss/channel/title"/></h1>
          <p><xsl:value-of select="rss/channel/description"/></p>
          <p class="note">This is the regulatory horizon feed in a browser-friendly view. Feed readers and automation can still consume the same URL as RSS XML.</p>
          <xsl:for-each select="rss/channel/item">
            <article class="item">
              <p class="meta">
                <xsl:value-of select="pubDate"/>
                <xsl:if test="category">
                  <xsl:text> / </xsl:text>
                  <xsl:value-of select="category"/>
                </xsl:if>
              </p>
              <h2><a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute><xsl:value-of select="title"/></a></h2>
              <p><xsl:value-of select="description"/></p>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
