const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');
let ok = true;

function replace(desc, from, to) {
  if (!html.includes(from)) { console.error('NOT FOUND: ' + desc); ok = false; return; }
  html = html.replace(from, to);
  console.log('✓ ' + desc);
}

// ── 1. renderView: always show delete btn, no chips bar ───────────────────────
replace('renderView unified delete btn',
  `function renderView() {
      var multiSp = viewStockpiles.length > 1;
      var singleSp = viewStockpiles.length === 1;
      document.getElementById('app').innerHTML = [
        '<div class="edit-wrapper">',
          multiSp
            ? '<div class="compare-bar" id="viewSpBar"><div class="compare-chips" id="viewSpChips"></div></div>'
            : '',
          '<div class="category-bar" id="catBar"></div>',
          '<div class="items-grid" id="itemsGrid"></div>',
          '<div class="buttons">',
            singleSp ? '<button class="btn-danger" id="deleteSpBtn">Delete Stockpile</button>' : '',
            '<button class="btn-secondary" id="closeBtn">Close</button>',
          '</div>',
        '</div>',
      ].join('');
      buildViewSpChips();
      buildCategoryBar();
      buildViewGrid();
      mountView();
    }`,
  `function renderView() {
      document.getElementById('app').innerHTML = [
        '<div class="edit-wrapper">',
          '<div class="category-bar" id="catBar"></div>',
          '<div class="items-grid" id="itemsGrid"></div>',
          '<div class="buttons">',
            viewStockpiles.length > 0 ? '<button class="btn-danger" id="deleteSpBtn">Delete Stockpile</button>' : '',
            '<button class="btn-secondary" id="closeBtn">Close</button>',
          '</div>',
        '</div>',
      ].join('');
      buildCategoryBar();
      buildViewGrid();
      mountView();
    }`
);

// ── 2. mountView: delete btn sends all ids, remove chip handler ───────────────
replace('deleteSpBtn sends all ids',
  `      var deleteSpBtn = document.getElementById('deleteSpBtn');

      if (deleteSpBtn && viewStockpiles.length === 1) {
        deleteSpBtn.addEventListener('click', function() {
          send({ type: 'delete-stockpile', id: viewStockpiles[0].id });
        });
      }

      if (spChips) {
        spChips.addEventListener('click', function(e) {
          var del = e.target.closest('.chip-del');
          if (!del) return;
          var id = del.getAttribute('data-del-id');
          if (id) send({ type: 'delete-stockpile', id: id });
        });
      }`,
  `      var deleteSpBtn = document.getElementById('deleteSpBtn');

      if (deleteSpBtn) {
        deleteSpBtn.addEventListener('click', function() {
          var ids = viewStockpiles.map(function(sp) { return sp.id; });
          send({ type: 'delete-stockpile', ids: ids });
        });
      }`
);

if (!ok) { console.error('PATCH FAILED'); process.exit(1); }
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
