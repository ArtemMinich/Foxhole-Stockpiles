const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');
let ok = true;

function replace(desc, from, to) {
  if (!html.includes(from)) { console.error('NOT FOUND: ' + desc); ok = false; return; }
  html = html.replace(from, to);
  console.log('✓ ' + desc);
}

// ── 1. Add selectedRefCategory state var ──────────────────────────────────────
replace('selectedRefCategory state',
  'var addRequestViewStock = false;',
  'var addRequestViewStock  = false;\n    var selectedRefCategory  = \'All\';'
);

// ── 2. Replace renderAddRequest with two-panel version ────────────────────────
// The OLD string is built from the exact content read from the file
const OLD_RENDER = `function renderAddRequest() {
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
    }`;

const NEW_RENDER = `function renderAddRequest() {
      var spOptions = '<option value="all">All Stockpiles (sum)</option>' +
        allStockpiles.map(function(sp) {
          return '<option value="' + esc(sp.id) + '">' +
                 esc(sp.region + ' › ' + sp.hex + ' › ' + sp.structure + ' › ' + sp.code) +
                 '</option>';
        }).join('');

      document.getElementById('app').innerHTML =
        '<div style="display:flex;flex:1;min-height:0;overflow:hidden">' +
        // LEFT: request form
        '<div style="flex:0 0 420px;display:flex;flex-direction:column;min-height:0;overflow:hidden;border-right:1px solid var(--border)">' +
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
          '<div class="category-bar" id="catBar"></div>' +
          '<div class="items-grid" id="itemsGrid"></div>' +
          '<div class="buttons">' +
            '<button class="btn-secondary" id="cancelBtn">Cancel</button>' +
            '<button class="btn-primary" id="saveBtn" disabled>Save Request</button>' +
          '</div>' +
        '</div>' +
        // RIGHT: stockpile reference panel
        '<div class="edit-wrapper">' +
          '<div style="padding:8px 12px;border-bottom:1px solid var(--border);flex-shrink:0;display:flex;align-items:center;gap:8px">' +
            '<span style="font-size:11px;font-weight:600;color:var(--subtext);text-transform:uppercase;letter-spacing:0.5px;flex-shrink:0">Stockpiles:</span>' +
            '<select id="refSelect" style="flex:1;padding:5px 8px;background:var(--surface);border:1px solid var(--border);border-radius:5px;color:var(--text);font-size:12px;font-family:inherit;outline:none;cursor:pointer">' +
            spOptions +
            '</select>' +
          '</div>' +
          '<div class="category-bar" id="refCatBar"></div>' +
          '<div class="items-grid" id="refItemsGrid"></div>' +
        '</div>' +
        '</div>';

      buildCategoryBar();
      buildRequestItemsGrid();
      selectedRefCategory = 'All';
      buildRefCatBar();
      buildRefGrid('all');
      mountAddRequest();
    }`;

replace('renderAddRequest two-panel', OLD_RENDER, NEW_RENDER);

// ── 3. Add reference panel handlers at end of mountAddRequest ─────────────────
replace('ref panel handlers in mountAddRequest',
  `          closed:      false,
        }});
      });
    }`,
  `          closed:      false,
        }});
      });

      // Reference panel
      var refCatBar = document.getElementById('refCatBar');
      var refSelect  = document.getElementById('refSelect');
      if (refCatBar) {
        refCatBar.addEventListener('click', function(e) {
          var btn = e.target.closest('.cat-btn');
          if (!btn) return;
          selectedRefCategory = btn.getAttribute('data-cat');
          refCatBar.querySelectorAll('.cat-btn').forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-cat') === selectedRefCategory);
          });
          filterRefItems();
        });
      }
      if (refSelect) {
        refSelect.addEventListener('change', function() {
          selectedRefCategory = 'All';
          buildRefCatBar();
          buildRefGrid(refSelect.value);
        });
      }
    }`
);

// ── 4. Add buildRefCatBar / buildRefGrid / filterRefItems before Utils ─────────
const REF_FNS = `
    function buildRefCatBar() {
      var bar = document.getElementById('refCatBar');
      if (!bar) return;
      bar.innerHTML = allCategories.map(function(cat) {
        var active = cat.name === selectedRefCategory ? ' active' : '';
        return '<button class="cat-btn' + active + '" data-cat="' + esc(cat.name) + '" title="' + esc(cat.name) + '">' +
               '<img src="' + esc(cat.imgUrl) + '" alt="" loading="lazy"></button>';
      }).join('');
    }

    function buildRefGrid(spId) {
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
        var count = refItems[key] || 0;
        if (count > 0) html += makeViewCard(key, item.imgUrl, count, displayCat);

        if (item.category === 'Vehicles' || item.category === 'Shippable Structures') {
          var crateKey   = key + ' (Crate)';
          var crateCount = refItems[crateKey] || 0;
          if (crateCount > 0) {
            html += makeViewCard(crateKey, item.imgUrl, crateCount, item.category);
            renderedExtras[crateKey] = true;
          }
        }
      });

      Object.keys(refItems).forEach(function(storedName) {
        if (catByName[normKey(storedName)]) return;
        if (renderedExtras[storedName])     return;
        var count = refItems[storedName] || 0;
        if (count <= 0) return;
        html += makeViewCard(storedName, '', count, 'All');
      });

      var el = document.getElementById('refItemsGrid');
      if (!el) return;
      el.innerHTML = html || '<p style="color:var(--muted);font-size:12px;padding:20px;text-align:center">No items in stockpiles</p>';
      filterRefItems();
    }

    function filterRefItems() {
      document.querySelectorAll('#refItemsGrid .item-card').forEach(function(card) {
        var cat = card.getAttribute('data-cat');
        if (selectedRefCategory === 'All' || cat === selectedRefCategory) card.classList.remove('hidden');
        else card.classList.add('hidden');
      });
    }

    `;

replace('buildRefCatBar/buildRefGrid/filterRefItems before Utils',
  '    // ─── Utils ──────────────────────────────────────────────────────────────────────',
  REF_FNS + '    // ─── Utils ──────────────────────────────────────────────────────────────────────'
);

if (!ok) { console.error('PATCH FAILED'); process.exit(1); }
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
