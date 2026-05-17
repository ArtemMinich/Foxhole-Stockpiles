const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');

// ── 1. CSS ─────────────────────────────────────────────────────────────────────
const newCss = `
    /* ── Compare bar ── */
    .compare-bar {
      padding: 8px 12px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }
    .compare-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      max-height: 78px;
      overflow-y: auto;
    }
    .stockpile-chip {
      padding: 3px 9px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--subtext);
      font-size: 11px;
      cursor: pointer;
      transition: border-color 0.1s, color 0.1s;
      white-space: nowrap;
    }
    .stockpile-chip.active { border-color: var(--green); color: var(--green); }
    .stockpile-chip:hover  { opacity: 0.8; }

    /* ── Compare card counts ── */
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
    .need-count.partial   { color: var(--red);   }
  </style>`;

html = html.replace('  </style>', newCss);

// ── 2. State variables ─────────────────────────────────────────────────────────
html = html.replace(
  'var currentRequest = null;',
  'var currentRequest     = null;\n    var currentViewRequest = null;\n    var allStockpiles       = [];\n    var selectedStockpileIds = {};'
);

// ── 3. onmessage: add viewrequest branch ──────────────────────────────────────
html = html.replace(
  "} else if (currentMode === 'addrequest') {",
  "} else if (currentMode === 'viewrequest') {\n        currentViewRequest   = msg.request       || {};\n        allStockpiles        = msg.allStockpiles || [];\n        allItems             = msg.allItems      || [];\n        allCategories        = msg.allCategories || [];\n        selectedCategory     = 'All';\n        selectedStockpileIds = {};\n        renderViewRequest();\n      } else if (currentMode === 'addrequest') {"
);

// ── 4. Update addrequest payload to include closed: false ─────────────────────
html = html.replace(
  "          createdAt:   Date.now(),\n          createdBy:   '',\n        }});",
  "          createdAt:   Date.now(),\n          createdBy:   '',\n          closed:      false,\n        }});"
);

