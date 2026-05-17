const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');
let ok = true;

function replace(desc, from, to) {
  if (!html.includes(from)) { console.error('NOT FOUND: ' + desc); ok = false; return; }
  html = html.replace(from, to);
  console.log('✓ ' + desc);
}

// ── 1. Move catBar before the outer flex row ──────────────────────────────────
replace('catBar before outer flex div',
  `'<div style="display:flex;flex:1;min-height:0;overflow:hidden">' +
        '<div style="flex:0 0 420px;`,
  `'<div class="category-bar" id="catBar"></div>' +
        '<div style="display:flex;flex:1;min-height:0;overflow:hidden">' +
        '<div style="flex:0 0 420px;`
);

// ── 2. Remove catBar from inside left panel ───────────────────────────────────
replace('remove catBar from left panel',
  `'<div class="category-bar" id="catBar"></div>' +
          '<div class="items-grid" id="itemsGrid"></div>'`,
  `'<div class="items-grid" id="itemsGrid"></div>'`
);

// ── 3. Remove refCatBar from right panel ──────────────────────────────────────
replace('remove refCatBar from right panel',
  `'<div class="category-bar" id="refCatBar"></div>' +
          '<div class="items-grid" id="refItemsGrid"></div>'`,
  `'<div class="items-grid" id="refItemsGrid"></div>'`
);

// ── 4. Remove selectedRefCategory / buildRefCatBar init calls ─────────────────
replace('remove redundant init calls in renderAddRequest',
  `      selectedRefCategory = 'All';
      buildRefCatBar();
      buildRefGrid('all');`,
  `      buildRefGrid('all');`
);

// ── 5. filterItems() now filters both grids ───────────────────────────────────
replace('filterItems covers refItemsGrid',
  `document.querySelectorAll('#itemsGrid .item-card').forEach(function(card) {`,
  `document.querySelectorAll('#itemsGrid .item-card, #refItemsGrid .item-card').forEach(function(card) {`
);

// ── 6. buildRefGrid calls filterItems() not filterRefItems() ──────────────────
replace('buildRefGrid calls filterItems',
  `el.innerHTML = html || '<p style="color:var(--muted);font-size:12px;padding:20px;text-align:center">No items in stockpiles</p>';
      filterRefItems();`,
  `el.innerHTML = html || '<p style="color:var(--muted);font-size:12px;padding:20px;text-align:center">No items in stockpiles</p>';
      filterItems();`
);

// ── 7. Replace refCatBar2 + refSelect2 handlers with simplified refSelect only ─
replace('simplify ref panel handlers — drop refCatBar2, keep refSelect',
  `      var refCatBar2 = document.getElementById('refCatBar');
      var refSelect2  = document.getElementById('refSelect');
      if (refCatBar2) {
        refCatBar2.addEventListener('click', function(e) {
          var btn = e.target.closest('.cat-btn');
          if (!btn) return;
          selectedRefCategory = btn.getAttribute('data-cat');
          refCatBar2.querySelectorAll('.cat-btn').forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-cat') === selectedRefCategory);
          });
          filterRefItems();
        });
      }
      if (refSelect2) {
        refSelect2.addEventListener('change', function() {
          selectedRefCategory = 'All';
          buildRefCatBar();
          buildRefGrid(refSelect2.value);
        });
      }`,
  `      var refSelect2 = document.getElementById('refSelect');
      if (refSelect2) {
        refSelect2.addEventListener('change', function() {
          buildRefGrid(refSelect2.value);
        });
      }`
);

if (!ok) { console.error('PATCH FAILED'); process.exit(1); }
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
