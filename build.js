
const fs = require('fs');
const path = require('path');

const SRC_PUBLIC = path.join(__dirname, 'public');
const SRC_UPLOADS = path.join(__dirname, 'uploads');
const SRC_CONTENT = path.join(__dirname, 'content');
const OUT = path.join(__dirname, 'dist');

// Clean dist
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// Copy public to dist
function copyDir(src, dest){
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    const st = fs.statSync(s);
    if (st.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}
copyDir(SRC_PUBLIC, OUT);

// Copy content (site.json) to dist/content
copyDir(SRC_CONTENT, path.join(OUT, 'content'));

// Build gallery manifest from uploads/*
const categories = fs.existsSync(SRC_UPLOADS) ? fs.readdirSync(SRC_UPLOADS) : [];
const items = [];
for (const cat of categories) {
  const catDir = path.join(SRC_UPLOADS, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  const files = fs.readdirSync(catDir).filter(f => /\.(jpe?g|png|webp|gif|svg)$/i.test(f));
  for (const file of files) {
    // filename rules: "Title--Location[_p|_s].jpg"
    // _p => portrait, _s => square, default landscape
    const base = file.replace(/\.[^.]+$/, '');
    let orientation = 'landscape';
    if (/_p$/i.test(base)) orientation = 'portrait';
    else if (/_s$/i.test(base)) orientation = 'square';

    const cleaned = base.replace(/_(p|s)$/i, '');
    const parts = cleaned.split('--');
    const title = (parts[0] || file).replace(/[-_]+/g, ' ').trim();
    const location = (parts[1] || '').replace(/[-_]+/g, ' ').trim();

    items.push({
      title, location, orientation,
      category: cat.charAt(0).toUpperCase() + cat.slice(1),
      image: `uploads/${cat}/${file}`
    });
  }
}

// Write gallery.json
const galleryOut = path.join(OUT, 'gallery.json');
fs.writeFileSync(galleryOut, JSON.stringify({items}, null, 2));

console.log(`Built ${items.length} gallery items.`);
