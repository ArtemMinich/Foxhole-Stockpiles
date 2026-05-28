import { FOXHOLE_ITEMS } from './data/items'
import { FOXHOLE_ITEMS_CATEGORIES, FoxholeItemCategory } from './data/category'
import { HEX_LAYOUT } from './data/hexLayout'
import { FOXHOLE_STORAGE_TYPE_ALIASES, FoxholeStorageType } from './data/storage-type'
import ROAD_GRAPH_RAW from './data/roadGraph.json'
import { C } from './theme'

const ROAD_GRAPH = ROAD_GRAPH_RAW as unknown as { nodes: Array<[number, number]>; edges: Array<[number, number, number, string | number | undefined]> }
const ROAD_NODES = ROAD_GRAPH.nodes
const ROAD_EDGES = ROAD_GRAPH.edges

let ROAD_ADJ: Array<Array<{ to: number; w: number }>> | null = null
function getAdjacency(): Array<Array<{ to: number; w: number }>> {
  if (ROAD_ADJ) return ROAD_ADJ
  const adj: Array<Array<{ to: number; w: number }>> = []
  for (let i = 0; i < ROAD_NODES.length; i++) adj.push([])
  const linked: Record<string, boolean> = {}
  for (let i = 0; i < ROAD_EDGES.length; i++) {
    const e = ROAD_EDGES[i]
    const a = e[0], b = e[1], w = roadTravelCost(e)
    adj[a].push({ to: b, w })
    adj[b].push({ to: a, w })
    linked[a < b ? a + ':' + b : b + ':' + a] = true
  }

  const cellSize = 0.004
  const stitchRadius = 0.0022
  const stitchRadius2 = stitchRadius * stitchRadius
  const grid: Record<string, number[]> = {}
  for (let i = 0; i < ROAD_NODES.length; i++) {
    const n = ROAD_NODES[i]
    const cx = Math.floor(n[0] / cellSize)
    const cy = Math.floor(n[1] / cellSize)
    const key = cx + ':' + cy
    if (!grid[key]) grid[key] = []
    grid[key].push(i)
  }

  for (let i = 0; i < ROAD_NODES.length; i++) {
    const n = ROAD_NODES[i]
    const cx = Math.floor(n[0] / cellSize)
    const cy = Math.floor(n[1] / cellSize)
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const bucket = grid[(cx + ox) + ':' + (cy + oy)]
        if (!bucket) continue
        for (let bi = 0; bi < bucket.length; bi++) {
          const j = bucket[bi]
          if (j <= i) continue
          const pairKey = i + ':' + j
          if (linked[pairKey]) continue
          const m = ROAD_NODES[j]
          const dx = n[0] - m[0]
          const dy = n[1] - m[1]
          const d2 = dx * dx + dy * dy
          if (d2 > stitchRadius2) continue
          const d = Math.sqrt(d2)
          const w = d / 2
          adj[i].push({ to: j, w })
          adj[j].push({ to: i, w })
          linked[pairKey] = true
        }
      }
    }
  }
  ROAD_ADJ = adj
  return adj
}

type Rect2 = { x: number; y: number; width: number; height: number }

function toFigma(gx: number, gy: number, bb: Rect2): { fx: number; fy: number } {
  return { fx: bb.x + gx * bb.width, fy: bb.y + (1 - gy) * bb.height }
}

function roadTier(e: [number, number, number, string | number | undefined]): 1 | 2 | 3 {
  const raw = e[3]
  if (raw === 1 || raw === '1' || raw === 't1' || raw === 'T1') return 1
  if (raw === 2 || raw === '2' || raw === 't2' || raw === 'T2') return 2
  if (raw === 3 || raw === '3' || raw === 't3' || raw === 'T3') return 3

  const a = ROAD_NODES[e[0]]
  const b = ROAD_NODES[e[1]]
  const d = Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]))
  if (d <= 0) return 1
  const costPerDistance = e[2] / d
  if (costPerDistance >= 1.02) return 3
  if (costPerDistance >= 0.96) return 2
  return 1
}

function roadTravelCost(e: [number, number, number, string | number | undefined]): number {
  const tier = roadTier(e)
  const speed = tier === 3 ? 1.05 : tier === 2 ? 1.025 : 1
  const a = ROAD_NODES[e[0]]
  const b = ROAD_NODES[e[1]]
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  return Math.sqrt(dx * dx + dy * dy) / speed
}

function snapNode(gx: number, gy: number): number {
  let best = 0, bestD = Infinity
  for (let i = 0; i < ROAD_NODES.length; i++) {
    const dx = ROAD_NODES[i][0] - gx
    const dy = ROAD_NODES[i][1] - gy
    const d = dx * dx + dy * dy
    if (d < bestD) { bestD = d; best = i }
  }
  return best
}

type SnapCandidate = { idx: number; d: number }

function snapCandidates(gx: number, gy: number, limit = 10): SnapCandidate[] {
  const best: SnapCandidate[] = []
  for (let i = 0; i < ROAD_NODES.length; i++) {
    const dx = ROAD_NODES[i][0] - gx
    const dy = ROAD_NODES[i][1] - gy
    const d = Math.sqrt(dx * dx + dy * dy)
    if (best.length < limit) {
      best.push({ idx: i, d })
      best.sort(function(a, b) { return b.d - a.d })
    } else if (d < best[0].d) {
      best[0] = { idx: i, d }
      best.sort(function(a, b) { return b.d - a.d })
    }
  }
  best.sort(function(a, b) { return a.d - b.d })
  return best
}

function heapPush(h: Array<[number, number]>, f: number, n: number): void {
  h.push([f, n])
  let i = h.length - 1
  while (i > 0) {
    const p = (i - 1) >> 1
    if (h[p][0] > h[i][0]) {
      const t = h[p]; h[p] = h[i]; h[i] = t
      i = p
    } else break
  }
}

function heapPop(h: Array<[number, number]>): [number, number] | null {
  if (h.length === 0) return null
  const min = h[0]
  const last = h.pop() as [number, number]
  if (h.length > 0) {
    h[0] = last
    let i = 0
    const n = h.length
    while (true) {
      const l = 2 * i + 1, r = 2 * i + 2
      let s = i
      if (l < n && h[l][0] < h[s][0]) s = l
      if (r < n && h[r][0] < h[s][0]) s = r
      if (s !== i) {
        const t = h[s]; h[s] = h[i]; h[i] = t
        i = s
      } else break
    }
  }
  return min
}

function aStar(startIdx: number, goalIdx: number): number[] | null {
  if (startIdx === goalIdx) return [startIdx]
  const adj = getAdjacency()
  const cameFrom: Record<number, number> = {}
  const gScore: Record<number, number> = {}
  gScore[startIdx] = 0
  const goal = ROAD_NODES[goalIdx]
  const heuristic = (idx: number): number => {
    const n = ROAD_NODES[idx]
    const dx = n[0] - goal[0]
    const dy = n[1] - goal[1]
    return Math.sqrt(dx * dx + dy * dy) / 1.05
  }
  const open: Array<[number, number]> = []
  heapPush(open, heuristic(startIdx), startIdx)
  const closed: Record<number, boolean> = {}

  while (open.length > 0) {
    const entry = heapPop(open) as [number, number]
    const current = entry[1]
    if (closed[current]) continue
    if (current === goalIdx) {
      const path: number[] = [current]
      let c = current
      while (cameFrom[c] !== undefined) {
        c = cameFrom[c]
        path.unshift(c)
      }
      return path
    }
    closed[current] = true
    const neighbors = adj[current]
    const gCur = gScore[current]
    for (let i = 0; i < neighbors.length; i++) {
      const to = neighbors[i].to
      if (closed[to]) continue
      const tentative = gCur + neighbors[i].w
      const prev = gScore[to]
      if (prev === undefined || tentative < prev) {
        cameFrom[to] = current
        gScore[to] = tentative
        heapPush(open, tentative + heuristic(to), to)
      }
    }
  }
  return null
}

