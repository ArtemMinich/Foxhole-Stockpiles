const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');
let ok = true;

function replace(desc, from, to) {
  if (!html.includes(from)) { console.error('NOT FOUND: ' + desc); ok = false; return; }
  html = html.replace(from, to);
  console.log('✓ ' + desc);
}

// ── Replace renderAddRequest (still has toggle version) ───────────────────────
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

// ── Add reference panel handlers at end of mountAddRequest ────────────────────
replace('ref panel handlers in mountAddRequest',
  `          closed:      false,
        }});
      });
    }`,
  `          closed:      false,
        }});
      });

      var refCatBar2 = document.getElementById('refCatBar');
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
      }
    }`
);

if (!ok) { console.error('PATCH FAILED'); process.exit(1); }
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
