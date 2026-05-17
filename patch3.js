const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');
let ok = true;

function replace(desc, from, to) {
  if (!html.includes(from)) { console.error('NOT FOUND: ' + desc); ok = false; return; }
  html = html.replace(from, to);
  console.log('✓ ' + desc);
}

// ── 1. Remove dead CSS ────────────────────────────────────────────────────────
replace('dead CSS .compare-counts/.req-count/.need-count',
  `    /* ── Compare card counts ── */
    .compare-counts {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
      flex-shrink: 0;
    }
    .req-count  { font-size: 13px; font-weight: 700; color: var(--text); }
    .need-count { font-size: 11px; font-weight: 600; }
    .need-count.fulfilled { color: var(--green); }
    .need-count.partial   { color: var(--red);   }`,
  ''
);

// ── 2. Add state variable ─────────────────────────────────────────────────────
replace('state var addRequestViewStock',
  'var currentRequest     = null;',
  'var currentRequest     = null;\n    var addRequestViewStock = false;'
);

// ── 3. Add allStockpiles capture in addrequest onmessage ──────────────────────
replace('allStockpiles in addrequest onmessage',
  "allCategories    = msg.allCategories || [];\n        selectedCategory = 'All';\n        currentRequest   = {",
  "allCategories    = msg.allCategories || [];\n        allStockpiles    = msg.allStockpiles || [];\n        selectedCategory = 'All';\n        currentRequest   = {"
);

// ── 4. Remove confirm() from close-request handler ────────────────────────────
replace('remove confirm() from closeReqBtn',
  "if (!confirm('Close this request? It will be hidden from the widget.')) return;\n        send({ type: 'close-request'",
  "send({ type: 'close-request'"
);

// ── 5. Replace renderAddRequest with toggle-aware version ─────────────────────
replace('renderAddRequest with toggle',
  `function renderAddRequest() {
      document.getElementById('app').innerHTML = [
        '<div class="edit-wrapper">',
          '<div style="padding:12px 14px 10px;border-bottom:1px solid var(--border);flex-shrink:0">',
            '<div class="field">',
              '<label>Request Name</label>',
              '<input type="text" id="reqName" placeholder="e.g. Urgent Ammo Resupply" autocomplete="off">',
            '</div>',
            '<div class="field" style="margin-bottom:0">',
              '<label>Description</label>',
              '<textarea id="reqDesc" style="width:100%;height:52px;background:var(--surface);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:inherit;font-size:13px;padding:8px 10px;resize:none;outline:none;line-height:1.4" placeholder="Optional description…"></textarea>',
            '</div>',
          '</div>',
          '<div class="category-bar" id="catBar"></div>',
          '<div class="items-grid" id="itemsGrid"></div>',
          '<div class="buttons">',
            '<button class="btn-secondary" id="cancelBtn">Cancel</button>',
            '<button class="btn-primary" id="saveBtn" disabled>Save Request</button>',
          '</div>',
        '</div>',
      ].join('');
      buildCategoryBar();
      buildRequestItemsGrid();
      mountAddRequest();
    }`,
  `function renderAddRequest() {
      addRequestViewStock = false;
      document.getElementById('app').innerHTML = [
        '<div class="edit-wrapper">',
          '<div style="padding:12px 14px 8px;border-bottom:1px solid var(--border);flex-shrink:0">',
            '<div class="field">',
              '<label>Request Name</label>',
              '<input type="text" id="reqName" placeholder="e.g. Urgent Ammo Resupply" autocomplete="off">',
            '</div>',
            '<div class="field" style="margin-bottom:8px">',
              '<label>Description</label>',
              '<textarea id="reqDesc" style="width:100%;height:48px;background:var(--surface);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:inherit;font-size:13px;padding:8px 10px;resize:none;outline:none;line-height:1.4" placeholder="Optional description…"></textarea>',
            '</div>',
            '<div class="toggle-group">',
              '<button class="toggle-btn active" id="toggleReqBtn">Request Items</button>',
              '<button class="toggle-btn" id="toggleStockBtn">Current Stock</button>',
            '</div>',
          '</div>',
          '<div class="category-bar" id="catBar"></div>',
          '<div class="items-grid" id="itemsGrid"></div>',
          '<div class="buttons">',
            '<button class="btn-secondary" id="cancelBtn">Cancel</button>',
            '<button class="btn-primary" id="saveBtn" disabled>Save Request</button>',
          '</div>',
        '</div>',
      ].join('');
      buildCategoryBar();
      buildRequestItemsGrid();
      mountAddRequest();
    }`
);

