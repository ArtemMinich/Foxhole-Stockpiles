import { FOXHOLE_ITEMS } from './data/items'
import { FOXHOLE_ITEMS_CATEGORIES } from './data/category'
import { C } from './theme'

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
  items: Record<string, number>
  lastUpdated: number
  lastEditedBy: string
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
  onViewSum:     (leaves: Stockpile[], title: string) => Promise<void>
  visibleFields: string[]
  collapsed:     Record<string, boolean>
  toggleNode:    (key: string) => void
}

function buildTree(all: Stockpile[]): RegionMap {
  const tree: RegionMap = {}
  for (const s of all) {
    if (!tree[s.region])                     tree[s.region] = {}
    if (!tree[s.region][s.hex])              tree[s.region][s.hex] = {}
    if (!tree[s.region][s.hex][s.structure]) tree[s.region][s.hex][s.structure] = []
    tree[s.region][s.hex][s.structure].push(s)
  }
  return tree
}

// Flatten all leaves under a StructureMap
function leavesOfStruct(structMap: StructureMap): Stockpile[] {
  return Object.values(structMap).reduce(function(acc: Stockpile[], arr: Stockpile[]) {
    return acc.concat(arr)
  }, [])
}

// Flatten all leaves under a HexMap
function leavesOfHex(hexMap: HexMap): Stockpile[] {
  return Object.values(hexMap).reduce(function(acc: Stockpile[], structMap: StructureMap) {
    return acc.concat(leavesOfStruct(structMap))
  }, [])
}

// Aggregate visible field counts across a list of stockpiles
function computeSum(leaves: Stockpile[], fields: string[]): Record<string, number> {
  const totals: Record<string, number> = {}
  for (let i = 0; i < leaves.length; i++) {
    const s = leaves[i]
    for (let j = 0; j < fields.length; j++) {
      const f = fields[j]
      const v = s.items[f] || 0
      if (v > 0) totals[f] = (totals[f] || 0) + v
    }
  }
  return totals
}

// ─── Tree rendering ───────────────────────────────────────────────────────────

