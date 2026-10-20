// design-review: measured checks for a web page or a whole site.
// Run in the page (browser tool's JavaScript runner or the DevTools console) on any page of the site.
// Edit PAGES and WIDTH, then run. Pages are loaded in hidden same-origin iframes, so run it on the same domain.
// Output: one object per page. Every hit is a candidate, not a verdict: confirm text over photos,
// gradients or transparent backgrounds by looking at it (the contrast math only sees solid colors).

const PAGES = ['/'];            // e.g. ['/', '/pricing', '/about']
const WIDTH = 375;              // run once at 375 (phone), once at 1366 (desktop)
const CTA_WORDS = /demo|agendar|book|comprar|buy|assinar|start|começar|whatsapp|contato|contact|desconto|trial/i;

function lum(c) {
  const m = c.match(/[\d.]+/g); if (!m) return null;
  const [r, g, b] = m.slice(0, 3).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function solidBg(el, win) {
  // Walks up to the first solid background. Returns null when an ancestor paints a background image or gradient.
  while (el) {
    const cs = win.getComputedStyle(el);
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
    const m = cs.backgroundColor.match(/[\d.]+/g);
    if (m && (m.length < 4 || +m[3] > 0.5)) return cs.backgroundColor;
    el = el.parentElement;
  }
  return 'rgb(255,255,255)';
}
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const report = {};
for (const path of PAGES) {
  const f = document.createElement('iframe');
  f.style.cssText = `position:fixed;left:-9999px;top:0;width:${WIDTH}px;height:900px`;
  f.src = path; document.body.appendChild(f);
  await new Promise(r => (f.onload = r));
  await new Promise(r => setTimeout(r, 1000));            // let entrance animations finish
  const d = f.contentDocument, w = f.contentWindow;
  const vw = d.documentElement.clientWidth;
  const visible = e => e.offsetParent !== null || w.getComputedStyle(e).position === 'fixed';
  const ownText = e => [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
  const r = {};

  // 1. Side scroll: anything wider than the screen
  r.sideScroll = d.documentElement.scrollWidth > vw
    ? [...d.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > vw + 1 && e.getBoundingClientRect().width > 0)
        .slice(0, 5).map(e => `${e.tagName.toLowerCase()}.${[...e.classList].join('.')} ends at ${Math.round(e.getBoundingClientRect().right)}px`)
    : [];

  // 2. Contrast and text size
  r.lowContrast = []; r.smallText = []; r.checkByEye = [];
  d.querySelectorAll('body *').forEach(e => {
    if (!visible(e)) return;
    const t = ownText(e); if (t.length < 2) return;
    const cs = w.getComputedStyle(e), fs = parseFloat(cs.fontSize), fw = +cs.fontWeight || 400;
    if (fs < 13) r.smallText.push(`${fs.toFixed(1)}px: ${t.slice(0, 50)}`);
    const bg = solidBg(e, w);
    if (!bg) { r.checkByEye.push(t.slice(0, 50)); return; }
    const cr = ratio(lum(cs.color), lum(bg));
    const large = fs >= 24 || (fs >= 18.66 && fw >= 700);
    if (cr < (large ? 3 : 4.5)) r.lowContrast.push(`${cr.toFixed(2)}:1 at ${fs.toFixed(1)}px/${fw}: ${t.slice(0, 50)}`);
  });

  // 3. Calls to action: destination and tap size
  r.ctas = [...d.querySelectorAll('a,button')].filter(e => visible(e) && CTA_WORDS.test(e.innerText)).map(e => {
    const href = e.getAttribute('href') || '(button)';
    const box = e.getBoundingClientRect();
    let flag = '';
    if (href === '#' || href === '' || href.startsWith('javascript')) flag = '  [GOES NOWHERE]';
    else if (href.startsWith('#')) flag = d.getElementById(href.slice(1)) ? '  [in-page anchor: confirm the section holds a working booking, form or link]' : '  [ANCHOR NOT FOUND]';
    return `${e.innerText.trim().slice(0, 40)} -> ${href}${flag}${box.height < 44 ? `  [${Math.round(box.height)}px tall, under 44]` : ''}`;
  });

  // 4. Images: alt text, stock or third-party hosting, weight
  r.images = [...d.images].map(i => {
    const src = i.currentSrc || i.src;
    const entry = w.performance.getEntriesByName(src)[0];
    const kb = entry && entry.encodedBodySize ? Math.round(entry.encodedBodySize / 1024) : null;
    const flags = [];
    if (!i.hasAttribute('alt')) flags.push('NO ALT');
    if (new URL(src).host !== location.host) flags.push(`hosted on ${new URL(src).host}`);
    if (kb && kb > 200) flags.push(`${kb} KB`);
    return flags.length ? `${src.split('/').pop().slice(0, 40)}: ${flags.join(', ')}` : null;
  }).filter(Boolean);

  // 5. Facts to trace to the strategy files: prices, percentages, numbers with units, guarantees
  const text = d.body.innerText;
  r.toTrace = [...new Set(text.match(/(R\$|US\$|\$|€)\s?[\d.,]+[^\n]{0,40}|\d+[.,]?\d*\s?%[^\n]{0,50}|garantia[^\n]{0,60}|guarantee[^\n]{0,60}/gi) || [])].slice(0, 25);

  // 6. Launch flags
  r.launch = [];
  if (d.querySelector('meta[name="robots"][content*="noindex"]')) r.launch.push('noindex meta');
  r.h1 = [...d.querySelectorAll('h1')].map(h => h.innerText.slice(0, 80));
  if (r.h1.length !== 1) r.launch.push(`${r.h1.length} h1 tags`);

  r.checkByEye = [...new Set(r.checkByEye)].slice(0, 12);   // text over images or gradients: look at these
  report[path] = r; f.remove();
}
report;
