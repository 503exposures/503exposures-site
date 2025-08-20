# 503 Exposures — Auto Gallery (Daily uploads made easy)

**HOW IT WORKS**
- Connect this project to Cloudflare Pages via GitHub (once).
- Every time you upload new photos into the **uploads/** folders on GitHub, Cloudflare runs the build and your site updates automatically.
- No JSON edits needed for gallery items.

**Folders you use daily**
- `uploads/weddings/` — add wedding photos here
- `uploads/portraits/`
- `uploads/events/`
- `uploads/commercial/`
- `uploads/travel/`

**Optional filename tags for layout**
- Add **_p** to the end for portrait layout, or **_s** for square.  
  Example: `Anna-Bob-Hinterland--Maleny_p.jpg`

**Text you edit sometimes**
- `content/site.json` (hero text, about, contact). You can edit this right in GitHub's web editor.

**Cloudflare Pages setup**
- Build command: `npm run build`
- Output directory: `dist`

**Daily workflow**
1) Open GitHub → your repo → **Add file** → **Upload files**.  
2) Drop images into the right folder(s) under **uploads/**.  
3) Commit. Cloudflare auto-deploys in ~30–60s.