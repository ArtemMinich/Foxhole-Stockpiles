const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');
let ok = true;

function replace(desc, from, to) {
  if (!html.includes(from)) { console.error('NOT FOUND: ' + desc); ok = false; return; }
  html = html.replace(from, to);
  console.log('✓ ' + desc);
}

// Helper comment for the new pattern used in every function:
// - Vehicles / Shippable Structures  → can have (Crate) and non-crate variants
//     non-crate → VehiclesNonCrate / ShippableStructuresNonCrate display cat
//     (Crate)   → Vehicles / ShippableStructures display cat
// - Vehicles Non-Crate / Shippable Structures Non-Crate → non-crate only, displayed as-is

// ── 1. buildItemsGrid (add-stockpile, shows only stored count > 0) ─────────────
replace('buildItemsGrid category logic',
  `      allItems.forEach(function(item) {
        var key        = normKey(item.name);
        var displayCat = item.category;
        if (item.category === 'Vehicles')                  displayCat = 'Vehicles Non-Crate';
        else if (item.category === 'Shippable Structures') displayCat = 'Shippable Structures Non-Crate';
        var count = sp.items[key] !== undefined ? sp.items[key] : (sp.items[item.name] || 0);
        if (count > 0) html += makeItemCard(key, item.imgUrl, count, displayCat, false);

        if (item.category === 'Vehicles' || item.category === 'Shippable Structures') {
          var crateKey   = key + ' (Crate)';
          var crateCount = sp.items[crateKey];
          if (crateCount !== undefined && crateCount > 0) {
            html += makeItemCard(crateKey, item.imgUrl, crateCount, item.category, false);
            renderedExtras[crateKey] = true;
          }
        }
      });`,
  `      allItems.forEach(function(item) {
        var key = normKey(item.name);
        var cat = item.category;
        if (cat === 'Vehicles' || cat === 'Shippable Structures') {
          var nonCrateCat = cat === 'Vehicles' ? 'Vehicles Non-Crate' : 'Shippable Structures Non-Crate';
          var count = sp.items[key] !== undefined ? sp.items[key] : (sp.items[item.name] || 0);
          if (count > 0) html += makeItemCard(key, item.imgUrl, count, nonCrateCat, false);
          var crateKey   = key + ' (Crate)';
          var crateCount = sp.items[crateKey];
          if (crateCount !== undefined && crateCount > 0) {
            html += makeItemCard(crateKey, item.imgUrl, crateCount, cat, false);
            renderedExtras[crateKey] = true;
          }
        } else {
          var count = sp.items[key] !== undefined ? sp.items[key] : (sp.items[item.name] || 0);
          if (count > 0) html += makeItemCard(key, item.imgUrl, count, cat, false);
        }
      });`
);

// ── 2. buildViewGrid (view stockpile) ──────────────────────────────────────────
replace('buildViewGrid category logic',
  `      allItems.forEach(function(item) {
        var key        = normKey(item.name);
        var displayCat = item.category;
        if (item.category === 'Vehicles')                  displayCat = 'Vehicles Non-Crate';
        else if (item.category === 'Shippable Structures') displayCat = 'Shippable Structures Non-Crate';
        var count = viewItems[key] !== undefined ? viewItems[key] : (viewItems[item.name] || 0);
        if (count > 0) html += makeViewCard(key, item.imgUrl, count, displayCat);

        if (item.category === 'Vehicles' || item.category === 'Shippable Structures') {
          var crateKey   = key + ' (Crate)';
          var crateCount = viewItems[crateKey];
          if (crateCount !== undefined && crateCount > 0) {
            html += makeViewCard(crateKey, item.imgUrl, crateCount, item.category);
            renderedExtras[crateKey] = true;
          }
        }
      });`,
  `      allItems.forEach(function(item) {
        var key = normKey(item.name);
        var cat = item.category;
        if (cat === 'Vehicles' || cat === 'Shippable Structures') {
          var nonCrateCat = cat === 'Vehicles' ? 'Vehicles Non-Crate' : 'Shippable Structures Non-Crate';
          var count = viewItems[key] !== undefined ? viewItems[key] : (viewItems[item.name] || 0);
          if (count > 0) html += makeViewCard(key, item.imgUrl, count, nonCrateCat);
          var crateKey   = key + ' (Crate)';
          var crateCount = viewItems[crateKey];
          if (crateCount !== undefined && crateCount > 0) {
            html += makeViewCard(crateKey, item.imgUrl, crateCount, cat);
            renderedExtras[crateKey] = true;
          }
        } else {
          var count = viewItems[key] !== undefined ? viewItems[key] : (viewItems[item.name] || 0);
          if (count > 0) html += makeViewCard(key, item.imgUrl, count, cat);
        }
      });`
);

