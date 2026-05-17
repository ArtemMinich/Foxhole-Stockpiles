const fs = require('fs');
let html = fs.readFileSync('ui.html', 'utf8');

// ── 1. Add CSS before </style> ─────────────────────────────────────────────────
html = html.replace(
  '  </style>',
  `    .item-card.compare-done { border-color: var(--green); opacity: 0.45; }
    .cmp-done { color: var(--green); }
    .cmp-need { color: var(--red);   }
  </style>`
);

// ── 2. Replace makeCompareCard with new simpler design ─────────────────────────
const oldFn = `    function makeCompareCard(name, imgUrl, requested, covered, category, anySelected) {
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
    }`;

const newFn = `    function makeCompareCard(name, imgUrl, requested, covered, category, anySelected) {
      var imgTag = imgUrl
        ? '<img src="' + esc(imgUrl) + '" alt="" loading="lazy">'
        : '<div class="item-img-placeholder"></div>';
      if (!anySelected) {
        return '<div class="item-card" data-cat="' + esc(category) + '">' +
               imgTag +
               '<span class="item-name">' + esc(name) + '</span>' +
               '<span class="view-count">' + requested + '</span>' +
               '</div>';
      }
      var remaining = Math.max(0, requested - covered);
      var done    = remaining === 0;
      var cardCls = done ? ' compare-done' : '';
      var cntCls  = done ? ' cmp-done'     : ' cmp-need';
      return '<div class="item-card' + cardCls + '" data-cat="' + esc(category) + '">' +
             imgTag +
             '<span class="item-name">' + esc(name) + '</span>' +
             '<span class="view-count' + cntCls + '">' + remaining + '</span>' +
             '</div>';
    }`;

if (!html.includes(oldFn)) {
  console.error('ERROR: old makeCompareCard not found — check whitespace');
  process.exit(1);
}

html = html.replace(oldFn, newFn);
fs.writeFileSync('ui.html', html, 'utf8');
console.log('Done. Length:', html.length);