function roadPath(gxFrom: number, gyFrom: number, gxTo: number, gyTo: number): number[] | null {
  return aStar(snapNode(gxFrom, gyFrom), snapNode(gxTo, gyTo))
}

type RouteEntry = { id: string; fromId: string; toId: string; routeLineId?: string }

type RoutePoint = {
  id: string
  label: string
  gx: number
  gy: number
  code: string
}

function routePointKey(sp: Stockpile): string {
  const x = sp.x == null ? '' : String(sp.x)
  const y = sp.y == null ? '' : String(sp.y)
  return sp.region + '|' + sp.hex + '|' + normalizeImportedStorageType(sp.structure) + '|' + x + '|' + y
}

function routePointLabel(sp: Stockpile): string {
  return sp.region + ' > ' + sp.hex + ' > ' + normalizeImportedStorageType(sp.structure)
}

function routePointFromStockpile(sp: Stockpile): RoutePoint | null {
  if (sp.x == null || sp.y == null) return null
  const hr = HEX_LAYOUT[sp.region]
  if (!hr) return null
  return {
    id: routePointKey(sp),
    label: routePointLabel(sp),
    gx: hr.x + sp.x * hr.w,
    gy: hr.y + hr.h - sp.y * hr.h,
    code: sp.code,
  }
}

const { widget } = figma
const {
  useSyncedMap,
  useSyncedState,
  usePropertyMenu,
  AutoLayout,
  Text,
} = widget

// ─── Data model ──────────────────────────────────────────────────────────────

type Stockpile = {
  id: string
  region: string
  hex: string
  structure: string
  code: string
  password?: string
  x?: number
  y?: number
  items: Record<string, number>
  lastUpdated: number
  lastEditedBy: string
}

const ITEM_ALIAS_BY_NAME: Record<string, string> = {}
const ITEM_CATEGORY_BY_NAME: Record<string, FoxholeItemCategory> = {}
for (let i = 0; i < FOXHOLE_ITEMS.length; i++) {
  const item = FOXHOLE_ITEMS[i]
  const itemName = normItemKey(item.name)
  ITEM_ALIAS_BY_NAME[itemName] = itemName
  ITEM_CATEGORY_BY_NAME[itemName] = item.category
  if (item.nameRus) ITEM_ALIAS_BY_NAME[normItemKey(item.nameRus)] = itemName
}

function normItemKey(value: string): string {
  return String(value)
    .replace(/’/g, "'")
    .replace(/‘/g, "'")
    .replace(/\s+\(Ящик\)$/i, ' (Crate)')
}

function normalizeImportedItemName(value: string): string {
  const name = normItemKey(value)
  const crateSuffix = ' (Crate)'
  const hasCrate = name.length > crateSuffix.length && name.slice(-crateSuffix.length) === crateSuffix
  const base = hasCrate ? name.slice(0, -crateSuffix.length) : name
  const canonicalBase = ITEM_ALIAS_BY_NAME[base] || base
  return hasCrate ? canonicalBase + crateSuffix : canonicalBase
}

function normalizeImportedItems(items: Record<string, number> | undefined): Record<string, number> {
  const result: Record<string, number> = {}
  if (!items) return result
  const keys = Object.keys(items)
  for (let i = 0; i < keys.length; i++) {
    const rawName = keys[i]
    const rawCount = items[rawName]
    if (typeof rawCount !== 'number' || rawCount <= 0) continue
    const normalizedName = normalizeImportedItemName(rawName)
    const crateSuffix = ' (Crate)'
    const hasCrate = normalizedName.length > crateSuffix.length && normalizedName.slice(-crateSuffix.length) === crateSuffix
    if (hasCrate) {
      const base = normalizedName.slice(0, -crateSuffix.length)
      const cat = ITEM_CATEGORY_BY_NAME[base]
      if (cat === FoxholeItemCategory.Vehicles || cat === FoxholeItemCategory.ShippableStructures) {
        result[normalizedName] = (result[normalizedName] || 0) + rawCount
      } else {
        result[base] = (result[base] || 0) + rawCount
      }
    } else {
      result[normalizedName] = (result[normalizedName] || 0) + rawCount
    }
  }
  return result
}

function normalizeImportedStorageType(value: string): string {
  const raw = String(value || '').trim()
  if (!raw) return raw
  if (FOXHOLE_STORAGE_TYPE_ALIASES[raw]) return FOXHOLE_STORAGE_TYPE_ALIASES[raw]
  const lower = raw.toLocaleLowerCase()
  const aliases = Object.keys(FOXHOLE_STORAGE_TYPE_ALIASES)
  for (let i = 0; i < aliases.length; i++) {
    const alias = aliases[i]
    if (alias.toLocaleLowerCase() === lower) return FOXHOLE_STORAGE_TYPE_ALIASES[alias]
  }
  return raw
}

function normalizeImportedStockpile(stockpile: Stockpile): Stockpile {
  const password = stockpile.password ? String(stockpile.password).replace(/\D/g, '') : ''
  const normalized = Object.assign({}, stockpile, {
    structure: normalizeImportedStorageType(stockpile.structure),
    items: normalizeImportedItems(stockpile.items),
  })
  if (password) normalized.password = password
  else delete normalized.password
  return normalized
}

type Request = {
  id:          string
  name:        string
  description: string
  items:       Record<string, number>
  createdAt:   number
  createdBy:   string
  closed:      boolean
}

// ─── Tree helpers ─────────────────────────────────────────────────────────────

type StructureMap = Record<string, Stockpile[]>
type HexMap       = Record<string, StructureMap>
type RegionMap    = Record<string, HexMap>

type RenderOpts = {
  onViewSum:     (leaves: Stockpile[], title: string, showPassword?: boolean) => Promise<void>
  visibleFields: string[]
  collapsed:     Record<string, boolean>
  toggleNode:    (key: string) => void
  scale:         number
}

function s(n: number, sc: number): number {
  return Math.round(n * sc)
}

function buildTree(all: Stockpile[]): RegionMap {
  const tree: RegionMap = {}
  const seen: Record<string, Stockpile> = {}
  for (const sp of all) {
    const structure = normalizeImportedStorageType(sp.structure)
    const dedupeKey = sp.region + '|' + sp.hex + '|' + structure + '|' + sp.code
    let normalizedSp = seen[dedupeKey]
    if (normalizedSp) {
      const itemKeys = Object.keys(sp.items || {})
      for (let i = 0; i < itemKeys.length; i++) {
        const itemKey = itemKeys[i]
        normalizedSp.items[itemKey] = Math.max(normalizedSp.items[itemKey] || 0, sp.items[itemKey] || 0)
      }
      if (!normalizedSp.password && sp.password) normalizedSp.password = sp.password
      if (normalizedSp.x == null && sp.x != null) normalizedSp.x = sp.x
      if (normalizedSp.y == null && sp.y != null) normalizedSp.y = sp.y
      continue
    }
    normalizedSp = Object.assign({}, sp, { structure: structure, items: Object.assign({}, sp.items || {}) })
    seen[dedupeKey] = normalizedSp
    if (!tree[sp.region])                       tree[sp.region] = {}
    if (!tree[sp.region][sp.hex])               tree[sp.region][sp.hex] = {}
    if (!tree[sp.region][sp.hex][structure]) tree[sp.region][sp.hex][structure] = []
    tree[sp.region][sp.hex][structure].push(normalizedSp)
  }
  return tree
}