// ── 6. Add toggle + collect handlers to mountAddRequest ───────────────────────
replace('toggle handlers in mountAddRequest',
  `var grid      = document.getElementById('itemsGrid');
      var catBar    = document.getElementById('catBar');
      var reqName   = document.getElementById('reqName');
      var reqDesc   = document.getElementById('reqDesc');
      var cancelBtn = document.getElementById('cancelBtn');
      var saveBtn   = document.getElementById('saveBtn');`,
  `var grid           = document.getElementById('itemsGrid');
      var catBar         = document.getElementById('catBar');
      var reqName        = document.getElementById('reqName');
      var reqDesc        = document.getElementById('reqDesc');
      var cancelBtn      = document.getElementById('cancelBtn');
      var saveBtn        = document.getElementById('saveBtn');
      var toggleReqBtn   = document.getElementById('toggleReqBtn');
      var toggleStockBtn = document.getElementById('toggleStockBtn');

      if (toggleReqBtn) {
        toggleReqBtn.addEventListener('click', function() {
          if (addRequestViewStock) toggleRequestStockView(false);
        });
      }
      if (toggleStockBtn) {
        toggleStockBtn.addEventListener('click', function() {
          if (!addRequestViewStock) toggleRequestStockView(true);
        });
      }`
);

// ── 7. Add new helper functions before mountAddRequest ────────────────────────
replace('new helper fns before mountAddRequest',
  'function mountAddRequest() {',
  `function collectRequestInputs() {
      var grid = document.getElementById('itemsGrid');
      if (!grid || addRequestViewStock) return;
      grid.querySelectorAll('input[data-item-name]').forEach(function(inp) {
        var count = parseInt(inp.value) || 0;
        var name  = inp.getAttribute('data-item-name');
        if (count > 0) currentRequest.items[name] = count;
        else           delete currentRequest.items[name];
      });
    }

    function toggleRequestStockView(viewStock) {
      addRequestViewStock = viewStock;
      var toggleReqBtn   = document.getElementById('toggleReqBtn');
      var toggleStockBtn = document.getElementById('toggleStockBtn');
      if (toggleReqBtn)   toggleReqBtn.classList.toggle('active', !viewStock);
      if (toggleStockBtn) toggleStockBtn.classList.toggle('active', viewStock);
      if (viewStock) {
        collectRequestInputs();
        buildStockRefGrid();
      } else {
        buildRequestItemsGrid();
      }
    }

    function buildStockRefGrid() {
      var totalStock = {};
      allStockpiles.forEach(function(sp) {
        var items = sp.items || {};
        Object.keys(items).forEach(function(k) {
          totalStock[k] = (totalStock[k] || 0) + (items[k] || 0);
        });
      });

      if (Object.keys(totalStock).length === 0) {
        document.getElementById('itemsGrid').innerHTML =
          '<p style="color:var(--muted);font-size:12px;padding:20px;text-align:center">No stockpiles added yet</p>';
        return;
      }

      var catByName = {};
      allItems.forEach(function(item) { catByName[normKey(item.name)] = item.category; });

      var renderedExtras = {};
      var html = '';

      allItems.forEach(function(item) {
        var key        = normKey(item.name);
        var displayCat = item.category;
        if (item.category === 'Vehicles')                  displayCat = 'Vehicles Non-Crate';
        else if (item.category === 'Shippable Structures') displayCat = 'Shippable Structures Non-Crate';
        var count = totalStock[key] || 0;
        if (count > 0) html += makeViewCard(key, item.imgUrl, count, displayCat);

        if (item.category === 'Vehicles' || item.category === 'Shippable Structures') {
          var crateKey   = key + ' (Crate)';
          var crateCount = totalStock[crateKey] || 0;
          if (crateCount > 0) {
            html += makeViewCard(crateKey, item.imgUrl, crateCount, item.category);
            renderedExtras[crateKey] = true;
          }
        }
      });

      Object.keys(totalStock).forEach(function(storedName) {
        if (catByName[normKey(storedName)]) return;
        if (renderedExtras[storedName])     return;
        var count = totalStock[storedName] || 0;
        if (count <= 0) return;
        html += makeViewCard(storedName, '', count, 'All');
      });

      document.getElementById('itemsGrid').innerHTML = html;
      filterItems();
    }

    function mountAddRequest() {`
);

// ── 8. Preserve inputs when saving (use collectRequestInputs) ─────────────────
// The save handler already reads directly from inputs — keep that, but also
// make sure switching tabs preserves state. Already handled by collectRequestInputs.

if (!ok) { console.error('PATCH FAILED — not writing file'); process.exit(1); }
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