// ── 3. buildCompareGrid (view request) ────────────────────────────────────────
replace('buildCompareGrid category logic',
  `      allItems.forEach(function(item) {
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
      });`,
  `      allItems.forEach(function(item) {
        var key = normKey(item.name);
        var cat = item.category;
        if (cat === 'Vehicles' || cat === 'Shippable Structures') {
          var nonCrateCat = cat === 'Vehicles' ? 'Vehicles Non-Crate' : 'Shippable Structures Non-Crate';
          var requested = req.items[key] !== undefined ? req.items[key] : (req.items[item.name] || 0);
          if (requested > 0) {
            html += makeCompareCard(key, item.imgUrl, requested, covered[key] || 0, nonCrateCat, anySelected);
          }
          var crateKey = key + ' (Crate)';
          var reqCrate = req.items[crateKey];
          if (reqCrate !== undefined && reqCrate > 0) {
            html += makeCompareCard(crateKey, item.imgUrl, reqCrate, covered[crateKey] || 0, cat, anySelected);
            renderedExtras[crateKey] = true;
          }
        } else {
          var requested = req.items[key] !== undefined ? req.items[key] : (req.items[item.name] || 0);
          if (requested > 0) {
            html += makeCompareCard(key, item.imgUrl, requested, covered[key] || 0, cat, anySelected);
          }
        }
      });`
);

// ── 4. buildRequestItemsGrid (add request — shows ALL items) ──────────────────
replace('buildRequestItemsGrid category logic',
  `      allItems.forEach(function(item) {
        var key        = normKey(item.name);
        var displayCat = item.category;
        if (item.category === 'Vehicles')                  displayCat = 'Vehicles Non-Crate';
        else if (item.category === 'Shippable Structures') displayCat = 'Shippable Structures Non-Crate';
        var count = currentRequest.items[key] || 0;
        html += makeItemCard(key, item.imgUrl, count, displayCat, false);
        if (item.category === 'Vehicles' || item.category === 'Shippable Structures') {
          var crateKey   = key + ' (Crate)';
          var crateCount = currentRequest.items[crateKey] || 0;
          html += makeItemCard(crateKey, item.imgUrl, crateCount, item.category, false);
          renderedExtras[crateKey] = true;
        }
      });`,
  `      allItems.forEach(function(item) {
        var key = normKey(item.name);
        var cat = item.category;
        if (cat === 'Vehicles' || cat === 'Shippable Structures') {
          var nonCrateCat = cat === 'Vehicles' ? 'Vehicles Non-Crate' : 'Shippable Structures Non-Crate';
          var count = currentRequest.items[key] || 0;
          html += makeItemCard(key, item.imgUrl, count, nonCrateCat, false);
          var crateKey   = key + ' (Crate)';
          var crateCount = currentRequest.items[crateKey] || 0;
          html += makeItemCard(crateKey, item.imgUrl, crateCount, cat, false);
          renderedExtras[crateKey] = true;
        } else {
          var count = currentRequest.items[key] || 0;
          html += makeItemCard(key, item.imgUrl, count, cat, false);
        }
      });`
);

// ── 5. buildStockRefGrid (toggle stock ref view) ──────────────────────────────
replace('buildStockRefGrid category logic',
  `      allItems.forEach(function(item) {
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
      });`,
  `      allItems.forEach(function(item) {
        var key = normKey(item.name);
        var cat = item.category;
        if (cat === 'Vehicles' || cat === 'Shippable Structures') {
          var nonCrateCat = cat === 'Vehicles' ? 'Vehicles Non-Crate' : 'Shippable Structures Non-Crate';
          var count = totalStock[key] || 0;
          if (count > 0) html += makeViewCard(key, item.imgUrl, count, nonCrateCat);
          var crateKey   = key + ' (Crate)';
          var crateCount = totalStock[crateKey] || 0;
          if (crateCount > 0) {
            html += makeViewCard(crateKey, item.imgUrl, crateCount, cat);
            renderedExtras[crateKey] = true;
          }
        } else {
          var count = totalStock[key] || 0;
          if (count > 0) html += makeViewCard(key, item.imgUrl, count, cat);
        }
      });`
);

// ── 6. buildRefGrid (reference panel in add-request) ─────────────────────────
replace('buildRefGrid category logic',
  `      allItems.forEach(function(item) {
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
      });`,
  `      allItems.forEach(function(item) {
        var key = normKey(item.name);
        var cat = item.category;
        if (cat === 'Vehicles' || cat === 'Shippable Structures') {
          var nonCrateCat = cat === 'Vehicles' ? 'Vehicles Non-Crate' : 'Shippable Structures Non-Crate';
          var count = refItems[key] || 0;
          if (count > 0) html += makeViewCard(key, item.imgUrl, count, nonCrateCat);
          var crateKey   = key + ' (Crate)';
          var crateCount = refItems[crateKey] || 0;
          if (crateCount > 0) {
            html += makeViewCard(crateKey, item.imgUrl, crateCount, cat);
            renderedExtras[crateKey] = true;
          }
        } else {
          var count = refItems[key] || 0;
          if (count > 0) html += makeViewCard(key, item.imgUrl, count, cat);
        }
      });`
);

if (!ok) { console.error('PATCH FAILED'); process.exit(1); }
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