// ── 5. New functions ───────────────────────────────────────────────────────────
const newFns = `
    // =========================================================================
    // VIEW REQUEST MODE (compare with stockpiles)
    // =========================================================================

    function renderViewRequest() {
      document.getElementById('app').innerHTML = [
        '<div class="edit-wrapper">',
          '<div class="compare-bar" id="compareBar">',
            '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">',
              '<span style="font-size:11px;font-weight:600;color:var(--subtext);text-transform:uppercase;letter-spacing:0.5px;flex:1">Compare with stockpiles:</span>',
              '<button class="btn-sm btn-secondary" id="selAllBtn">All</button>',
              '<button class="btn-sm btn-secondary" id="selNoneBtn">None</button>',
            '</div>',
            '<div class="compare-chips" id="compareChips"></div>',
          '</div>',
          '<div class="category-bar" id="catBar"></div>',
          '<div class="items-grid" id="itemsGrid"></div>',
          '<div class="buttons">',
            '<button class="btn-danger" id="closeReqBtn">Close Request</button>',
            '<button class="btn-secondary" id="closeBtn">Close</button>',
          '</div>',
        '</div>',
      ].join('');
      buildCompareChips();
      buildCategoryBar();
      buildCompareGrid();
      mountViewRequest();
    }

    function buildCompareChips() {
      var chips = document.getElementById('compareChips');
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

    function buildCompareGrid() {
      var covered     = {};
      var anySelected = false;
      allStockpiles.forEach(function(sp) {
        if (!selectedStockpileIds[sp.id]) return;
        anySelected = true;
        var items = sp.items || {};
        Object.keys(items).forEach(function(k) {
          covered[k] = (covered[k] || 0) + (items[k] || 0);
        });
      });

      var catByName = {};
      allItems.forEach(function(item) { catByName[normKey(item.name)] = item.category; });

      var renderedExtras = {};
      var html = '';
      var req  = currentViewRequest;

      allItems.forEach(function(item) {
        var key        = normKey(item.name);
        var displayCat = item.category;
        if (item.category === 'Vehicles')                  displayCat = 'Vehicles Non-Crate';
        else if (item.category === 'Shippable Structures') displayCat = 'Shippable Structures Non-Crate';

        var requested = req.items[key] !== undefined ? req.items[key] : (req.items[item.name] || 0);
        if (requested > 0) {
          html += makeCompareCard(key, item.imgUrl, requested, covered[key] || 0, displayCat, anySelected);
        }

        if (item.category === 'Vehicles' || item.category === 'Shippable Structures') {
          var crateKey  = key + ' (Crate)';
          var reqCrate  = req.items[crateKey];
          if (reqCrate !== undefined && reqCrate > 0) {
            html += makeCompareCard(crateKey, item.imgUrl, reqCrate, covered[crateKey] || 0, item.category, anySelected);
            renderedExtras[crateKey] = true;
          }
        }
      });

      Object.keys(req.items).forEach(function(storedName) {
        if (catByName[normKey(storedName)]) return;
        if (renderedExtras[storedName])     return;
        var requested = req.items[storedName] || 0;
        if (requested <= 0) return;
        html += makeCompareCard(storedName, '', requested, covered[storedName] || 0, 'All', anySelected);
      });

      document.getElementById('itemsGrid').innerHTML = html;
      filterItems();
    }

    function makeCompareCard(name, imgUrl, requested, covered, category, anySelected) {
      var remaining = Math.max(0, requested - covered);
      var imgTag = imgUrl
        ? '<img src="' + esc(imgUrl) + '" alt="" loading="lazy">'
        : '<div class="item-img-placeholder"></div>';
      var needHtml = '';
      if (anySelected) {
        var needCls  = remaining === 0 ? ' fulfilled' : ' partial';
        var needText = remaining === 0 ? '✓ done' : 'need ' + remaining;
        needHtml = '<span class="need-count' + needCls + '">' + needText + '</span>';
      }
      return '<div class="item-card" data-cat="' + esc(category) + '">' +
             imgTag +
             '<span class="item-name">' + esc(name) + '</span>' +
             '<div class="compare-counts">' +
             '<span class="req-count">' + requested + '</span>' +
             needHtml +
             '</div>' +
             '</div>';
    }

    function mountViewRequest() {
      var catBar      = document.getElementById('catBar');
      var chips       = document.getElementById('compareChips');
      var selAll      = document.getElementById('selAllBtn');
      var selNone     = document.getElementById('selNoneBtn');
      var closeBtn    = document.getElementById('closeBtn');
      var closeReqBtn = document.getElementById('closeReqBtn');

      if (chips) {
        chips.addEventListener('click', function(e) {
          var chip = e.target.closest('.stockpile-chip');
          if (!chip) return;
          var id = chip.getAttribute('data-id');
          selectedStockpileIds[id] = !selectedStockpileIds[id];
          chip.classList.toggle('active', !!selectedStockpileIds[id]);
          buildCompareGrid();
        });
      }

      if (selAll) {
        selAll.addEventListener('click', function() {
          allStockpiles.forEach(function(sp) { selectedStockpileIds[sp.id] = true; });
          buildCompareChips();
          buildCompareGrid();
        });
      }

      if (selNone) {
        selNone.addEventListener('click', function() {
          selectedStockpileIds = {};
          buildCompareChips();
          buildCompareGrid();
        });
      }

      catBar.addEventListener('click', function(e) {
        var btn = e.target.closest('.cat-btn');
        if (!btn) return;
        selectedCategory = btn.getAttribute('data-cat');
        catBar.querySelectorAll('.cat-btn').forEach(function(b) {
          b.classList.toggle('active', b.getAttribute('data-cat') === selectedCategory);
        });
        filterItems();
      });

      closeBtn.addEventListener('click', function() { send({ type: 'close' }); });

      closeReqBtn.addEventListener('click', function() {
        if (!confirm('Close this request? It will be hidden from the widget.')) return;
        send({ type: 'close-request', id: currentViewRequest.id });
      });
    }

`;

html = html.replace(
  '    // =========================================================================\n    // ADD REQUEST MODE',
  newFns + '    // =========================================================================\n    // ADD REQUEST MODE'
);

fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
