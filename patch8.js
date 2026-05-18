const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');
let ok = true;

function replace(desc, from, to) {
  if (!html.includes(from)) { console.error('NOT FOUND: ' + desc); ok = false; return; }
  html = html.replace(from, to);
  console.log('✓ ' + desc);
}

// ── 1. renderView: single sp → danger btn in footer; multiple → chips bar ─────
replace('renderView single vs multi',
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
    }`,
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
    }`
);

// ── 2. mountView: wire deleteSpBtn for single stockpile ───────────────────────
replace('deleteSpBtn handler in mountView',
  `      if (spChips) {
        spChips.addEventListener('click', function(e) {
          var del = e.target.closest('.chip-del');
          if (!del) return;
          var id = del.getAttribute('data-del-id');
          if (id) send({ type: 'delete-stockpile', id: id });
        });
      }`,
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
      }`
);

if (!ok) { console.error('PATCH FAILED'); process.exit(1); }
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