function leavesOfStruct(structMap: StructureMap): Stockpile[] {
  return Object.values(structMap).reduce(function(acc: Stockpile[], arr: Stockpile[]) {
    return acc.concat(arr)
  }, [])
}

function leavesOfHex(hexMap: HexMap): Stockpile[] {
  return Object.values(hexMap).reduce(function(acc: Stockpile[], structMap: StructureMap) {
    return acc.concat(leavesOfStruct(structMap))
  }, [])
}

function computeSum(leaves: Stockpile[], fields: string[]): Record<string, number> {
  const totals: Record<string, number> = {}
  for (let i = 0; i < leaves.length; i++) {
    const sp = leaves[i]
    for (let j = 0; j < fields.length; j++) {
      const f = fields[j]
      const v = sp.items[f] || 0
      if (v > 0) totals[f] = (totals[f] || 0) + v
    }
  }
  return totals
}

// ─── Tree rendering ───────────────────────────────────────────────────────────

function renderSumFields(sum: Record<string, number>, fields: string[], sc: number) {
  if (fields.length === 0) return null
  const nonZero = fields.filter((f) => (sum[f] || 0) > 0)
  if (nonZero.length === 0) return null
  return (
    <AutoLayout direction="vertical" spacing={s(1, sc)} padding={{ left: s(6, sc) }}>
      {nonZero.map((f) => (
        <Text key={f} fontSize={s(10, sc)} fill={C.muted}>
          {f + ': ' + sum[f]}
        </Text>
      ))}
    </AutoLayout>
  )
}

function fmtDate(ts: number): string {
  if (!ts) return ''
  const d   = new Date(ts)
  const pad = (n: number) => (n < 10 ? '0' : '') + n
  return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear()
    + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes())
}

