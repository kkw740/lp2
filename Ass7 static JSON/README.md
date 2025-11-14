# Ass7 - Participant List (Static JSON)

This page displays a Participant table for a selected event using static JSON data.

Files:

- `index.html` — UI with event selector, search box, and participant table
- `styles.css` — Basic styling
- `script.js` — Loads JSON (with offline fallback) and renders the table
- `data/events.json` — Sample events with participant arrays

## How to open

- Double-click `index.html` to open in your browser, or run:

```powershell
start "c:\Users\sgban\Desktop\LP_2\Ass7 static JSON\index.html"
```

Note: Some browsers block `fetch()` for local files. If that happens, this page automatically uses built‑in fallback data so it still works.

## How it works

- Events are loaded from `data/events.json`. If that fails (file://), the script uses built-in data.
- Choose an event from the dropdown to populate the table.
- Type in the search box to filter by name, email, reg no, or mobile.
- A small counter shows how many participants are displayed.

## Customize

- Edit `data/events.json` to change events or participants.
- Or update the `fallback` object in `script.js` if you prefer keeping it entirely offline.