// Renders roll-up sum lines below a section header.
// Returns null if no visible fields are configured or all totals are zero.
function renderSumFields(sum: Record<string, number>, fields: string[]) {
  if (fields.length === 0) return null
  const nonZero = fields.filter((f) => (sum[f] || 0) > 0)
  if (nonZero.length === 0) return null
  return (
    <AutoLayout direction="vertical" spacing={1} padding={{ left: 6 }}>
      {nonZero.map((f) => (
        <Text key={f} fontSize={10} fill={C.muted}>
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
  return (
    <AutoLayout direction="vertical" spacing={4} padding={{ left: 12 }}>
      {leaves.map((s) => {
        const fields = opts.visibleFields.filter((f) => (s.items[f] || 0) > 0)
        const tsLine = s.lastUpdated
          ? fmtDate(s.lastUpdated) + (s.lastEditedBy ? ' · ' + s.lastEditedBy : '')
          : ''
        return (
          <AutoLayout key={s.id} direction="vertical" spacing={1}>
            <AutoLayout direction="horizontal" spacing={6} verticalAlignItems="center">
              <Text fontSize={11} fill={C.text} onClick={() => opts.onViewSum([s], s.region + ' › ' + s.hex + ' › ' + s.structure + ' › ' + s.code)}>
                {s.code}
              </Text>
              {tsLine
                ? <Text fontSize={9} fill={C.muted}>{tsLine}</Text>
                : null
              }
            </AutoLayout>
            {fields.map((f) => (
              <Text key={f} fontSize={10} fill={C.muted}>
                {f + ': ' + s.items[f]}
              </Text>
            ))}
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

function renderStructures(structMap: StructureMap, opts: RenderOpts, hexKey: string) {
  return (
    <AutoLayout direction="vertical" spacing={4} padding={{ left: 12 }}>
      {Object.entries(structMap).map(([structure, leaves]) => {
        const structKey   = hexKey + '|' + structure
        const isCollapsed = opts.collapsed[structKey]
        const sum         = computeSum(leaves, opts.visibleFields)
        const viewTitle   = hexKey.replace(/\|/g, ' › ') + ' › ' + structure
        return (
          <AutoLayout key={structure} direction="vertical" spacing={2}>
            <AutoLayout direction="horizontal" spacing={4} verticalAlignItems="center">
              <Text fontSize={11} fontWeight={600} fill={C.structure} onClick={() => opts.toggleNode(structKey)}>
                {isCollapsed ? '▸' : '▾'}
              </Text>
              <Text fontSize={11} fontWeight={600} fill={C.structure} onClick={() => opts.onViewSum(leaves, viewTitle)}>
                {structure}
              </Text>
            </AutoLayout>
            {isCollapsed ? null : renderSumFields(sum, opts.visibleFields)}
            {isCollapsed ? null : renderLeaves(leaves, opts)}
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

function renderHexes(hexMap: HexMap, opts: RenderOpts, regionKey: string) {
  return (
    <AutoLayout direction="vertical" spacing={6} padding={{ left: 12 }}>
      {Object.entries(hexMap).map(([hex, structMap]) => {
        const hexKey      = regionKey + '|' + hex
        const isCollapsed = opts.collapsed[hexKey]
        const leaves      = leavesOfStruct(structMap)
        const sum         = computeSum(leaves, opts.visibleFields)
        return (
          <AutoLayout key={hex} direction="vertical" spacing={3}>
            <AutoLayout direction="horizontal" spacing={4} verticalAlignItems="center">
              <Text fontSize={12} fontWeight={600} fill={C.hex} onClick={() => opts.toggleNode(hexKey)}>
                {isCollapsed ? '▸' : '▾'}
              </Text>
              <Text fontSize={12} fontWeight={600} fill={C.hex} onClick={() => opts.onViewSum(leaves, regionKey + ' › ' + hex)}>
                {hex}
              </Text>
            </AutoLayout>
            {isCollapsed ? null : renderSumFields(sum, opts.visibleFields)}
            {isCollapsed ? null : renderStructures(structMap, opts, hexKey)}
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

function renderTree(tree: RegionMap, opts: RenderOpts) {
  return (
    <AutoLayout direction="vertical" spacing={10} padding={{ left: 12 }}>
      {Object.entries(tree).map(([region, hexMap]) => {
        const regionKey   = region
        const isCollapsed = opts.collapsed[regionKey]
        const leaves      = leavesOfHex(hexMap)
        const sum         = computeSum(leaves, opts.visibleFields)
        return (
          <AutoLayout key={region} direction="vertical" spacing={4}>
            <AutoLayout direction="horizontal" spacing={4} verticalAlignItems="center">
              <Text fontSize={13} fontWeight={700} fill={C.region} onClick={() => opts.toggleNode(regionKey)}>
                {isCollapsed ? '▸' : '▾'}
              </Text>
              <Text fontSize={13} fontWeight={700} fill={C.region} onClick={() => opts.onViewSum(leaves, region)}>
                {region}
              </Text>
            </AutoLayout>
            {isCollapsed ? null : renderSumFields(sum, opts.visibleFields)}
            {isCollapsed ? null : renderHexes(hexMap, opts, regionKey)}
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

function renderRequests(reqs: Request[], onView: (r: Request) => Promise<void>) {
  return (
    <AutoLayout direction="vertical" spacing={4} padding={{ left: 12 }}>
      {reqs.map((r) => {
        const parts: string[] = []
        if (r.createdAt) parts.push(fmtDate(r.createdAt))
        if (r.createdBy) parts.push(r.createdBy)
        const metaLine = parts.join(' · ')
        return (
          <AutoLayout key={r.id} direction="vertical" spacing={1}>
            <AutoLayout direction="horizontal" spacing={6} verticalAlignItems="center">
              <Text fontSize={11} fill={C.requestItem} onClick={() => onView(r)}>
                {r.name}
              </Text>
              {metaLine
                ? <Text fontSize={9} fill={C.muted}>{metaLine}</Text>
                : null
              }
            </AutoLayout>
            {r.description
              ? <Text fontSize={10} fill={C.muted}>{r.description}</Text>
              : null
            }
          </AutoLayout>
        )
      })}
    </AutoLayout>
  )
}

// ─── Widget ───────────────────────────────────────────────────────────────────

function Widget() {
  const stockpiles = useSyncedMap<Stockpile>("stockpiles")
  const requests   = useSyncedMap<Request>("requests")

  usePropertyMenu(
    [
      { itemType: "action", propertyName: "add",        tooltip: "Add stockpile" },
      { itemType: "action", propertyName: "addrequest", tooltip: "Add request" },
      { itemType: "action", propertyName: "export",     tooltip: "Export JSON" },
      { itemType: "action", propertyName: "import",     tooltip: "Import JSON" },
    ],
    ({ propertyName }) => {
      if (propertyName === "add") {
        return new Promise<void>((resolve) => {
          const existingKeys = stockpiles.values().map((s) =>
            s.region + '|' + s.hex + '|' + s.structure + '|' + s.code
          )
          figma.showUI(__html__, { width: 700, height: 500, title: "Add / Update Stockpile" })
          figma.ui.postMessage({ mode: "add", existingKeys, allItems: FOXHOLE_ITEMS })
          figma.ui.onmessage = (msg: any) => {
            if (msg.type === 'open-url') { figma.openExternal(msg.url); return; }
            if (msg.type === "save" && msg.mode === "add") {
              const incoming = msg.payload as Stockpile
              const all = stockpiles.values()
              let existing: Stockpile | null = null
              for (let i = 0; i < all.length; i++) {
                const s = all[i]
                if (s.code === incoming.code && s.region === incoming.region
                    && s.hex === incoming.hex && s.structure === incoming.structure) {
                  existing = s; break
                }
              }
              const editedBy = figma.currentUser ? figma.currentUser.name : ""
              if (existing) {
                stockpiles.set(existing.id, Object.assign({}, existing, {
                  region:       incoming.region,
                  hex:          incoming.hex,
                  structure:    incoming.structure,
                  items:        incoming.items,
                  lastUpdated:  incoming.lastUpdated,
                  lastEditedBy: editedBy,
                }))
              } else {
                stockpiles.set(incoming.id, Object.assign({}, incoming, {
                  lastEditedBy: editedBy,
                }))
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
          figma.ui.onmessage = function(msg: any) {
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
          figma.ui.postMessage({ mode: "export", stockpiles: data })
          figma.ui.onmessage = function(msg: any) {
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
          figma.ui.onmessage = function(msg: any) {
            if (msg.type === 'open-url') { figma.openExternal(msg.url); return; }
            if (msg.type === "save" && msg.mode === "import") {
              const incoming = msg.payload.stockpiles as Stockpile[]
              const replace  = msg.payload.replace as boolean
              if (replace) {
                const keys = stockpiles.keys()
                for (let i = 0; i < keys.length; i++) {
                  stockpiles.delete(keys[i])
                }
              }
              for (let i = 0; i < incoming.length; i++) {
                stockpiles.set(incoming[i].id, incoming[i])
              }
            }
            figma.closePlugin()
            resolve()
          }
        })
      }
    }
  )

  const [collapsed,     setCollapsed]     = useSyncedState<Record<string, boolean>>("collapsed", {})
  const [rootCollapsed, setRootCollapsed] = useSyncedState<boolean>("rootCollapsed", false)
  const [reqCollapsed,  setReqCollapsed]  = useSyncedState<boolean>("reqCollapsed", false)

  function toggleNode(key: string) {
    const next: Record<string, boolean> = Object.assign({}, collapsed)
    next[key] = !next[key]
    setCollapsed(next)
  }

  const onViewSum = (leaves: Stockpile[], title: string): Promise<void> =>
    new Promise<void>((resolve) => {
      const summed: Record<string, number> = {}
      for (let i = 0; i < leaves.length; i++) {
        const s = leaves[i]
        for (var k in s.items) {
          summed[k] = (summed[k] || 0) + (s.items[k] || 0)
        }
      }
      const spList: Array<{id: string; code: string; region: string; hex: string; structure: string}> = []
      for (let i = 0; i < leaves.length; i++) {
        const s = leaves[i]
        spList.push({ id: s.id, code: s.code, region: s.region, hex: s.hex, structure: s.structure })
      }
      figma.showUI(__html__, { width: 700, height: 800, title: title })
      figma.ui.postMessage({ mode: "view", title: title, items: summed, allItems: FOXHOLE_ITEMS, allCategories: FOXHOLE_ITEMS_CATEGORIES, stockpiles: spList })
      figma.ui.onmessage = function(msg: any) {
        if (msg && msg.type === 'open-url') { figma.openExternal(msg.url); return; }
        if (msg && msg.type === 'delete-stockpile') {
          const ids: string[] = msg.ids || (msg.id ? [msg.id] : [])
          for (let i = 0; i < ids.length; i++) { stockpiles.delete(ids[i]) }
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
  const opts: RenderOpts = { onViewSum, visibleFields: [], collapsed, toggleNode }

  return (
    <AutoLayout
      direction="vertical"
      padding={16}
      spacing={12}
      fill={C.bg}
      cornerRadius={12}
      minWidth={340}
    >
      <AutoLayout direction="horizontal" spacing={6} verticalAlignItems="center">
        <Text fontSize={16} fill={C.muted} onClick={() => setRootCollapsed(!rootCollapsed)}>
          {rootCollapsed ? "▸" : "▾"}
        </Text>
        <Text fontSize={16} fontWeight={700} fill={C.text} onClick={() => onViewSum(all, "UDC Stockpiles")}>
          {"UDC Stockpiles"}
        </Text>
      </AutoLayout>

      {rootCollapsed ? null : all.length === 0
        ? (
          <Text fontSize={12} fill={C.muted}>
            {"No stockpiles — use ⋮ menu → \"Add stockpile\""}
          </Text>
        )
        : renderTree(tree, opts)
      }

      <AutoLayout direction="horizontal" spacing={6} verticalAlignItems="center">
        <Text fontSize={14} fill={C.muted} onClick={() => setReqCollapsed(!reqCollapsed)}>
          {reqCollapsed ? '▸' : '▾'}
        </Text>
        <Text fontSize={14} fontWeight={700} fill={C.request}>
          {'Requests'}
        </Text>
      </AutoLayout>

      {reqCollapsed ? null : allRequests.length === 0
        ? (
          <Text fontSize={12} fill={C.muted}>
            {'No requests — use ⋮ menu → "Add request"'}
          </Text>
        )
        : renderRequests(allRequests, onViewRequest)
      }
    </AutoLayout>
  )
}

widget.register(Widget)
