// Mobile nav
const navToggle=document.getElementById('navToggle');const navList=document.getElementById('navList');
if(navToggle&&navList){navToggle.addEventListener('click',()=>navList.classList.toggle('show'));}
document.getElementById('year').textContent=new Date().getFullYear();

async function load(){
  const s = await fetch('/content/site.json').then(r=>r.json()).catch(()=>({}));
  document.getElementById('brandName').textContent = s.site?.name || '503 Exposures';
  document.getElementById('heroKicker').textContent = s.hero?.kicker || '';
  document.getElementById('heroHeadline').textContent = s.hero?.headline || '';
  document.getElementById('heroSubhead').textContent = s.hero?.subhead || '';
  document.getElementById('ctaPrimary').textContent = s.hero?.ctaPrimary?.label || 'View Work';
  document.getElementById('heroImage').src = s.hero?.heroImage || 'assets/placeholder.svg';
  document.getElementById('aboutName').textContent = s.about?.name || '';
  document.getElementById('aboutBlurb').textContent = s.about?.blurb || '';
  document.getElementById('aboutImage').src = s.about?.image || 'assets/placeholder.svg';
  document.getElementById('emailLink').textContent = s.contact?.email || '';
  document.getElementById('emailLink').href = 'mailto:' + (s.contact?.email || '');
  document.getElementById('phoneLink').textContent = s.contact?.phone || '';
  document.getElementById('phoneLink').href = 'tel:' + (s.contact?.phone || '');
  document.getElementById('locationText').textContent = s.contact?.location || '';

  const g = await fetch('/gallery.json').then(r=>r.json()).catch(()=>({items:[]}));
  const items = g.items || [];
  const cats = Array.from(new Set(['All', ...items.map(i=>i.category)]));
  const bar = document.getElementById('filterBar'); bar.innerHTML='';
  cats.forEach((c,i)=>{const b=document.createElement('button');b.className='tag'+(i===0?' active':'');b.dataset.filter=c;b.textContent=c;bar.appendChild(b);});
  const grid = document.getElementById('workGrid');
  function render(filter='All'){
    grid.innerHTML='';
    items.filter(i=>filter==='All'||i.category===filter).forEach(i=>{
      const a=document.createElement('a'); a.className='card'; a.href='#contact';
      const img=document.createElement('img'); img.src='/' + i.image; img.alt=i.title; a.appendChild(img);
      const meta=document.createElement('div'); meta.className='card-meta'; meta.innerHTML=`<strong>${i.title}</strong><span>${i.location||''}</span>`; a.appendChild(meta);
      grid.appendChild(a);
    });
  }
  render('All');
  bar.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b)return; [...bar.children].forEach(x=>x.classList.remove('active')); b.classList.add('active'); render(b.dataset.filter);});
}
load();