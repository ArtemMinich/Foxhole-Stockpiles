const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');
let ok = true;

function replace(desc, from, to) {
  if (!html.includes(from)) { console.error('NOT FOUND: ' + desc); ok = false; return; }
  html = html.replace(from, to);
  console.log('✓ ' + desc);
}

// ── 1. Add viewStockpiles state var ───────────────────────────────────────────
replace('viewStockpiles state var',
  'var viewItems    = {};\n    var currentTitle = \'\';',
  'var viewItems       = {};\n    var viewStockpiles  = [];\n    var currentTitle = \'\';'
);

// ── 2. Populate viewStockpiles in view onmessage ──────────────────────────────
replace('viewStockpiles in view onmessage',
  `viewItems        = msg.items         || {};
        currentTitle     = msg.title         || '';
        allItems         = msg.allItems      || [];
        allCategories    = msg.allCategories || [];
        selectedCategory = 'All';
        renderView();`,
  `viewItems        = msg.items         || {};
        viewStockpiles   = msg.stockpiles    || [];
        currentTitle     = msg.title         || '';
        allItems         = msg.allItems      || [];
        allCategories    = msg.allCategories || [];
        selectedCategory = 'All';
        renderView();`
);

// ── 3. Add stockpile chip CSS ──────────────────────────────────────────────────
replace('chip-del CSS',
  '.stockpile-chip:hover  { opacity: 0.8; }',
  `.stockpile-chip:hover  { opacity: 0.8; }
    .chip-del { margin-left: 5px; opacity: 0.45; font-size: 12px; line-height: 1; vertical-align: middle; }
    .chip-del:hover { opacity: 1; color: var(--red); }`
);

// ── 4. Add stockpile chips section to renderView ──────────────────────────────
replace('renderView with stockpile chips',
  `function renderView() {
      document.getElementById('app').innerHTML = [
        '<div class="edit-wrapper">',
          '<div class="category-bar" id="catBar"></div>',
          '<div class="items-grid" id="itemsGrid"></div>',
          '<div class="buttons">',
            '<button class="btn-secondary" id="closeBtn">Close</button>',
          '</div>',
        '</div>',
      ].join('');
      buildCategoryBar();
      buildViewGrid();
      mountView();
    }`,
  `function renderView() {
      document.getElementById('app').innerHTML = [
        '<div class="edit-wrapper">',
          viewStockpiles.length > 0
            ? '<div class="compare-bar" id="viewSpBar"><div class="compare-chips" id="viewSpChips"></div></div>'
            : '',
          '<div class="category-bar" id="catBar"></div>',
          '<div class="items-grid" id="itemsGrid"></div>',
          '<div class="buttons">',
            '<button class="btn-secondary" id="closeBtn">Close</button>',
          '</div>',
        '</div>',
      ].join('');
      buildViewSpChips();
      buildCategoryBar();
      buildViewGrid();
      mountView();
    }

    function buildViewSpChips() {
      var bar = document.getElementById('viewSpChips');
      if (!bar) return;
      bar.innerHTML = viewStockpiles.map(function(sp) {
        var label = esc(sp.code);
        var title = esc(sp.region + ' › ' + sp.hex + ' › ' + sp.structure + ' › ' + sp.code);
        return '<button class="stockpile-chip" data-sp-id="' + esc(sp.id) + '" title="' + title + '">' +
               label +
               '<span class="chip-del" data-del-id="' + esc(sp.id) + '">×</span>' +
               '</button>';
      }).join('');
    }`
);

// ── 5. Add chip-del click handler in mountView ────────────────────────────────
replace('chip-del handler in mountView',
  `function mountView() {
      var catBar   = document.getElementById('catBar');
      var closeBtn = document.getElementById('closeBtn');`,
  `function mountView() {
      var catBar   = document.getElementById('catBar');
      var closeBtn = document.getElementById('closeBtn');
      var spChips  = document.getElementById('viewSpChips');

      if (spChips) {
        spChips.addEventListener('click', function(e) {
          var del = e.target.closest('.chip-del');
          if (!del) return;
          var id = del.getAttribute('data-del-id');
          if (id) send({ type: 'delete-stockpile', id: id });
        });
      }`
);

if (!ok) { console.error('PATCH FAILED'); process.exit(1); }
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
