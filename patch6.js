const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');
let ok = true;

function replace(desc, from, to) {
  if (!html.includes(from)) { console.error('NOT FOUND: ' + desc); ok = false; return; }
  html = html.replace(from, to);
  console.log('✓ ' + desc);
}

// ── 1. Replace renderAddRequest: drop spOptions/select, add chip bar ──────────
replace('renderAddRequest chip bar',
  `function renderAddRequest() {
      var spOptions = '<option value="all">All Stockpiles (sum)</option>' +
        allStockpiles.map(function(sp) {
          return '<option value="' + esc(sp.id) + '">' +
                 esc(sp.region + ' › ' + sp.hex + ' › ' + sp.structure + ' › ' + sp.code) +
                 '</option>';
        }).join('');

      document.getElementById('app').innerHTML =
        '<div class="category-bar" id="catBar"></div>' +
        '<div style="display:flex;flex:1;min-height:0;overflow:hidden">' +
        '<div style="flex:0 0 580px;display:flex;flex-direction:column;min-height:0;overflow:hidden;border-right:1px solid var(--border)">' +
          '<div style="padding:12px 14px 8px;border-bottom:1px solid var(--border);flex-shrink:0">' +
            '<div class="field">' +
              '<label>Request Name</label>' +
              '<input type="text" id="reqName" placeholder="e.g. Urgent Ammo Resupply" autocomplete="off">' +
            '</div>' +
            '<div class="field" style="margin-bottom:0">' +
              '<label>Description</label>' +
              '<textarea id="reqDesc" style="width:100%;height:48px;background:var(--surface);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:inherit;font-size:13px;padding:8px 10px;resize:none;outline:none;line-height:1.4" placeholder="Optional description…"></textarea>' +
            '</div>' +
          '</div>' +
          '<div class="items-grid" id="itemsGrid"></div>' +
          '<div class="buttons">' +
            '<button class="btn-secondary" id="cancelBtn">Cancel</button>' +
            '<button class="btn-primary" id="saveBtn" disabled>Save Request</button>' +
          '</div>' +
        '</div>' +
        '<div class="edit-wrapper">' +
          '<div style="padding:8px 12px;border-bottom:1px solid var(--border);flex-shrink:0;display:flex;align-items:center;gap:8px">' +
            '<span style="font-size:11px;font-weight:600;color:var(--subtext);text-transform:uppercase;letter-spacing:0.5px;flex-shrink:0">Stockpiles:</span>' +
            '<select id="refSelect" style="flex:1;padding:5px 8px;background:var(--surface);border:1px solid var(--border);border-radius:5px;color:var(--text);font-size:12px;font-family:inherit;outline:none;cursor:pointer">' +
            spOptions +
            '</select>' +
          '</div>' +
          '<div class="items-grid" id="refItemsGrid"></div>' +
        '</div>' +
        '</div>';

      buildCategoryBar();
      buildRequestItemsGrid();
      buildRefGrid('all');
      mountAddRequest();
    }`,
  `function renderAddRequest() {
      selectedStockpileIds = {};

      document.getElementById('app').innerHTML =
        '<div class="category-bar" id="catBar"></div>' +
        '<div style="display:flex;flex:1;min-height:0;overflow:hidden">' +
        '<div style="flex:0 0 580px;display:flex;flex-direction:column;min-height:0;overflow:hidden;border-right:1px solid var(--border)">' +
          '<div style="padding:12px 14px 8px;border-bottom:1px solid var(--border);flex-shrink:0">' +
            '<div class="field">' +
              '<label>Request Name</label>' +
              '<input type="text" id="reqName" placeholder="e.g. Urgent Ammo Resupply" autocomplete="off">' +
            '</div>' +
            '<div class="field" style="margin-bottom:0">' +
              '<label>Description</label>' +
              '<textarea id="reqDesc" style="width:100%;height:48px;background:var(--surface);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:inherit;font-size:13px;padding:8px 10px;resize:none;outline:none;line-height:1.4" placeholder="Optional description…"></textarea>' +
            '</div>' +
          '</div>' +
          '<div class="items-grid" id="itemsGrid"></div>' +
          '<div class="buttons">' +
            '<button class="btn-secondary" id="cancelBtn">Cancel</button>' +
            '<button class="btn-primary" id="saveBtn" disabled>Save Request</button>' +
          '</div>' +
        '</div>' +
        '<div class="edit-wrapper">' +
          '<div class="compare-bar" id="refBar">' +
            '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
              '<span style="font-size:11px;font-weight:600;color:var(--subtext);text-transform:uppercase;letter-spacing:0.5px;flex:1">Stockpiles:</span>' +
              '<button class="btn-sm btn-secondary" id="refSelAllBtn">All</button>' +
              '<button class="btn-sm btn-secondary" id="refSelNoneBtn">None</button>' +
            '</div>' +
            '<div class="compare-chips" id="refChips"></div>' +
          '</div>' +
          '<div class="items-grid" id="refItemsGrid"></div>' +
        '</div>' +
        '</div>';

      buildCategoryBar();
      buildRequestItemsGrid();
      buildRefChips();
      buildRefGrid();
      mountAddRequest();
    }`
);

