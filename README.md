# Gymnovite

Marketing website for Gymnovite — science-based strength training, neuro training, and Reiki/sound healing treatments by Christina Lövald Hellberg.

Static site, no build step, no dependencies:

- `index.html` — Home
- `styrketraning.html` — Strength Training
- `neurotraning.html` — Neuro Training
- `behandlingar.html` — Treatments
- `om-oss.html` — About
- `kontakt.html` — Contact, with a contact form that opens a pre-filled email draft (no backend)
- `boka.html` — Booking, with a direct booking email link per session type
- `style.css`, `app.js` — shared styles and behavior (incl. the Swedish/English language switch)

Every page carries a Swedish/English switch in the header and footer (`data-i18n` attributes + a small script in `app.js`), Swedish by default, remembered across pages via `localStorage`.

## Run locally

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploy

This is a static site — it can be served directly by GitHub Pages with no build step. See repo Settings → Pages.