function renderLeaves(leaves: Stockpile[], opts: RenderOpts) {
  const sc = opts.scale
  return (
    <AutoLayout direction="vertical" spacing={s(4, sc)} padding={{ left: s(12, sc) }}>
      {leaves.map((sp) => {
        const fields = opts.visibleFields.filter((f) => (sp.items[f] || 0) > 0)
        const tsLine = sp.lastUpdated
          ? fmtDate(sp.lastUpdated) + (sp.lastEditedBy ? ' · ' + sp.lastEditedBy : '')
          : ''
        return (
          <AutoLayout key={sp.id} direction="vertical" spacing={s(1, sc)}>
            <AutoLayout direction="horizontal" spacing={s(6, sc)} verticalAlignItems="center">
              <Text fontSize={s(11, sc)} fill={C.text} onClick={() => opts.onViewSum([sp], sp.region + ' › ' + sp.hex + ' › ' + sp.structure + ' › ' + sp.code, true)}>
                {sp.code}
              </Text>
              {tsLine
                ? <Text fontSize={s(9, sc)} fill={C.muted}>{tsLine}</Text>
                : null
              }
            </AutoLayout>
            {fields.map((f) => (
              <Text key={f} fontSize={s(10, sc)} fill={C.muted}>
                {f + ': ' + sp.items[f]}
              </Text>
            ))}
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

function renderStructures(structMap: StructureMap, opts: RenderOpts, hexKey: string) {
  const sc = opts.scale
  return (
    <AutoLayout direction="vertical" spacing={s(4, sc)} padding={{ left: s(12, sc) }}>
      {Object.entries(structMap).map(([structure, leaves]) => {
        const structKey   = hexKey + '|' + structure
        const isCollapsed = opts.collapsed[structKey]
        const sum         = computeSum(leaves, opts.visibleFields)
        const viewTitle   = hexKey.replace(/\|/g, ' › ') + ' › ' + structure
        return (
          <AutoLayout key={structure} direction="vertical" spacing={s(2, sc)}>
            <AutoLayout direction="horizontal" spacing={s(4, sc)} verticalAlignItems="center">
              <Text fontSize={s(11, sc)} fontWeight={600} fill={C.structure} onClick={() => opts.toggleNode(structKey)}>
                {isCollapsed ? '▸' : '▾'}
              </Text>
              <Text fontSize={s(11, sc)} fontWeight={600} fill={C.structure} onClick={() => opts.onViewSum(leaves, viewTitle)}>
                {structure}
              </Text>
            </AutoLayout>
            {isCollapsed ? null : renderSumFields(sum, opts.visibleFields, sc)}
            {isCollapsed ? null : renderLeaves(leaves, opts)}
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

function renderHexes(hexMap: HexMap, opts: RenderOpts, regionKey: string) {
  const sc = opts.scale
  return (
    <AutoLayout direction="vertical" spacing={s(6, sc)} padding={{ left: s(12, sc) }}>
      {Object.entries(hexMap).map(([hex, structMap]) => {
        const hexKey      = regionKey + '|' + hex
        const isCollapsed = opts.collapsed[hexKey]
        const leaves      = leavesOfStruct(structMap)
        const sum         = computeSum(leaves, opts.visibleFields)
        return (
          <AutoLayout key={hex} direction="vertical" spacing={s(3, sc)}>
            <AutoLayout direction="horizontal" spacing={s(4, sc)} verticalAlignItems="center">
              <Text fontSize={s(12, sc)} fontWeight={600} fill={C.hex} onClick={() => opts.toggleNode(hexKey)}>
                {isCollapsed ? '▸' : '▾'}
              </Text>
              <Text fontSize={s(12, sc)} fontWeight={600} fill={C.hex} onClick={() => opts.onViewSum(leaves, regionKey + ' › ' + hex)}>
                {hex}
              </Text>
            </AutoLayout>
            {isCollapsed ? null : renderSumFields(sum, opts.visibleFields, sc)}
            {isCollapsed ? null : renderStructures(structMap, opts, hexKey)}
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

function renderTree(tree: RegionMap, opts: RenderOpts) {
  const sc = opts.scale
  return (
    <AutoLayout direction="vertical" spacing={s(10, sc)} padding={{ left: s(12, sc) }}>
      {Object.entries(tree).map(([region, hexMap]) => {
        const regionKey   = region
        const isCollapsed = opts.collapsed[regionKey]
        const leaves      = leavesOfHex(hexMap)
        const sum         = computeSum(leaves, opts.visibleFields)
        return (
          <AutoLayout key={region} direction="vertical" spacing={s(4, sc)}>
            <AutoLayout direction="horizontal" spacing={s(4, sc)} verticalAlignItems="center">
              <Text fontSize={s(13, sc)} fontWeight={700} fill={C.region} onClick={() => opts.toggleNode(regionKey)}>
                {isCollapsed ? '▸' : '▾'}
              </Text>
              <Text fontSize={s(13, sc)} fontWeight={700} fill={C.region} onClick={() => opts.onViewSum(leaves, region)}>
                {region}
              </Text>
            </AutoLayout>
            {isCollapsed ? null : renderSumFields(sum, opts.visibleFields, sc)}
            {isCollapsed ? null : renderHexes(hexMap, opts, regionKey)}
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

function renderRequests(reqs: Request[], onView: (r: Request) => Promise<void>, sc: number) {
  return (
    <AutoLayout direction="vertical" spacing={s(4, sc)} padding={{ left: s(12, sc) }}>
      {reqs.map((r) => {
        const parts: string[] = []
        if (r.createdAt) parts.push(fmtDate(r.createdAt))
        if (r.createdBy) parts.push(r.createdBy)
        const metaLine = parts.join(' · ')
        return (
          <AutoLayout key={r.id} direction="vertical" spacing={s(1, sc)}>
            <AutoLayout direction="horizontal" spacing={s(6, sc)} verticalAlignItems="center">
              <Text fontSize={s(11, sc)} fill={C.requestItem} onClick={() => onView(r)}>
                {r.name}
              </Text>
              {metaLine
                ? <Text fontSize={s(9, sc)} fill={C.muted}>{metaLine}</Text>
                : null
              }
            </AutoLayout>
            {r.description
              ? <Text fontSize={s(10, sc)} fill={C.muted}>{r.description}</Text>
              : null
            }
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

// ─── Map markers ─────────────────────────────────────────────────────────────

type MapDef = {
  id: string
  name: string
  nodeId: string
  icons?: Record<string, string>
  routeLineId?: string
  routes?: RouteEntry[]
  createdBy?: string
}

type MarkerResult = { idx: Record<string, string>; meta: Record<string, string> }

function parseFigmaNodeId(input: string): string | null {
  if (!input) return null
  const s = input.trim()
  const urlMatch = s.match(/[?&]node-id=([0-9A-Za-z%-]+)/)
  if (urlMatch) return decodeURIComponent(urlMatch[1]).replace('-', ':')
  if (/^[0-9]+-[0-9]+$/.test(s)) return s.replace('-', ':')
  if (/^[0-9]+:[0-9]+$/.test(s)) return s
  return null
}

const MARKER_COLOR: Record<string, { r: number; g: number; b: number }> = {
  [FoxholeStorageType.StorageDepot]:  { r: 0.945, g: 0.576, b: 0.004 },
  [FoxholeStorageType.Seaport]:       { r: 0.298, g: 0.604, b: 0.949 },
  [FoxholeStorageType.AircraftDepot]: { r: 0.557, g: 0.267, b: 0.878 },
}
const MARKER_COLOR_DEFAULT = { r: 0.439, g: 0.447, b: 0.463 }

function markerColor(structure: string): { r: number; g: number; b: number } {
  return MARKER_COLOR[structure] || MARKER_COLOR_DEFAULT
}

type RouteLineStyle = {
  strokes: ReadonlyArray<Paint>
  strokeWeight?: number
  strokeCap?: StrokeCap
  strokeJoin?: StrokeJoin
  dashPattern?: ReadonlyArray<number>
  opacity?: number
}

function isArrowStrokeCap(cap?: StrokeCap): boolean {
  return cap === 'ARROW_LINES' || cap === 'ARROW_EQUILATERAL' || cap === 'DIAMOND_FILLED' || cap === 'TRIANGLE_FILLED' || cap === 'CIRCLE_FILLED'
}

function routeLineStyleFromNode(node: BaseNode | null): RouteLineStyle | null {
  if (!node) return null
  if ('strokes' in node) {
    const src = node as SceneNode & {
      strokes: ReadonlyArray<Paint> | PluginAPI['mixed']
      strokeWeight?: number | PluginAPI['mixed']
      strokeCap?: StrokeCap | PluginAPI['mixed']
      strokeJoin?: StrokeJoin | PluginAPI['mixed']
      dashPattern?: ReadonlyArray<number>
      opacity?: number
    }
    if (src.strokes !== figma.mixed && src.strokes.length > 0) {
      const style: RouteLineStyle = { strokes: src.strokes as ReadonlyArray<Paint> }
      if (typeof src.strokeWeight === 'number') style.strokeWeight = src.strokeWeight
      if (src.strokeCap && src.strokeCap !== figma.mixed) style.strokeCap = src.strokeCap as StrokeCap
      if (src.strokeJoin && src.strokeJoin !== figma.mixed) style.strokeJoin = src.strokeJoin as StrokeJoin
      if (src.dashPattern) style.dashPattern = src.dashPattern
      if (typeof src.opacity === 'number') style.opacity = src.opacity
      return style
    }
  }
  if ('children' in node) {
    const children = (node as ChildrenMixin).children
    for (let i = 0; i < children.length; i++) {
      const style = routeLineStyleFromNode(children[i])
      if (style) return style
    }
  }
  return null
}

function renderMapsWidget(mapsData: MapDef[], onEdit: (m: MapDef | null) => Promise<void>, sc: number) {
  return (
    <AutoLayout direction="vertical" spacing={s(4, sc)} padding={{ left: s(12, sc) }}>
      {mapsData.length === 0
        ? <Text fontSize={s(11, sc)} fill={C.muted}>{'No maps — use ⋮ menu → "Add map"'}</Text>
        : mapsData.map(function(m) {
            return (
              <AutoLayout key={m.id} direction="horizontal" spacing={s(6, sc)} verticalAlignItems="center">
                <Text fontSize={s(11, sc)} fill={C.text} onClick={() => onEdit(m)}>
                  {m.name}
                </Text>
                <Text fontSize={s(9, sc)} fill={C.request}>
                  {((m.routes || []).length) + ' routes'}
                </Text>
                {m.createdBy
                  ? <Text fontSize={s(9, sc)} fill={C.muted}>{m.createdBy}</Text>
                  : null
                }
              </AutoLayout>
            )
          })
      }
    </AutoLayout>
  )
}

// ─── Widget ───────────────────────────────────────────────────────────────────

function Widget() {
  const stockpiles = useSyncedMap<Stockpile>("stockpiles")
  const requests   = useSyncedMap<Request>("requests")

  const [scale, setScale]       = useSyncedState<number>("scale", 1)
  const [maps, setMaps]           = useSyncedState<MapDef[]>("maps", [])
  const [nodeIndex, setNodeIndex] = useSyncedState<Record<string, string>>("nodeIndex", {})
  const [iconMeta,     setIconMeta]     = useSyncedState<Record<string, string>>("iconMeta",     {})
  const [defaultIcons, setDefaultIcons] = useSyncedState<Record<string, string>>("defaultIcons", {})
  const [defaultRouteLineId, setDefaultRouteLineId] = useSyncedState<string>("defaultRouteLineId", "")
  const [routeIdx,     setRouteIdx]     = useSyncedState<Record<string, string>>("routeIdx", {})

  async function redrawMarkers(
    mapsArg:     MapDef[],
    idxArg:      Record<string, string>,
    iconMetaArg: Record<string, string>
  ): Promise<MarkerResult> {
    try { await figma.loadFontAsync({ family: "Inter", style: "Bold" }) } catch (_) {}
    const allSp  = stockpiles.values()
    const newIdx  = Object.assign({}, idxArg)
    const newMeta = Object.assign({}, iconMetaArg)
    const valid: Record<string, boolean> = {}

    for (let mi = 0; mi < mapsArg.length; mi++) {
      const map = mapsArg[mi]
      if (!map.nodeId) continue
      const mapNode = await figma.getNodeByIdAsync(map.nodeId)
      const bb = mapNode ? (mapNode as SceneNode).absoluteBoundingBox : null
      if (!bb) continue

      const iconSize = Math.max(12, bb.width * 0.007)
      const fontSize = Math.max(6,  iconSize * 0.35)
      const lineH    = fontSize * 1.3

      const containerKey    = map.id + ':__'
      valid[containerKey]   = true
      const existingCtrId   = newIdx[containerKey]
      const existingCtrNode = existingCtrId ? await figma.getNodeByIdAsync(existingCtrId) : null
      const ctr: FrameNode  = existingCtrNode ? existingCtrNode as FrameNode : figma.createFrame()
      ctr.name         = map.name
      ctr.fills        = []
      ctr.clipsContent = false
      ctr.resize(bb.width, bb.height)
      ctr.x = bb.x
      ctr.y = bb.y
      if (!existingCtrNode) {
        figma.currentPage.appendChild(ctr)
        newIdx[containerKey] = ctr.id
      }

      const mapIcons    = Object.assign({}, defaultIcons, map.icons || {})
      const liveFrames: Record<string, boolean> = {}
      const groups: Array<{ posKey: string; cx: number; cy: number; items: Stockpile[] }> = []
      const groupIdx: Record<string, number> = {}

      for (let si = 0; si < allSp.length; si++) {
        const sp = allSp[si]
        if (sp.x == null || sp.y == null) continue
        const hr = HEX_LAYOUT[sp.region]
        if (!hr) continue
        const gx = hr.x + sp.x * hr.w
        const gy = hr.y + hr.h - sp.y * hr.h
        const cx = gx * bb.width
        const cy = (1 - gy) * bb.height
        const posKey = sp.region + ':' + sp.x + ':' + sp.y
        if (groupIdx[posKey] == null) {
          groupIdx[posKey] = groups.length
          groups.push({ posKey, cx, cy, items: [] })
        }
        groups[groupIdx[posKey]].items.push(sp)
      }

      for (let gi = 0; gi < groups.length; gi++) {
        const g        = groups[gi]
        const first    = g.items[0]
        const structure = normalizeImportedStorageType(first.structure)
        const frameH   = lineH * g.items.length
        const iconId   = mapIcons[structure] || ''
        const codes    = g.items.map(function(s) { return s.code }).sort().join(',')
        const checkKey = iconId + '|' + codes
        const markerKey = map.id + ':' + g.posKey
        valid[markerKey] = true

        const existingFrId   = newIdx[markerKey]
        const existingFrNode = existingFrId ? await figma.getNodeByIdAsync(existingFrId) : null

        if (existingFrNode && newMeta[markerKey] === checkKey) {
          const fr = existingFrNode as FrameNode
          fr.x = g.cx - iconSize / 2
          fr.y = g.cy - frameH  / 2
          liveFrames[fr.id] = true
          continue
        }

        if (existingFrNode) existingFrNode.remove()

        const fr = figma.createFrame()
        fr.name         = g.items.map(function(s) { return s.code }).join(', ')
        fr.fills        = []
        fr.clipsContent = false
        fr.resize(iconSize, frameH)
        fr.x = g.cx - iconSize / 2
        fr.y = g.cy - frameH  / 2

        let iconNode: SceneNode | null = null
        if (iconId) {
          try {
            const src = await figma.getNodeByIdAsync(iconId)
            if (src && src.type !== 'DOCUMENT' && src.type !== 'PAGE') {
              const cloned = src.type === 'COMPONENT'
                ? (src as ComponentNode).createInstance()
                : (src as SceneNode).clone()
              const target = iconSize * 0.85
              if ('resize' in cloned && cloned.width > 0 && cloned.height > 0) {
                const scale = Math.min(target / cloned.width, target / cloned.height)
                cloned.resize(cloned.width * scale, cloned.height * scale)
              }
              iconNode = cloned
            } else {
              figma.notify('Icon node not found: ' + iconId, { timeout: 2000 })
            }
          } catch (err) {
            figma.notify('Icon clone failed: ' + String(err).slice(0, 80), { timeout: 3000 })
          }
        }
        if (!iconNode) {
          const color      = markerColor(structure)
          const isSeaport  = structure === FoxholeStorageType.Seaport
          const isAircraft = structure === FoxholeStorageType.AircraftDepot
          const shape      = (isSeaport || isAircraft) ? figma.createRectangle() : figma.createEllipse()
          const inner      = iconSize * 0.85
          shape.resize(inner, inner)
          shape.fills = [{ type: 'SOLID', color }]
          if (isSeaport || isAircraft) { (shape as RectangleNode).cornerRadius = 3 }
          iconNode = shape
        }
        iconNode.x = (iconSize - iconNode.width)  / 2
        iconNode.y = (frameH  - iconNode.height) / 2
        fr.appendChild(iconNode)

        for (let ii = 0; ii < g.items.length; ii++) {
          const txt = figma.createText()
          txt.fontName       = { family: 'Inter', style: 'Bold' }
          txt.fontSize       = fontSize
          txt.textAutoResize = 'WIDTH_AND_HEIGHT'
          txt.characters     = g.items[ii].code
          txt.fills          = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
          txt.x = iconSize + 2
          txt.y = ii * lineH + (lineH - fontSize) / 2
          fr.appendChild(txt)
        }

        ctr.appendChild(fr)
        newIdx[markerKey]  = fr.id
        newMeta[markerKey] = checkKey
        liveFrames[fr.id]  = true
      }

      for (let ci = ctr.children.length - 1; ci >= 0; ci--) {
        if (!liveFrames[ctr.children[ci].id]) ctr.children[ci].remove()
      }
    }

    const keys = Object.keys(newIdx)
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]
      if (!valid[k]) {
        const node = await figma.getNodeByIdAsync(newIdx[k])
        if (node) node.remove()
        delete newIdx[k]
        delete newMeta[k]
      }
    }

    return { idx: newIdx, meta: newMeta }
  }

  async function redrawRoutes(
    mapsArg:      MapDef[],
    routeIdxArg:  Record<string, string>,
    markerIdxArg: Record<string, string>
  ): Promise<Record<string, string>> {
    const allSp  = stockpiles.values()
    const spById: Record<string, Stockpile> = {}
    const pointById: Record<string, RoutePoint> = {}
    for (let i = 0; i < allSp.length; i++) {
      const sp = allSp[i]
      spById[sp.id] = sp
      const rp = routePointFromStockpile(sp)
      if (rp && !pointById[rp.id]) pointById[rp.id] = rp
    }

    const newR  = Object.assign({}, routeIdxArg)
    const valid: Record<string, boolean> = {}

    for (let mi = 0; mi < mapsArg.length; mi++) {
      const map = mapsArg[mi]
      if (!map.nodeId) continue
      const routesArg = map.routes || []
      const mapNode = await figma.getNodeByIdAsync(map.nodeId)
      const bb = mapNode ? (mapNode as SceneNode).absoluteBoundingBox : null
      if (!bb) continue

      const ctrId   = markerIdxArg[map.id + ':__']
      const ctrNode = ctrId ? await figma.getNodeByIdAsync(ctrId) : null
      if (!ctrNode || ctrNode.type !== 'FRAME') continue
      const ctr = ctrNode as FrameNode

      const routesKey  = map.id + ':__routes'
      valid[routesKey] = true
      const existingRoutesId = newR[routesKey]
      const existingRoutes   = existingRoutesId ? await figma.getNodeByIdAsync(existingRoutesId) : null
      const routesFrame: FrameNode = existingRoutes ? existingRoutes as FrameNode : figma.createFrame()
      routesFrame.name         = 'routes'
      routesFrame.fills        = []
      routesFrame.clipsContent = false
      routesFrame.resize(bb.width, bb.height)
      routesFrame.x = 0
      routesFrame.y = 0
      while (routesFrame.children.length > 0) routesFrame.children[0].remove()
      if (!existingRoutes) {
        ctr.insertChild(0, routesFrame)
        newR[routesKey] = routesFrame.id
      }

      const strokeW = Math.max(0.5, bb.width * 0.00035)
      const routeScale = Math.max(1, bb.width / 1000)

      for (let ri = 0; ri < routesArg.length; ri++) {
        const r = routesArg[ri]
        const from = pointById[r.fromId] || (spById[r.fromId] ? routePointFromStockpile(spById[r.fromId]) : null)
        const to   = pointById[r.toId]   || (spById[r.toId]   ? routePointFromStockpile(spById[r.toId])   : null)
        if (!from || !to) continue

        const path = roadPath(from.gx, from.gy, to.gx, to.gy)
        const fromPt = { x: from.gx * bb.width, y: (1 - from.gy) * bb.height }
        const toPt   = { x: to.gx   * bb.width, y: (1 - to.gy)   * bb.height }

        const pts: Array<{ x: number; y: number }> = [fromPt]
        if (path) {
          for (let pi = 0; pi < path.length; pi++) {
            const n = ROAD_NODES[path[pi]]
            pts.push({ x: n[0] * bb.width, y: (1 - n[1]) * bb.height })
          }
        }
        pts.push(toPt)
        if (pts.length < 2) continue

        const vec = figma.createVector()
        vec.name = from.label + ' -> ' + to.label + (path ? '' : ' (no path)')
        vec.x = 0
        vec.y = 0
        vec.fills        = []
        const routeLineId = r.routeLineId || defaultRouteLineId
        const template = routeLineId ? await figma.getNodeByIdAsync(routeLineId) : null
        const lineStyle = routeLineStyleFromNode(template)
        const routeCap = lineStyle && isArrowStrokeCap(lineStyle.strokeCap) ? lineStyle.strokeCap : undefined
        const vertices = pts.map(function(p, i) {
          const v: VectorVertex = { x: p.x, y: p.y }
          if (routeCap) {
            if (i === 0) return Object.assign({}, v, { strokeCap: 'NONE' as StrokeCap })
            if (i === pts.length - 1) return Object.assign({}, v, { strokeCap: routeCap })
          }
          return v
        })
        const segments: VectorSegment[] = []
        for (let pi = 1; pi < pts.length; pi++) segments.push({ start: pi - 1, end: pi })
        await vec.setVectorNetworkAsync({ vertices: vertices, segments: segments })
        if (lineStyle) {
          vec.strokes = lineStyle.strokes
          vec.strokeWeight = lineStyle.strokeWeight ? Math.max(strokeW, lineStyle.strokeWeight * routeScale * 0.5) : strokeW
          if (lineStyle.strokeCap) vec.strokeCap = routeCap ? 'NONE' : lineStyle.strokeCap
          if (lineStyle.strokeJoin) vec.strokeJoin = lineStyle.strokeJoin
          if (lineStyle.dashPattern) vec.dashPattern = lineStyle.dashPattern
          if (typeof lineStyle.opacity === 'number') vec.opacity = lineStyle.opacity
        } else {
          vec.strokes      = [{ type: 'SOLID', color: { r: 0.945, g: 0.576, b: 0.004 } }]
          vec.strokeWeight = strokeW
        }
        if (!path) vec.dashPattern = [strokeW * 4, strokeW * 4]
        routesFrame.appendChild(vec)
      }
    }

    const keys = Object.keys(newR)
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]
      if (!valid[k]) {
        const node = await figma.getNodeByIdAsync(newR[k])
        if (node) node.remove()
        delete newR[k]
      }
    }

    return newR
  }

  const openMapDetail = (mapToEdit: MapDef | null): Promise<void> =>
    new Promise<void>((resolve) => {
      const title = mapToEdit ? 'Edit Map' : 'Add Map'
      const ST = [FoxholeStorageType.StorageDepot, FoxholeStorageType.Seaport, FoxholeStorageType.AircraftDepot]
      const newMap: MapDef = mapToEdit || { id: '', name: '', nodeId: '', icons: Object.assign({}, defaultIcons), routes: [], createdBy: figma.currentUser ? figma.currentUser.name : '' }
      const allSp = stockpiles.values()
      const pointIdByStockpileId: Record<string, string> = {}
      const spList: Array<{ id: string; label: string }> = []
      const seenPoints: Record<string, boolean> = {}
      for (let i = 0; i < allSp.length; i++) {
        const sp = allSp[i]
        const point = routePointFromStockpile(sp)
        if (!point) continue
        pointIdByStockpileId[sp.id] = point.id
        if (seenPoints[point.id]) continue
        seenPoints[point.id] = true
        spList.push({ id: point.id, label: point.label })
      }
      const uiMap: MapDef = Object.assign({}, newMap, {
        routes: (newMap.routes || []).map(function(r) {
          return Object.assign({}, r, {
            fromId: pointIdByStockpileId[r.fromId] || r.fromId,
            toId:   pointIdByStockpileId[r.toId]   || r.toId,
          })
        })
      })
      spList.sort(function(a, b) { return a.label < b.label ? -1 : a.label > b.label ? 1 : 0 })
      figma.showUI(__html__, { width: 560, height: 640, title })
      figma.ui.postMessage({ mode: "mapdetail", map: uiMap, isNew: !mapToEdit, storageTypes: ST, allStockpiles: spList, defaultRouteLineId: defaultRouteLineId })
      figma.ui.onmessage = async function(msg: any) {
        if (msg.type === 'open-url') { figma.openExternal(msg.url); return; }
        if (msg.type === 'get-selection') {
          const sel = figma.currentPage.selection
          if (sel.length > 0) figma.ui.postMessage({ type: 'selection-id', nodeId: sel[0].id })
          return
        }
        if (msg.type === 'save-mapdetail') {
          const incoming: MapDef = msg.map
          if (msg.isNew) {
            if (!incoming.id) incoming.id = Date.now().toString(36) + Math.random().toString(36).slice(2)
            incoming.createdBy = figma.currentUser ? figma.currentUser.name : ''
          }
          const updated: MapDef[] = []
          if (msg.isNew) {
            for (let i = 0; i < maps.length; i++) updated.push(maps[i])
            updated.push(incoming)
          } else {
            for (let i = 0; i < maps.length; i++) {
              updated.push(maps[i].id === incoming.id ? incoming : maps[i])
            }
          }
          setMaps(updated)
          const r = await redrawMarkers(updated, nodeIndex, iconMeta)
          setNodeIndex(r.idx); setIconMeta(r.meta)
          const rIdx = await redrawRoutes(updated, routeIdx, r.idx)
          setRouteIdx(rIdx)
        }
        if (msg.type === 'delete-map') {
          const updated: MapDef[] = []
          for (let i = 0; i < maps.length; i++) {
            if (maps[i].id !== msg.id) updated.push(maps[i])
          }
          setMaps(updated)
          const r = await redrawMarkers(updated, nodeIndex, iconMeta)
          setNodeIndex(r.idx); setIconMeta(r.meta)
          const rIdx = await redrawRoutes(updated, routeIdx, r.idx)
          setRouteIdx(rIdx)
        }
        figma.closePlugin()
        resolve()
      }
    })

  usePropertyMenu(
    [
      { itemType: "action", propertyName: "add",          tooltip: "Add stockpile" },
      { itemType: "action", propertyName: "addrequest",  tooltip: "Add request" },
      { itemType: "action", propertyName: "addmap",      tooltip: "Add map" },
      { itemType: "action", propertyName: "export",      tooltip: "Export JSON" },
      { itemType: "action", propertyName: "import",      tooltip: "Import JSON" },
      { itemType: "action", propertyName: "discord",     tooltip: "Import Discord stockpiles" },
      { itemType: "separator" },
      { itemType: "action", propertyName: "settings",     tooltip: "Settings" },
    ],
    ({ propertyName }) => {
      if (propertyName === "add") {
        return new Promise<void>((resolve) => {
          const existingKeys = stockpiles.values().map((sp) =>
            sp.region + '|' + sp.hex + '|' + normalizeImportedStorageType(sp.structure) + '|' + sp.code
          )
          figma.showUI(__html__, { width: 700, height: 500, title: "Add / Update Stockpile" })
          figma.ui.postMessage({ mode: "add", existingKeys, allItems: FOXHOLE_ITEMS, storageTypeAliases: FOXHOLE_STORAGE_TYPE_ALIASES })
          figma.ui.onmessage = async (msg: any) => {
            if (msg.type === 'open-url') { figma.openExternal(msg.url); return; }
            if (msg.type === "save" && msg.mode === "add") {
              const incoming = msg.payload as Stockpile
              const all = stockpiles.values()
              let existing: Stockpile | null = null
              for (let i = 0; i < all.length; i++) {
                const sp = all[i]
                if (sp.code === incoming.code && sp.region === incoming.region
                    && sp.hex === incoming.hex && normalizeImportedStorageType(sp.structure) === normalizeImportedStorageType(incoming.structure)) {
                  existing = sp; break
                }
              }
              const editedBy = figma.currentUser ? figma.currentUser.name : ""
              if (existing) {
                const nextPassword = incoming.password !== undefined && incoming.password !== '' ? incoming.password : existing.password
                stockpiles.set(existing.id, Object.assign({}, existing, {
                  region:       incoming.region,
                  hex:          incoming.hex,
                  structure:    normalizeImportedStorageType(incoming.structure),
                  password:     nextPassword,
                  items:        incoming.items,
                  lastUpdated:  incoming.lastUpdated,
                  lastEditedBy: editedBy,
                }))
              } else {
                stockpiles.set(incoming.id, Object.assign({}, incoming, {
                  structure: normalizeImportedStorageType(incoming.structure),
                  lastEditedBy: editedBy,
                }))
              }
              if (maps.length > 0) {
                const r = await redrawMarkers(maps, nodeIndex, iconMeta)
                setNodeIndex(r.idx); setIconMeta(r.meta)
                const rIdx = await redrawRoutes(maps, routeIdx, r.idx)
                setRouteIdx(rIdx)
              }
            }
            figma.closePlugin()
            resolve()
          }
        })
      }

      if (propertyName === "addrequest") {
        return new Promise<void>((resolve) => {
          figma.showUI(__html__, { width: 1600, height: 750, title: "Add Request" })
          figma.ui.postMessage({ mode: "addrequest", allItems: FOXHOLE_ITEMS, allCategories: FOXHOLE_ITEMS_CATEGORIES, allStockpiles: stockpiles.values() })
          figma.ui.onmessage = async function(msg: any) {
            if (msg.type === 'open-url') { figma.openExternal(msg.url); return; }
            if (msg.type === "save" && msg.mode === "addrequest") {
              const r = msg.payload as Request
              const createdBy = figma.currentUser ? figma.currentUser.name : ""
              requests.set(r.id, Object.assign({}, r, { createdBy: createdBy }))
            }
            figma.closePlugin()
            resolve()
          }
        })
      }

      if (propertyName === "export") {
        return new Promise<void>((resolve) => {
          const data = stockpiles.values()
          figma.showUI(__html__, { width: 700, height: 560, title: "Export JSON" })
          figma.ui.postMessage({ mode: "export", stockpiles: data, maps: maps })
          figma.ui.onmessage = async function(msg: any) {
            if (msg && msg.type === 'open-url') { figma.openExternal(msg.url); return; }
            figma.closePlugin()
            resolve()
          }
        })
      }

      if (propertyName === "import") {
        return new Promise<void>((resolve) => {
          figma.showUI(__html__, { width: 700, height: 500, title: "Import JSON" })
          figma.ui.postMessage({ mode: "import" })
          figma.ui.onmessage = async function(msg: any) {
            if (msg.type === 'open-url') { figma.openExternal(msg.url); return; }
            if (msg.type === "save" && msg.mode === "import") {
              const incoming     = msg.payload.stockpiles as Stockpile[]
              const incomingMaps = msg.payload.maps as MapDef[] | null
              const replace      = msg.payload.replace as boolean
              if (replace) {
                const keys = stockpiles.keys()
                for (let i = 0; i < keys.length; i++) stockpiles.delete(keys[i])
              }
              for (let i = 0; i < incoming.length; i++) {
                stockpiles.set(incoming[i].id, normalizeImportedStockpile(incoming[i]))
              }
              const activeMaps = incomingMaps || maps
              if (incomingMaps) setMaps(incomingMaps)
              if (activeMaps.length > 0) {
                const r = await redrawMarkers(activeMaps, nodeIndex, iconMeta)
                setNodeIndex(r.idx); setIconMeta(r.meta)
                const rIdx = await redrawRoutes(activeMaps, routeIdx, r.idx)
                setRouteIdx(rIdx)
              }
            }
            figma.closePlugin()
            resolve()
          }
        })
      }

      if (propertyName === "discord") {
        return new Promise<void>((resolve) => {
          figma.showUI(__html__, { width: 700, height: 500, title: "Import Discord Stockpiles" })
          figma.ui.postMessage({ mode: "discord", storageTypeAliases: FOXHOLE_STORAGE_TYPE_ALIASES })
          figma.ui.onmessage = async function(msg: any) {
            if (msg.type === 'open-url') { figma.openExternal(msg.url); return; }
            if (msg.type === "save" && msg.mode === "discord") {
              const incoming = msg.payload.stockpiles as Stockpile[]
              const existing: Record<string, boolean> = {}
              const all = stockpiles.values()
              for (let i = 0; i < all.length; i++) {
                const sp = all[i]
                existing[sp.region + '|' + sp.hex + '|' + normalizeImportedStorageType(sp.structure) + '|' + sp.code] = true
              }
              const editedBy = figma.currentUser ? figma.currentUser.name : ""
              for (let i = 0; i < incoming.length; i++) {
                const sp = normalizeImportedStockpile(incoming[i])
                const key = sp.region + '|' + sp.hex + '|' + normalizeImportedStorageType(sp.structure) + '|' + sp.code
                if (existing[key]) continue
                existing[key] = true
                stockpiles.set(sp.id, Object.assign({}, sp, { lastEditedBy: editedBy }))
              }
              if (maps.length > 0) {
                const r = await redrawMarkers(maps, nodeIndex, iconMeta)
                setNodeIndex(r.idx); setIconMeta(r.meta)
                const rIdx = await redrawRoutes(maps, routeIdx, r.idx)
                setRouteIdx(rIdx)
              }
            }
            figma.closePlugin()
            resolve()
          }
        })
      }

      if (propertyName === "settings") {
        return new Promise<void>((resolve) => {
          const ST = [FoxholeStorageType.StorageDepot, FoxholeStorageType.Seaport, FoxholeStorageType.AircraftDepot]
          figma.showUI(__html__, { width: 440, height: 400, title: "Settings" })
          figma.ui.postMessage({ mode: "settings", scale: scale, defaultIcons: defaultIcons, defaultRouteLineId: defaultRouteLineId, storageTypes: ST })
          figma.ui.onmessage = async function(msg: any) {
            if (msg.type === 'save-settings') {
              const sc = msg.scale
              if (typeof sc === "number" && sc > 0 && sc <= 200) setScale(sc)
              const nextDefaultIcons = msg.defaultIcons || {}
              setDefaultIcons(nextDefaultIcons)
              setDefaultRouteLineId(msg.defaultRouteLineId || "")
              const updatedMaps = maps.map(function(m) {
                const nextIcons = Object.assign({}, nextDefaultIcons, m.icons || {})
                const nextRoutes = (m.routes || []).map(function(r) {
                  return Object.assign({}, r, { routeLineId: r.routeLineId || msg.defaultRouteLineId || '' })
                })
                return Object.assign({}, m, {
                  icons: nextIcons,
                  routes: nextRoutes,
                })
              })
              if (updatedMaps.length > 0) {
                setMaps(updatedMaps)
                const r = await redrawMarkers(updatedMaps, nodeIndex, iconMeta)
                setNodeIndex(r.idx); setIconMeta(r.meta)
                const rIdx = await redrawRoutes(updatedMaps, routeIdx, r.idx)
                setRouteIdx(rIdx)
              }
            }
            figma.closePlugin()
            resolve()
          }
        })
      }

      if (propertyName === "addmap") {
        return openMapDetail(null)
      }


    }
  )

  const [collapsed,     setCollapsed]     = useSyncedState<Record<string, boolean>>("collapsed", {})
  const [rootCollapsed, setRootCollapsed] = useSyncedState<boolean>("rootCollapsed", false)
  const [reqCollapsed,  setReqCollapsed]  = useSyncedState<boolean>("reqCollapsed",  false)
  const [mapsCollapsed, setMapsCollapsed] = useSyncedState<boolean>("mapsCollapsed", false)

  function toggleNode(key: string) {
    const next: Record<string, boolean> = Object.assign({}, collapsed)
    next[key] = !next[key]
    setCollapsed(next)
  }

  const onViewSum = (leaves: Stockpile[], title: string, showPassword?: boolean): Promise<void> =>
    new Promise<void>((resolve) => {
      const summed: Record<string, number> = {}
      for (let i = 0; i < leaves.length; i++) {
        const sp = leaves[i]
        for (var k in sp.items) {
          summed[k] = (summed[k] || 0) + (sp.items[k] || 0)
        }
      }
      const spList: Array<{id: string; code: string; region: string; hex: string; structure: string; password?: string; x?: number; y?: number}> = []
      for (let i = 0; i < leaves.length; i++) {
        const sp = leaves[i]
        spList.push({ id: sp.id, code: sp.code, region: sp.region, hex: sp.hex, structure: normalizeImportedStorageType(sp.structure), password: sp.password, x: sp.x, y: sp.y })
      }
      figma.showUI(__html__, { width: 700, height: 800, title: title })
      figma.ui.postMessage({ mode: "view", title: title, items: summed, allItems: FOXHOLE_ITEMS, allCategories: FOXHOLE_ITEMS_CATEGORIES, stockpiles: spList, showPassword: !!showPassword })
      figma.ui.onmessage = async function(msg: any) {
        if (msg && msg.type === 'open-url') { figma.openExternal(msg.url); return; }
        if (msg && msg.type === 'delete-stockpile') {
          const ids: string[] = msg.ids || (msg.id ? [msg.id] : [])
          for (let i = 0; i < ids.length; i++) { stockpiles.delete(ids[i]) }
          if (maps.length > 0) {
            const r = await redrawMarkers(maps, nodeIndex, iconMeta)
            setNodeIndex(r.idx); setIconMeta(r.meta)
            const rIdx = await redrawRoutes(maps, routeIdx, r.idx)
            setRouteIdx(rIdx)
          }
        }
        if (msg && msg.type === 'save-stockpile-password') {
          const all = stockpiles.values()
          for (let i = 0; i < all.length; i++) {
            const sp = all[i]
            if (sp.id !== msg.id) continue
            const password = String(msg.password || '').replace(/\D/g, '')
            const updated = Object.assign({}, sp)
            if (password) updated.password = password
            else delete updated.password
            stockpiles.set(sp.id, updated)
            break
          }
        }
        figma.closePlugin()
        resolve()
      }
    })

  const onViewRequest = (r: Request): Promise<void> =>
    new Promise<void>((resolve) => {
      figma.showUI(__html__, { width: 700, height: 800, title: r.name })
      figma.ui.postMessage({
        mode:          "viewrequest",
        request:       r,
        allStockpiles: stockpiles.values(),
        allItems:      FOXHOLE_ITEMS,
        allCategories: FOXHOLE_ITEMS_CATEGORIES,
      })
      figma.ui.onmessage = function(msg: any) {
        if (msg.type === 'open-url') { figma.openExternal(msg.url); return; }
        if (msg.type === "close-request" && msg.id) {
          const existing = requests.get(msg.id)
          if (existing) {
            requests.set(existing.id, Object.assign({}, existing, { closed: true }))
          }
        }
        figma.closePlugin()
        resolve()
      }
    })

  const all         = stockpiles.values()
  const allRequests = requests.values().filter(function(r) { return !r.closed })
  const tree = buildTree(all)
  const opts: RenderOpts = { onViewSum, visibleFields: [], collapsed, toggleNode, scale }

  return (
    <AutoLayout
      direction="vertical"
      padding={s(16, scale)}
      spacing={s(12, scale)}
      fill={C.bg}
      cornerRadius={s(12, scale)}
      width={s(340, scale)}
    >
      <AutoLayout direction="horizontal" spacing={s(6, scale)} verticalAlignItems="center">
        <Text fontSize={s(16, scale)} fill={C.muted} onClick={() => setRootCollapsed(!rootCollapsed)}>
          {rootCollapsed ? "▸" : "▾"}
        </Text>
        <Text fontSize={s(16, scale)} fontWeight={700} fill={C.text} onClick={() => onViewSum(all, "UDC Stockpiles")}>
          {"UDC Stockpiles"}
        </Text>
      </AutoLayout>

      {rootCollapsed ? null : all.length === 0
        ? (
          <Text fontSize={s(12, scale)} fill={C.muted}>
            {"No stockpiles — use ⋮ menu → \"Add stockpile\""}
          </Text>
        )
        : renderTree(tree, opts)
      }

      <AutoLayout direction="horizontal" spacing={s(6, scale)} verticalAlignItems="center">
        <Text fontSize={s(14, scale)} fill={C.muted} onClick={() => setReqCollapsed(!reqCollapsed)}>
          {reqCollapsed ? '▸' : '▾'}
        </Text>
        <Text fontSize={s(14, scale)} fontWeight={700} fill={C.request}>
          {'Requests'}
        </Text>
      </AutoLayout>

      {reqCollapsed ? null : allRequests.length === 0
        ? (
          <Text fontSize={s(12, scale)} fill={C.muted}>
            {'No requests — use ⋮ menu → "Add request"'}
          </Text>
        )
        : renderRequests(allRequests, onViewRequest, scale)
      }

      <AutoLayout direction="horizontal" spacing={s(6, scale)} verticalAlignItems="center">
        <Text fontSize={s(14, scale)} fill={C.muted} onClick={() => setMapsCollapsed(!mapsCollapsed)}>
          {mapsCollapsed ? '▸' : '▾'}
        </Text>
        <Text fontSize={s(14, scale)} fontWeight={700} fill={C.region}>
          {'Maps'}
        </Text>
      </AutoLayout>

      {mapsCollapsed ? null : renderMapsWidget(maps, openMapDetail, scale)}
    </AutoLayout>
  )
}

widget.register(Widget)
