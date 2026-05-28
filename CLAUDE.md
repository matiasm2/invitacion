# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a wedding invitation website for Lili and Mati's wedding on November 29, 2026. It's a static site with three distinct presentation variants, all using vanilla HTML/CSS/JavaScript with no build process or dependencies.

## Running the Project

**Start the development server:**
```bash
python3 server.py
```

The server runs on `http://localhost:8000` with no-cache headers to prevent stale content during development.

**Available versions:**
- `http://localhost:8000/` or `/index.html` — Main scrollable version
- `/snap.html` — Full-screen snap-scroll version (scroll-snap-type)
- `/parallax.html` — Parallax effect version with fixed background attachment

## Project Structure

```
├── index.html                    # Main version: scrollable layout
├── styles.css                    # Main version styles
├── script.js                     # Main version scripts
├── snap/
│   ├── index.html               # Snap scroll version: full-screen sections
│   ├── styles.css               # Snap version styles
│   └── script.js                # Snap version scripts
├── parallax/
│   ├── index.html               # Parallax version: fixed background scroll
│   ├── styles.css               # Parallax version styles
│   └── script.js                # Parallax version scripts
├── server.py                    # Development server (Python 3, no dependencies)
└── images/photos/               # Photo gallery files (19 JPEG images)
```

## Architecture & Key Concepts

### Three HTML Versions (Same Content, Different Interactions)

Each version is isolated in its own directory with separate HTML, CSS, and JavaScript files:

- **Root (`/`)**: Traditional scrollable layout, sections flow naturally with photo gallery rotation
- **Snap (`/snap/`)**: Uses CSS `scroll-snap-type: y mandatory` with full-screen sections, creates a snappy "slide" feeling
- **Parallax (`/parallax/`)**: Uses `background-attachment: fixed` on sections for parallax effect; includes a sticky header with event title and date

All three versions contain identical content but different styling and interactions. The JavaScript for each version is tailored to that version's structure.

### Styling Organization

Each version has its own `styles.css` file:
- **Root `styles.css`**: Contains layout for traditional scrollable version, photo gallery styling, countdown, content sections, buttons, and responsive design
- **Snap `styles.css`**: Snap-scroll container and section styling, header positioning, countdown, and content wrappers
- **Parallax `styles.css`**: Parallax sections with fixed background attachments, content cards, sticky header, and iOS-friendly fallback media queries

All versions use the same Google Fonts (Tangerine, Cinzel, Montserrat, Special Elite, Courier Prime).

### Photo Gallery Rotation

- **Root version**: Rotates a single photo element every 8 seconds via `rotatePhotos()` in `script.js`
- **Snap version**: Assigns random photos to each snap-section.photo element on page load via `getRandomImage()`
- **Parallax version**: Assigns random background images to parallax sections on page load, with iOS detection to disable parallax on mobile devices

All versions use the same 19-photo array from `images/photos/`.

### Interactive Features (All Versions)

- **Countdown Timer**: Updates every second, displays days/hours/minutes/seconds to wedding date (Nov 29, 2026, 11:00 AM)
- **Calendar Download**: Generates an iCal (.ics) file with event details
- **External Links**: Google Forms for dietary restrictions and RSVP, Google Maps for location
- **Bank Transfer Display**: Shows transfer alias (`lili.mati.29`) in a styled box

## Development Notes

- **No build step or dependencies**: This is a pure HTML/CSS/JS project; all changes are directly reflected on page refresh
- **Isolated versions**: Each version (root, snap, parallax) is completely self-contained with its own HTML, CSS, and JS. Changes to one version do NOT affect others.
- **Image paths**: Root version uses `images/photos/`, snap and parallax versions use `../images/photos/` (relative paths from their subdirectories)
- **Timezone**: Wedding date is hardcoded for Argentina/Buenos Aires timezone in each version's JavaScript
- **Image assets**: Photos are referenced individually by filename; all 19 should exist in `images/photos/` for the galleries to work
- **Forms**: Link to external Google Forms; responses are not stored in this repo
- **Content language**: All text is in Spanish (Argentine Spanish)

## Common Tasks

**Test a variant**: Open the desired version in the browser:
- Root: `http://localhost:8000/`
- Snap: `http://localhost:8000/snap/`
- Parallax: `http://localhost:8000/parallax/`

**Add or update event details**: The countdown date (Nov 29, 2026, 11:00 AM) is hardcoded in each version's `script.js` file. Update the `weddingDate` in all three locations if needed. Update location/time text in the respective HTML files.

**Update the photo gallery**: 
1. Add new images to `images/photos/`
2. Update the `images` array in each version's `script.js` file

**Adjust styling**: 
- Root styling: Edit `styles.css`
- Snap styling: Edit `snap/styles.css`
- Parallax styling: Edit `parallax/styles.css`

**Modify HTML structure**: Each version's HTML is independent. Changes to root `index.html` do NOT affect snap or parallax versions.
