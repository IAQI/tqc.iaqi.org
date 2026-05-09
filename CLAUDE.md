# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a static archive repository for historic TQC (Theory of Quantum Computation, Communication and Cryptography) conference websites. It contains snapshot copies of conference websites from different years (2006-2025) hosted at https://tqc.iaqi.org/ via GitHub Pages.

## Repository Structure

The repository is organized by year, with each year's conference in its own directory:

- `20XX/` - Each year contains a complete static website (HTML, CSS, JS, images)
- `index.html` - Root landing page linking to all archived years
- `README.md` - Documentation on wget commands used to download sites
- `CNAME` - GitHub Pages custom domain configuration
- `2025old/` - Backup of 2025 content before updates
- `web.archive.org/` - Content downloaded from Wayback Machine
- `simplystatic/` - WordPress plugin exports
- `temp/`, `websites/`, `tqc-conference.org/` - Working directories (not part of archives)

## Website Technologies by Year

The archived sites use different technologies based on when they were created:

- **2006-2008**: Basic HTML/CSS with minimal JavaScript (simple static sites from Japan-hosted conferences)
- **2015, 2017**: Custom static HTML with templating (LIPIcs proceedings era)
- **2019-2022**: WordPress-based sites (exported to static HTML)
- **2025**: WordPress-based (current active conference site)

## Common Tasks

### Viewing the Archive Locally

Open `index.html` in a browser to see the landing page with links to all years. Each year's site is self-contained in its directory.

### Downloading New Conference Archives

Use the wget commands documented in README.md. Two primary methods:

1. **From live sites**:
```bash
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent \
     --wait=0.5 --random-wait --compression=auto \
     --user-agent="Mozilla/5.0..." \
     https://example-tqc-site.org/
```

2. **From Wayback Machine**:
```bash
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent \
     --no-check-certificate --wait=0.5 --random-wait --compression=auto \
     --user-agent="Mozilla/5.0..." \
     --reject-regex ".*(web\.archive\.org/web/[0-9]+[a-z_]*/|/static/|/__wb/)" \
     https://web.archive.org/web/TIMESTAMP/https://original-url.org/
```

### Adding a New Year

1. Download the site using wget (see README.md)
2. Move the downloaded directory to the root as `20XX/`
3. Update `index.html` to add a link to the new year
4. Verify all internal links work (wget's `--convert-links` should handle this)
5. Commit and push to deploy via GitHub Pages

### Editing the Landing Page

The main `index.html` is a simple static HTML file. When adding new years, maintain the chronological list format with links to `20XX/index.html`.

## WordPress-Based Archives (2019-2025)

The WordPress sites (2019, 2020, 2021, 2022, 2025) were exported to static HTML. These contain:

- `wp-content/` - WordPress assets (themes, plugins, uploads)
- `wp-json/` - REST API endpoints (static snapshots)
- `feed/`, `comments/feed/` - RSS feeds (static snapshots)
- Complex directory structures with WordPress URL patterns

Do not attempt to run these as WordPress sites - they are static exports only.

## Bibliographic Data

The repository includes a comprehensive bibliography of TQC conference publications:

- **Location**: `publications/teachpress_publications.bib`
- **Format**: BibTeX (UTF-8 encoded)
- **Source**: Exported from TeachPress WordPress plugin (version 9.0.6)
- **Content**: 890 entries including:
  - 723 Posters
  - 92 Talks
  - 59 Workshops
  - 14 Conference papers
- **Coverage**: Multiple TQC years including 2023 and 2024
- **Retrieved**: December 22, 2025 from WordPress database

This file was retrieved from the live WordPress site at `http://fs3x4avdgq.preview.infomaniak.website/` where TeachPress stores publication data in the database (`wp_846550_teachpress_*` tables).

## Important Notes

- This is a **static archive only** - no build process, no development server needed
- All sites are pre-built HTML/CSS/JS that can be served directly
- Links between years should use relative paths
- The repository is deployed via GitHub Pages at https://tqc.iaqi.org/
- Main branch is used for GitHub Pages deployment
- Untracked directories (`temp/`, `websites/`, etc.) are for temporary work and should not be committed

## File Editing Guidelines

When editing HTML files:
- Maintain consistent link formats (relative paths preferred)
- Preserve original site styling and structure
- Be cautious with WordPress-exported sites - their structure is auto-generated
- Test local file:// links work before committing
