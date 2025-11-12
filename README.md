# AutoFill Context Menu

Right-click to fill forms faster. This lightweight Chrome/Chromium extension adds an “AutoFill” item to your page context menu so you can insert your saved snippets (name, address, common replies, etc.) directly into inputs without typing.

> Demo video: https://youtu.be/B19XhWmy_yM

---

## Features

- **Right-click → AutoFill**: Insert a preset into the focused field with one click.
- **Custom presets**: Add/edit your own snippets from the extension’s Options page.
- **Simple & local**: Presets are stored in your browser; no external services.

> Repo contains a standard WebExtension layout (`manifest.json`, `background.js`, `contentScript.js`, `options.html`/`options.js`, `popup.html`, `icons/`). :contentReference[oaicite:0]{index=0}

---

## Install (Developer Mode)

1. **Clone the repo**
   ```bash
   git clone https://github.com/Kijimu7/AutoFillContextMenu.git
   cd AutoFillContextMenu