// ── 2. Replace buildRefGrid(spId) with selectedStockpileIds-based version ─────
replace('buildRefGrid uses selectedStockpileIds',
  `function buildRefGrid(spId) {
      var refItems = {};
      if (spId === 'all') {
        allStockpiles.forEach(function(sp) {
          var items = sp.items || {};
          Object.keys(items).forEach(function(k) {
            refItems[k] = (refItems[k] || 0) + (items[k] || 0);
          });
        });
      } else {
        for (var i = 0; i < allStockpiles.length; i++) {
          if (allStockpiles[i].id === spId) { refItems = allStockpiles[i].items || {}; break; }
        }
      }`,
  `function buildRefChips() {
      var chips = document.getElementById('refChips');
      if (!chips) return;
      if (allStockpiles.length === 0) {
        chips.innerHTML = '<span style="font-size:11px;color:var(--muted)">No stockpiles added yet</span>';
        return;
      }
      chips.innerHTML = allStockpiles.map(function(sp) {
        var active = selectedStockpileIds[sp.id] ? ' active' : '';
        var label  = esc(sp.code);
        var title  = esc(sp.region + ' › ' + sp.hex + ' › ' + sp.structure + ' › ' + sp.code);
        return '<button class="stockpile-chip' + active + '" data-id="' + esc(sp.id) + '" title="' + title + '">' + label + '</button>';
      }).join('');
    }

    function buildRefGrid() {
      var refItems = {};
      var anySelected = Object.keys(selectedStockpileIds).some(function(id) { return selectedStockpileIds[id]; });
      if (anySelected) {
        allStockpiles.forEach(function(sp) {
          if (!selectedStockpileIds[sp.id]) return;
          var items = sp.items || {};
          Object.keys(items).forEach(function(k) {
            refItems[k] = (refItems[k] || 0) + (items[k] || 0);
          });
        });
      } else {
        allStockpiles.forEach(function(sp) {
          var items = sp.items || {};
          Object.keys(items).forEach(function(k) {
            refItems[k] = (refItems[k] || 0) + (items[k] || 0);
          });
        });
      }`
);

// ── 3. Replace refSelect2 handler with chip + All/None handlers ───────────────
replace('refSelect2 → refChips handlers',
  `      var refSelect2 = document.getElementById('refSelect');
      if (refSelect2) {
        refSelect2.addEventListener('change', function() {
          buildRefGrid(refSelect2.value);
        });
      }`,
  `      var refChips2   = document.getElementById('refChips');
      var refSelAll2  = document.getElementById('refSelAllBtn');
      var refSelNone2 = document.getElementById('refSelNoneBtn');
      if (refChips2) {
        refChips2.addEventListener('click', function(e) {
          var chip = e.target.closest('.stockpile-chip');
          if (!chip) return;
          var id = chip.getAttribute('data-id');
          selectedStockpileIds[id] = !selectedStockpileIds[id];
          chip.classList.toggle('active', !!selectedStockpileIds[id]);
          buildRefGrid();
        });
      }
      if (refSelAll2) {
        refSelAll2.addEventListener('click', function() {
          allStockpiles.forEach(function(sp) { selectedStockpileIds[sp.id] = true; });
          buildRefChips();
          buildRefGrid();
        });
      }
      if (refSelNone2) {
        refSelNone2.addEventListener('click', function() {
          selectedStockpileIds = {};
          buildRefChips();
          buildRefGrid();
        });
      }`
);

if (!ok) { console.error('PATCH FAILED'); process.exit(1); }
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
