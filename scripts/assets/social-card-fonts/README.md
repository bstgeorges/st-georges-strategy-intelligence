# Social-card font sources

These TrueType files are used only while `scripts/publish_site_bundle.mjs` rasterises social cards. They are deliberately kept outside `site/`, so they are not shipped to readers.

- `PlayfairDisplay[wght].ttf` is the official Playfair Display variable font from the [Google Fonts source repository](https://github.com/google/fonts/tree/main/ofl/playfairdisplay), licensed under OFL-1.1.
- `JetBrainsMono-Regular.ttf` and `JetBrainsMono-Bold.ttf` are the official JetBrains Mono files from the [JetBrains Mono repository](https://github.com/JetBrains/JetBrainsMono/tree/master/fonts/ttf), licensed under OFL-1.1.

The renderer disables system-font discovery and loads only these files. The public site continues to serve its smaller WOFF2 web-font subset from `site/assets/fonts/`.
