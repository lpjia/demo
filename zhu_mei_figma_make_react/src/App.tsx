import { useState, type Dispatch, type SetStateAction } from "react"
import Big from 'big.js';
import dayjs from 'dayjs';

type Screen = { id: "login" } | { id: "overview" } | { id: "ledger" } | { id: "ledgerDetail"; entry: LedgerEntry } | { id: "buildings" } | {
  id: "floors"
  building: string
} | {
  id: "workerType"
  building: string
  floor: string
} | {
  id: "workItems"
  building: string
  floor: string
} | {
  id: "inputForm"
  building: string
  floor: string
} | {
  id: "detail"
  building: string
  floor: string
  item: WorkItem
}

interface ResponsiblePerson {
  name: string;
  unitPrice: number;
}

interface WorkItem {
  type: string;
  area: string;
  sqm: number;
  status: "已完工" | "施工中" | "待施工";
  cost: number;
  responsiblePeople: ResponsiblePerson[];
}

const BUILDINGS = ["1号楼一单元", "1号楼二单元", "2号楼一单元", "2号楼二单元", "3号楼一单元"]

const FLOORS = [
  "-1层",
  "1层",
  "2层",
  "3层",
  "4层",
  "5层",
  "6层",
  "7层",
  "8层",
  "9层",
  "10层",
  "11层",
  "12层",
  "13层",
  "14层",
  "15层",
  "16层",
  "17层",
  "18层",
  "19层",
  "20层",
  "21层",
  "22层",
  "23层",
  "24层",
  "25层",
  "26层",
  "27层",
  "28层",
  "29层",
  "30层",
  "31层",
  "32层",
]

const WORKER_TYPE = ["泥工", "木工", "乳胶漆", "小工"]

const INITIAL_ITEMS: WorkItem[] = [
  {
    type: "墙砖",
    area: "大堂",
    sqm: 50,
    status: "已完工",
    cost: 300,
    responsiblePeople: [
      { name: "赵四", unitPrice: 30 },
    ],
  },
  {
    type: "地砖",
    area: "楼梯",
    sqm: 30,
    status: "施工中",
    cost: 300,
    responsiblePeople: [
      { name: "王五", unitPrice: 10 }
    ],
  },
  {
    type: "踢脚线",
    area: "大堂",
    sqm: 20,
    status: "待施工",
    cost: 0,
    responsiblePeople: [
      // { name: "张三", unitPrice: 300 }
    ],
  },
]

const RECENT_RECORDS = [
  {
    building: "1号楼一单元",
    floor: "1层",
    type: "大堂 · 墙砖 · 泥工",
    status: "已完工",
    time: "上报时间: 2026-07-26 19:01",
  },
  {
    building: "1号楼一单元",
    floor: "1层",
    type: "楼梯 · 地砖 · 泥工",
    status: "施工中",
    time: "上报时间: 2026-07-26 19:01",
  },
  {
    building: "1号楼一单元",
    floor: "1层",
    type: "楼梯 · 地砖 · 乳胶漆",
    status: "施工中",
    time: "上报时间: 2026-07-26 19:01",
  },
]

// ── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  bg: "#FFFFFF",
  surface: "#F8F9FB",
  surfaceAlt: "#F0F2F5",
  border: "#E8EBF0",
  borderStrong: "#D1D5DB",
  text: "#111827",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  orange: "#F97316",
  orangeLight: "#FFF7ED",
  orangeBorder: "#FED7AA",
  green: "#16A34A",
  greenLight: "#F0FDF4",
  greenBorder: "#BBF7D0",
  danger: "#DC2626",
  dangerLight: "#FEF2F2",
  dangerBorder: "#FECACA",
  amber: "#D97706",
  amberLight: "#FFFBEB",
  amberBorder: "#FDE68A",
  slate: "#64748B",
  slateLight: "#F8FAFC",
  slateBorder: "#E2E8F0",
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; text: string; border: string }> = {
    已完工: { bg: T.greenLight, text: T.green, border: T.greenBorder },
    施工中: { bg: T.amberLight, text: T.amber, border: T.amberBorder },
    待施工: { bg: T.slateLight, text: T.slate, border: T.slateBorder },
  }
  const c = cfg[status] ?? cfg["待施工"]
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
      }}
    >
      {status}
    </span>
  )
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1 transition-opacity active:opacity-60"
      style={{ color: T.orange }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M11 4L6 9L11 14"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-medium">返回</span>
    </button>
  )
}

function ScreenHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
}) {
  return (
    <div
      className="px-5 pt-4 pb-3"
      style={{ borderBottom: `1px solid ${T.border}` }}
    >
      {onBack && (
        <div className="mb-2">
          <BackButton onBack={onBack} />
        </div>
      )}
      <h1 className="text-lg font-semibold" style={{ color: T.text }}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-xs mt-0.5" style={{ color: T.textTertiary }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Screen 1: Overview ──────────────────────────────────────────────────────
function OverviewScreen({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div
      className="flex flex-col h-full overflow-y-auto scrollbar-hide"
      style={{ background: T.surface }}
    >
      {/* Top bar */}
      <div
        className="px-5 pt-4 pb-4"
        style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: T.orange }}
            >
              工地管理
            </p>
            <h1 className="text-xl font-bold mt-0.5" style={{ color: T.text }}>
              登封智慧城
            </h1>
          </div>
          {/* <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: T.orangeLight,
              border: `1px solid ${T.orangeBorder}`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                stroke={T.orange}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="7" r="4" stroke={T.orange} strokeWidth="2" />
            </svg>
          </div> */}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Progress card */}
        <button
          onClick={() => navigate({ id: "buildings" })}
          className="w-full rounded-2xl p-5 text-left transition-all active:scale-[0.98]"
          style={{
            background: T.bg,
            border: `1px solid ${T.border}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-xs font-medium"
                style={{ color: T.textTertiary }}
              >
                总体施工进度
              </p>
              <p
                className="text-5xl font-bold mt-1 font-mono"
                style={{ color: T.orange }}
              >
                5%
              </p>
              <p className="text-xs mt-2" style={{ color: T.textSecondary }}>
                点击查看楼栋详情 →
              </p>
            </div>
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke={T.surfaceAlt}
                  strokeWidth="7"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke={T.orange}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 26 * 0.05} ${2 * Math.PI * 26}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    stroke={T.orange}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            {
              label: "已完工",
              value: "1",
              color: T.green,
              bg: T.greenLight,
              border: T.greenBorder,
            },
            {
              label: "施工中",
              value: "2",
              color: T.amber,
              bg: T.amberLight,
              border: T.amberBorder,
            },
            {
              label: "待施工",
              value: "30",
              color: T.slate,
              bg: T.slateLight,
              border: T.slateBorder,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3 text-center"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <p
                className="text-2xl font-bold font-mono"
                style={{ color: s.color }}
              >
                {s.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: s.color }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Recent records */}
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm font-semibold" style={{ color: T.text }}>
            最近上报记录
          </p>
          {/* <button
            onClick={() => navigate({ id: "buildings" })}
            className="text-xs font-medium transition-opacity active:opacity-60"
            style={{ color: T.orange }}
          >
            查看更多 →
          </button> */}
        </div>

        <div className="flex flex-col gap-2">
          {RECENT_RECORDS.map((r, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{
                background: T.bg,
                border: `1px solid ${T.border}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <p className="text-sm font-medium" style={{ color: T.text }}>
                    {r.building} · {r.floor}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: T.textTertiary }}
                  >
                    {r.type}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <p className="text-xs" style={{ color: T.textTertiary }}>
                {r.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Screen 2: Buildings ─────────────────────────────────────────────────────
function BuildingsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div
      className="flex flex-col h-full overflow-y-auto scrollbar-hide"
      style={{ background: T.surface }}
    >
      <ScreenHeader
        title="楼栋单元"
        onBack={() => navigate({ id: "overview" })}
      />
      <div className="p-4 flex flex-col gap-3">
        {BUILDINGS.map((b, i) => (
          <button
            key={b}
            onClick={() => navigate({ id: "floors", building: b })}
            className="w-full rounded-2xl p-4 text-left flex items-center justify-between transition-all active:scale-[0.98]"
            style={{
              background: T.bg,
              border: `1px solid ${T.border}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold"
                // style={{
                //   background: i === 0 ? T.orangeLight : T.surfaceAlt,
                //   color: i === 0 ? T.orange : T.textSecondary,
                //   border: `1px solid ${i === 0 ? T.orangeBorder : T.border}`,
                // }}
                style={{
                  background: T.surfaceAlt,
                  color: T.textSecondary,
                  border: `1px solid ${T.border}`,
                }}
              >
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: T.text }}>
                  {b}
                </p>
                <p className="text-xs mt-0.5" style={{ color: T.textTertiary }}>
                  共 {10 + i * 2} 层, <span>已完工 {0} 层</span>
                </p>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke={T.textTertiary}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Screen 3: Floors ────────────────────────────────────────────────────────
function FloorsScreen({
  building,
  navigate,
}: {
  building: string
  navigate: (s: Screen) => void
}) {
  return (
    <div
      className="flex flex-col h-full overflow-y-auto scrollbar-hide"
      style={{ background: T.surface }}
    >
      <ScreenHeader
        title={building}
        subtitle="楼层"
        onBack={() => navigate({ id: "buildings" })}
      />
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {FLOORS.map((f) => {
            const isNeg = f.startsWith("-")
            return (
              <button
                key={f}
                onClick={() =>
                  // navigate({ id: "workItems", building, floor: f })
                  navigate({ id: "workerType", building, floor: f })
                }
                className="rounded-xl py-3.5 text-sm font-medium transition-all active:scale-95"
                style={{
                  background: isNeg ? "#6d6d6d" : T.bg,
                  border: `1px solid ${isNeg ? "#6d6d6d" : T.border}`,
                  color: isNeg ? "#fff" : T.text,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function WorkerTypeScreen({
  building,
  floor,
  navigate,
}: {
  building: string
  floor: string
  navigate: (s: Screen) => void
}) {
  return (
    <div
      className="flex flex-col h-full overflow-y-auto scrollbar-hide"
      style={{ background: T.surface }}
    >
      <ScreenHeader
        title={`${building} · ${floor}`}
        subtitle="工种"
        onBack={() => navigate({ id: "floors", building })}
      />
      <div className="p-4 flex flex-col gap-3">
        {WORKER_TYPE.map((b, i) => (
          <button
            key={b}
            // onClick={() => navigate({ id: "floors", building: b })}
            onClick={() => navigate({ id: "workItems", building, floor })}
            className="w-full rounded-2xl p-4 text-left flex items-center justify-between transition-all active:scale-[0.98]"
            style={{
              background: T.bg,
              border: `1px solid ${T.border}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold"
                style={{
                  background: T.surfaceAlt,
                  color: T.textSecondary,
                  border: `1px solid ${T.border}`,
                }}
              >
                {i + 1}
              </div>
              <div className="flex">
                <p className="font-semibold" style={{ color: T.text }}>{b}</p>
                <p className="font-semibold mx-8" style={{ color: T.text }}>{100 - i * 20}%</p>
                <StatusBadge status={(100 - i * 20) === 100 ? "已完工" : '施工中'} />
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke={T.textTertiary}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Screen 4: Work Items ────────────────────────────────────────────────────
function WorkItemsScreen({
  building,
  floor,
  navigate,
}: {
  building: string
  floor: string
  navigate: (s: Screen) => void
}) {
  const [items] = useState<WorkItem[]>(INITIAL_ITEMS)

  return (
    <div
      className="flex flex-col h-full overflow-y-auto scrollbar-hide"
      style={{ background: T.surface }}
    >
      <ScreenHeader
        title={`${building} · ${floor}`}
        subtitle="施工项目"
        onBack={() => navigate({ id: "workerType", building, floor })}
      />

      <div className="p-4 flex flex-col gap-3">
        {/* <button
          onClick={() => navigate({ id: "inputForm", building, floor })}
          className="w-full rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          style={{
            background: T.orangeLight,
            border: `1.5px dashed ${T.orangeBorder}`,
            color: T.orange,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 2v10M2 7h10"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          新增工程项目
        </button> */}

        {items.map((item, i) => (
          <button
            key={i}
            className="w-full text-left rounded-2xl transition-all active:scale-[0.985]"
            style={{
              background: T.bg,
              border: `1px solid ${T.border}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            {/* Row 1: type + area + status */}
            <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-between"
              onClick={() => navigate({ id: "detail", building, floor, item })}>
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="shrink-0 w-5 h-5 rounded-md text-center text-xs font-bold leading-5"
                  style={{ background: T.surfaceAlt, color: T.textSecondary }}
                >
                  {i + 1}
                </span>
                <span className="font-bold text-base leading-tight" style={{ color: T.text }}>
                  {item.type}
                </span>
                <span className="text-sm" style={{ color: T.textTertiary }}>·</span>
                <span className="text-sm font-medium truncate" style={{ color: T.textSecondary }}>
                  {item.area}
                </span>
              </div>
              <div className="flex items-center">
                <StatusBadge status={item.status} />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3L11 8L6 13"
                    stroke={T.textTertiary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: T.border, margin: "0 16px" }} />

            {/* Row 2: key metrics */}
            <div className="px-4 py-3 flex items-center gap-0">
              {/* 平方 */}
              <div className="flex-1">
                <p className="text-xs" style={{ color: T.textTertiary }}>平方</p>
                <p className="text-base font-bold font-mono mt-0.5" style={{ color: T.text }}>
                  {item.sqm}<span className="text-xs font-normal ml-0.5" style={{ color: T.textTertiary }}>m²</span>
                </p>
              </div>
              {/* separator */}
              <div className="w-px self-stretch mx-3" style={{ background: T.border }} />
              {/* 费用 */}
              <div className="flex-1">
                <p className="text-xs" style={{ color: T.textTertiary }}>费用</p>
                <p className="text-base font-bold font-mono mt-0.5" style={{ color: T.orange }}>
                  ¥{item.cost}
                </p>
              </div>
              {/* separator */}
              <div className="w-px self-stretch mx-3" style={{ background: T.border }} />
              {/* 责任人 */}
              <div className="flex-1">
                <p className="text-xs" style={{ color: T.textTertiary }}>责任人</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: T.text }}>
                  {item.responsiblePeople.length === 0 ? '无' :
                    `${item.responsiblePeople[0].name}`}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Screen 5: Input Form ────────────────────────────────────────────────────
// function InputFormScreen({
//   building,
//   floor,
//   navigate,
// }: {
//   building: string
//   floor: string
//   navigate: (s: Screen) => void
// }) {
//   const [form, setForm] = useState({
//     type: "",
//     area: "",
//     sqm: "",
//     masterRate: "300",
//     workerRate: "200",
//   })
//   const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

//   return (
//     <div
//       className="flex flex-col h-full overflow-y-auto scrollbar-hide"
//       style={{ background: T.surface }}
//     >
//       <ScreenHeader
//         title={`${building} · ${floor}`}
//         subtitle="输入工程信息"
//         onBack={() => navigate({ id: "workItems", building, floor })}
//       />

//       <div className="p-4 flex flex-col gap-4">
//         {[
//           { label: "工种", key: "type", placeholder: "如：地砖、踢脚线…" },
//           { label: "区域", key: "area", placeholder: "如：大堂、楼梯…" },
//           {
//             label: "平米数",
//             key: "sqm",
//             placeholder: "请输入平方米数",
//             type: "number",
//           },
//         ].map((f) => (
//           <div key={f.key}>
//             <label
//               className="block text-xs font-semibold mb-1.5"
//               style={{ color: T.textSecondary }}
//             >
//               {f.label}
//             </label>
//             <input
//               type={f.type ?? "text"}
//               value={(form as Record<string, string>)[f.key]}
//               onChange={(e) => set(f.key, e.target.value)}
//               placeholder={f.placeholder}
//               className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
//               style={{
//                 background: T.bg,
//                 border: `1px solid ${T.borderStrong}`,
//                 color: T.text,
//               }}
//               onFocus={(e) => (e.target.style.borderColor = T.orange)}
//               onBlur={(e) => (e.target.style.borderColor = T.borderStrong)}
//             />
//           </div>
//         ))}

//         <div
//           className="rounded-2xl p-4"
//           style={{ background: T.bg, border: `1px solid ${T.border}` }}
//         >
//           <p
//             className="text-xs font-semibold mb-3"
//             style={{ color: T.textSecondary }}
//           >
//             工价设置
//           </p>
//           <div className="flex flex-col gap-3">
//             {[
//               { label: "师傅工价", key: "masterRate" },
//               { label: "小工工价", key: "workerRate" },
//             ].map((f) => (
//               <div key={f.key} className="flex items-center gap-3">
//                 <span
//                   className="text-sm w-20 shrink-0"
//                   style={{ color: T.text }}
//                 >
//                   {f.label}
//                 </span>
//                 <input
//                   type="number"
//                   value={(form as Record<string, string>)[f.key]}
//                   onChange={(e) => set(f.key, e.target.value)}
//                   className="w-24 rounded-lg px-3 py-2 text-sm font-mono text-center outline-none"
//                   style={{
//                     background: T.orangeLight,
//                     border: `1px solid ${T.orangeBorder}`,
//                     color: T.orange,
//                   }}
//                 />
//                 <span className="text-xs" style={{ color: T.textTertiary }}>
//                   元 / 人天
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={() => navigate({ id: "workItems", building, floor })}
//           className="w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all active:scale-[0.98] mt-1"
//           style={{ background: T.orange }}
//         >
//           保存记录
//         </button>
//       </div>
//     </div>
//   )
// }

// ─── Screen 6: Detail ────────────────────────────────────────────────────────
function DetailScreen({
  building,
  floor,
  item,
  navigate,
}: {
  building: string
  floor: string
  item: WorkItem
  navigate: (s: Screen) => void
}) {
  const [status, setStatus] = useState<WorkItem["status"]>(item.status)
  const [progress, setProgress] = useState<30 | 50 | 80 | 100 | null>(null)
  const [responsiblePeople, setResponsiblePeople] = useState(() =>
    item.responsiblePeople.map((person) => ({ ...person })),
  )
  const [personFormMode, setPersonFormMode] = useState<
    { type: "add" } | { type: "edit"; personIndex: number } | null
  >(null)
  const [personForm, setPersonForm] = useState({ name: "", unitPrice: "" })
  const [deletePersonIndex, setDeletePersonIndex] = useState<number | null>(null)

  const personToDelete =
    deletePersonIndex === null
      ? null
      : responsiblePeople[deletePersonIndex] ?? null

  const parsedUnitPrice = Number(personForm.unitPrice)
  const canSavePerson =
    personForm.name.trim() !== "" &&
    personForm.unitPrice.trim() !== "" &&
    Number.isFinite(parsedUnitPrice) &&
    parsedUnitPrice >= 0

  const openAddPerson = () => {
    setPersonForm({ name: "", unitPrice: "" })
    setPersonFormMode({ type: "add" })
  }

  const openEditPerson = (personIndex: number) => {
    const person = responsiblePeople[personIndex]
    setPersonForm({
      name: person.name,
      unitPrice: String(person.unitPrice),
    })
    setPersonFormMode({ type: "edit", personIndex })
  }

  const closePersonForm = () => setPersonFormMode(null)

  const confirmDeletePerson = () => {
    if (deletePersonIndex === null) return

    setResponsiblePeople((people) =>
      people.filter((_, index) => index !== deletePersonIndex),
    )
    setDeletePersonIndex(null)
  }

  const savePerson = () => {
    if (!personFormMode || !canSavePerson) return

    const values = {
      name: personForm.name.trim(),
      unitPrice: parsedUnitPrice,
    }

    if (personFormMode.type === "add") {
      setResponsiblePeople((people) => [
        ...people,
        { ...values, workDays: 1 },
      ])
    } else {
      const { personIndex } = personFormMode
      setResponsiblePeople((people) =>
        people.map((person, index) =>
          index === personIndex ? { ...person, ...values } : person,
        ),
      )
    }

    closePersonForm()
  }

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden"
      style={{ background: T.surface }}
    >
      {/* <ScreenHeader
        title={`${building} · ${floor}`}
        subtitle={`${item.type} · ${item.area}`}
        onBack={() => navigate({ id: "workItems", building, floor })}
      /> */}
      <ScreenHeader
        title={`${building} · ${floor}`}
        subtitle='详情'
        onBack={() => navigate({ id: "workItems", building, floor })}
      />

      <div className="scrollbar-hide flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">

        <div
          className="rounded-2xl p-4"
          style={{
            background: T.bg,
            border: `1px solid ${T.border}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "施工项", value: item.type },
              { label: "区域", value: item.area },
              { label: "平方数", value: `${item.sqm} 平方米` },
              { label: "施工状态", value: <StatusBadge status={status} /> },
            ].map((row) => (
              <div key={row.label}>
                <p className="text-xs" style={{ color: T.textTertiary }}>
                  {row.label}
                </p>
                <div className="mt-1">
                  {typeof row.value === "string" ? (
                    <p
                      className="text-sm font-semibold"
                      style={{ color: T.text }}
                    >
                      {row.value}
                    </p>
                  ) : (
                    row.value
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={openAddPerson}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold text-white transition-all active:scale-[0.98]"
          style={{
            background: "#5bc0de",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 3v10M3 8h10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          添加责任人
        </button>

        {responsiblePeople.map((person, personIndex) => (
          <div
            key={`${person.name}-${personIndex}`}
            className="rounded-2xl p-4"
            style={{
              background: T.bg,
              border: `1px solid ${T.border}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs" style={{ color: T.textTertiary }}>
                  责任人
                </p>
                <p
                  className="mt-1 truncate text-sm font-semibold"
                  style={{ color: T.text }}
                >
                  {person.name}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditPerson(personIndex)}
                  className="flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs font-semibold transition-colors active:scale-95"
                  style={{
                    background: T.orangeLight,
                    color: T.orange,
                  }}
                  aria-label={`修改责任人${person.name}`}
                  title="修改责任人"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    style={{ display: 'block', transform: 'translateY(1.5px)' }}
                  >
                    <path
                      d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  修改
                </button>
                <button
                  type="button"
                  onClick={() => setDeletePersonIndex(personIndex)}
                  className="flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs font-semibold transition-colors active:scale-95"
                  style={{
                    background: T.dangerLight,
                    color: T.danger,
                  }}
                  aria-label={`删除责任人${person.name}`}
                  title="删除责任人"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    style={{ display: 'block', transform: 'translateY(1.5px)' }}
                  >
                    <path
                      d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  删除
                </button>
              </div>
            </div>
            <div
              className="my-3 h-px"
              style={{ background: T.border }}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs" style={{ color: T.textTertiary }}>
                  单价
                </p>
                <p
                  className="mt-1 text-sm font-semibold"
                  style={{ color: T.text }}
                >
                  {person.unitPrice} 元/平方米
                </p>
              </div>
              <div>
                <p className="text-xs" style={{ color: T.textTertiary }}>
                  工价
                </p>
                <p
                  className="mt-1 text-sm font-semibold"
                  style={{ color: T.text }}
                >
                  {person.unitPrice * item.sqm} 元
                </p>
              </div>
            </div>
          </div>
        ))}

        {/*  <div
          className="rounded-2xl p-4"
          style={{
            background: T.bg,
            border: `1px solid ${T.border}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex flex-col">
            {item.responsiblePeople.map((person, index) => (
              <div
                key={person.name}
                className="flex min-h-11 items-center justify-between gap-4 py-2.5"
                style={{
                  borderBottom:
                    index < item.responsiblePeople.length - 1
                      ? `1px solid ${T.border}`
                      : undefined,
                }}
              >
                <p
                  className="shrink-0 text-sm"
                  style={{ color: T.text }}
                >
                  责任人{item.responsiblePeople.length > 1 ? index + 1 : ''}：
                  <span>{person.name}</span>，
                  <span>{person.unitPrice} 元</span>/人天，
                  <span>已工作 { } 天</span>
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Master labor */}
        {/* <div
          className="rounded-2xl p-4"
          style={{ background: T.bg, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold" style={{ color: T.text }}>
                师傅工价
              </p>
              <p className="text-xs mt-0.5" style={{ color: T.textTertiary }}>
                {item.masterRate} 元/人天 · 已工作 {masterDays} 天
              </p>
            </div>
            <span
              className="text-base font-bold font-mono"
              style={{ color: T.orange }}
            >
              ¥{(masterDays * item.masterRate).toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => setMasterDays((d) => d + 1)}
            className="w-full rounded-xl py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
            style={{
              background: T.surfaceAlt,
              border: `1px solid ${T.border}`,
              color: T.textSecondary,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
            增加师傅工作天数
          </button>
        </div> */}

        {/* Worker labor */}
        {/*  <div
          className="rounded-2xl p-4"
          style={{ background: T.bg, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold" style={{ color: T.text }}>
                小工工价
              </p>
              <p className="text-xs mt-0.5" style={{ color: T.textTertiary }}>
                {item.workerRate} 元/人天 · 已工作 {workerDays} 天
              </p>
            </div>
            <span
              className="text-base font-bold font-mono"
              style={{ color: T.orange }}
            >
              ¥{(workerDays * item.workerRate).toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => setWorkerDays((d) => d + 1)}
            className="w-full rounded-xl py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
            style={{
              background: T.surfaceAlt,
              border: `1px solid ${T.border}`,
              color: T.textSecondary,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
            增加小工工作天数
          </button>
        </div> */}

        {/*   <div
          className="rounded-2xl p-4"
          style={{ background: T.bg, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold" style={{ color: T.text }}>
                物料花费
              </p>
              <p className="text-xs mt-0.5" style={{ color: T.textTertiary }}>
                其他材料费用
              </p>
            </div>
            <span
              className="text-base font-bold font-mono"
              style={{ color: T.orange }}
            >
              ¥{materialCost.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => setMaterialCost((c) => c + 100)}
            className="w-full rounded-xl py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
            style={{
              background: T.surfaceAlt,
              border: `1px solid ${T.border}`,
              color: T.textSecondary,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
            增加物料花费
          </button>
        </div> */}


        <div
          className="rounded-xl px-4 py-3.5 flex items-center justify-between"
          style={{
            background: T.orangeLight,
            border: `1px solid ${T.orangeBorder}`,
          }}
        >
          <span className="text-sm font-medium" style={{ color: T.orange }}>
            已产生造价
          </span>
          <span
            className="text-xl font-bold font-mono"
            style={{ color: T.orange }}
          >
            {item.cost}元
          </span>
        </div>


        <div
          className="rounded-2xl p-4"
          style={{
            background: T.bg,
            border: `1px solid ${T.border}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <p className="text-sm font-semibold" style={{ color: T.text }}>
            上报施工进度
            <span style={{ color: T.textTertiary }}>(目前是30%)</span>
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {([30, 50, 80, 100] as const).map((value) => {
              const active = progress === value

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setProgress(value)}
                  className="h-10 rounded-lg text-sm font-semibold transition-all active:scale-[0.97]"
                  style={{
                    background: active ? T.orange : T.surfaceAlt,
                    border: `1px solid ${active ? T.orange : T.border}`,
                    color: active ? T.bg : T.textSecondary,
                  }}
                  aria-pressed={active}
                >
                  {value}%
                </button>
              )
            })}
          </div>
          <button
            type="button"
            disabled={progress === null}
            onClick={() => navigate({ id: "workItems", building, floor })}
            className="mt-3 h-11 w-full rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: T.green }}
          >
            确认上报
          </button>
        </div>


        {/* <button
          onClick={() => navigate({ id: "workItems", building, floor })}
          className="w-full rounded-xl py-3 text-sm font-medium transition-all active:scale-[0.98]"
          style={{
            background: T.surfaceAlt,
            border: `1px solid ${T.border}`,
            color: T.textSecondary,
          }}
        >
          提交施工进度
        </button> */}

        {/* <button
          onClick={() => setStatus("已完工")}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all active:scale-[0.98]"
          style={{
            background: status === "已完工" ? "#16A34A" : T.orange,
          }}
        >
          {status === "已完工" ? "✓ 已完工" : "该区域完工"}
        </button> */}
      </div>

      {personFormMode && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center p-4"
          style={{ background: "rgba(17, 24, 39, 0.38)" }}
        >
          <div
            className="w-full rounded-2xl p-5"
            style={{
              background: T.bg,
              boxShadow: "0 20px 48px rgba(17, 24, 39, 0.24)",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="person-form-title"
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="person-form-title"
                className="text-base font-semibold"
                style={{ color: T.text }}
              >
                {personFormMode.type === "add" ? "新增责任人" : "修改责任人"}
              </h2>
              <button
                type="button"
                onClick={closePersonForm}
                className="flex h-8 w-8 items-center justify-center rounded-lg active:scale-95"
                style={{ background: T.surfaceAlt, color: T.textSecondary }}
                aria-label="关闭责任人弹层"
                title="关闭"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <form
              className="mt-5 flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault()
                savePerson()
              }}
            >
              <div>
                <label
                  htmlFor="responsible-person-input"
                  className="mb-1.5 block text-xs font-semibold"
                  style={{ color: T.textSecondary }}
                >
                  责任人
                </label>
                <input
                  id="responsible-person-input"
                  type="text"
                  value={personForm.name}
                  onChange={(event) =>
                    setPersonForm((form) => ({
                      ...form,
                      name: event.target.value,
                    }))
                  }
                  placeholder="请输入责任人姓名"
                  className="w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-200"
                  style={{
                    background: T.surface,
                    border: `1px solid ${T.borderStrong}`,
                    color: T.text,
                  }}
                  autoFocus
                />
              </div>

              <div>
                <label
                  htmlFor="person-unit-price-input"
                  className="mb-1.5 block text-xs font-semibold"
                  style={{ color: T.textSecondary }}
                >
                  单价
                </label>
                <div className="relative">
                  <input
                    id="person-unit-price-input"
                    type="number"
                    min="0"
                    step="1"
                    value={personForm.unitPrice}
                    onChange={(event) =>
                      setPersonForm((form) => ({
                        ...form,
                        unitPrice: event.target.value,
                      }))
                    }
                    placeholder="请输入单价"
                    className="w-full rounded-xl py-3 pl-4 pr-28 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-200"
                    style={{
                      background: T.surface,
                      border: `1px solid ${T.borderStrong}`,
                      color: T.text,
                    }}
                    inputMode="decimal"
                  />
                  <span
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs"
                    style={{ color: T.textTertiary }}
                  >
                    元 / 平方米
                  </span>
                </div>
              </div>

              <div className="mt-1 flex gap-3">
                <button
                  type="button"
                  onClick={closePersonForm}
                  className="flex-1 rounded-xl py-3 text-sm font-semibold active:scale-[0.98]"
                  style={{
                    background: T.surfaceAlt,
                    color: T.textSecondary,
                  }}
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={!canSavePerson}
                  className="flex-1 rounded-xl py-3 text-sm font-semibold text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ background: T.orange }}
                >
                  {personFormMode.type === "add" ? "确认新增" : "保存修改"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {personToDelete && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(17, 24, 39, 0.38)" }}
        >
          <div
            className="w-full rounded-2xl p-5"
            style={{
              background: T.bg,
              boxShadow: "0 20px 48px rgba(17, 24, 39, 0.24)",
            }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-person-title"
            aria-describedby="delete-person-description"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: T.dangerLight,
                    color: T.danger,
                  }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  id="delete-person-title"
                  className="text-base font-semibold"
                  style={{ color: T.text }}
                >
                  确认删除
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDeletePersonIndex(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg active:scale-95"
                style={{ background: T.surfaceAlt, color: T.textSecondary }}
                aria-label="关闭删除确认弹层"
                title="关闭"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <p
              id="delete-person-description"
              className="mt-4 text-sm leading-6"
              style={{ color: T.textSecondary }}
            >
              确定删除责任人“{personToDelete.name}”吗？删除后无法恢复。
            </p>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setDeletePersonIndex(null)}
                className="flex-1 rounded-xl py-3 text-sm font-semibold active:scale-[0.98]"
                style={{
                  background: T.surfaceAlt,
                  color: T.textSecondary,
                }}
                autoFocus
              >
                取消
              </button>
              <button
                type="button"
                onClick={confirmDeletePerson}
                className="flex-1 rounded-xl py-3 text-sm font-semibold text-white active:scale-[0.98]"
                style={{ background: T.danger }}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Screen: Login ───────────────────────────────────────────────────────────
function LoginScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)

  return (
    <div className="flex flex-col h-full" style={{ background: T.bg }}>
      {/* Top decoration */}
      <div
        className="shrink-0 px-7 pt-14 pb-10 flex items-center gap-4"
        style={{
          background: "linear-gradient(160deg, #FFF7ED 0%, #FFFFFF 100%)",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center"
          style={{
            background: T.orangeLight,
            border: `1px solid ${T.orangeBorder}`,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              stroke={T.orange}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <polyline
              points="9 22 9 12 15 12 15 22"
              stroke={T.orange}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold" style={{ color: T.text }}>
            工地管理系统
          </h1>
          <p className="text-sm mt-1.5" style={{ color: T.textTertiary }}>
            登录您的账户以继续
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-7 pt-8 flex flex-col gap-5 overflow-y-auto scrollbar-hide">
        {/* Phone */}
        <div>
          <label
            className="block text-xs font-semibold mb-1.5"
            style={{ color: T.textSecondary }}
          >
            手机号
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  stroke={T.textTertiary}
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入手机号"
              maxLength={11}
              className="w-full rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-all"
              style={{
                background: T.surface,
                border: `1.5px solid ${T.border}`,
                color: T.text,
              }}
              onFocus={(e) => (e.target.style.borderColor = T.orange)}
              onBlur={(e) => (e.target.style.borderColor = T.border)}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            className="block text-xs font-semibold mb-1.5"
            style={{ color: T.textSecondary }}
          >
            密码
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  stroke={T.textTertiary}
                  strokeWidth="1.75"
                />
                <path
                  d="M7 11V7a5 5 0 0 1 10 0v4"
                  stroke={T.textTertiary}
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="w-full rounded-xl pl-11 pr-12 py-3.5 text-sm outline-none transition-all"
              style={{
                background: T.surface,
                border: `1.5px solid ${T.border}`,
                color: T.text,
              }}
              onFocus={(e) => (e.target.style.borderColor = T.orange)}
              onBlur={(e) => (e.target.style.borderColor = T.border)}
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity active:opacity-60"
            >
              {showPwd ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                    stroke={T.textTertiary}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="23"
                    y2="23"
                    stroke={T.textTertiary}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke={T.textTertiary}
                    strokeWidth="1.75"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke={T.textTertiary}
                    strokeWidth="1.75"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* <div className="flex justify-end">
          <button
            className="text-xs transition-opacity active:opacity-60"
            style={{ color: T.orange }}
          >
            忘记密码？
          </button>
        </div> */}

        <button
          onClick={() => navigate({ id: "overview" })}
          className="w-full rounded-xl py-4 text-sm font-semibold text-white transition-all active:scale-[0.98] mt-1"
          style={{
            background: T.orange,
            boxShadow: `0 4px 14px rgba(249,115,22,0.35)`,
          }}
        >
          登 录
        </button>

        {/* <p
          className="text-center text-xs pb-6"
          style={{ color: T.textTertiary }}
        >
          登录即表示同意
          <span className="mx-0.5" style={{ color: T.orange }}>
            服务条款
          </span>
          与
          <span className="ml-0.5" style={{ color: T.orange }}>
            隐私政策
          </span>
        </p> */}
      </div>
    </div>
  )
}

// ─── Screen: Ledger (进出帐) ──────────────────────────────────────────────────
type LedgerType = "income" | "expense"

interface LedgerAttachment {
  id: string
  name: string
  url: string
}

interface LedgerEntry {
  id: number
  type: LedgerType
  label: string
  name?: string
  amount: number
  date: string
  note: string
  channel?: string
  purpose?: string
  attachments?: LedgerAttachment[]
}

interface LedgerFormState {
  date: string
  type: LedgerType
  amount: string
  channel: string
  purpose: string
  name: string
  attachments: LedgerAttachment[]
}

const TRANSFER_CHANNELS = ["微信转账", "支付宝转账", "银行卡转账"]
const EXPENSE_PURPOSES = ["工资支出", "物料采购", "加油", "其它"]

const getToday = () => dayjs().format('YYYY-MM-DD')

const createLedgerForm = (entry?: LedgerEntry): LedgerFormState =>
  entry
    ? {
      date: entry.date,
      type: entry.type,
      amount: new Big(entry.amount).toFixed(2),
      channel: entry.channel ?? "",
      purpose: entry.purpose ?? "",
      name: entry.name ?? "",
      attachments: entry.attachments ?? [],
    }
    : {
      date: getToday(),
      type: "expense",
      amount: "",
      channel: "",
      purpose: "",
      name: "",
      attachments: [],
    }

const readAttachment = (file: File) =>
  new Promise<LedgerAttachment>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () =>
      resolve({
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        name: file.name,
        url: String(reader.result),
      })
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

const LEDGER_ENTRIES: LedgerEntry[] = [
  { id: 1, type: "income", label: "地砖款", name: "地砖款", channel: "微信转账", amount: 18000, date: "2026-07-26", note: "" },
  { id: 2, type: "expense", label: "买地砖", name: "买地砖", channel: "微信转账", purpose: "物料采购", amount: 18000, date: "2026-07-25", note: "" },
  { id: 3, type: "expense", label: "师傅工资结算", name: "师傅工资结算", channel: "微信转账", purpose: "工资支出", amount: 2700, date: "2026-07-25", note: "" },
  { id: 4, type: "income", label: "加油", name: "加油", channel: "微信转账", amount: 1200, date: "2026-07-24", note: "" },
  { id: 5, type: "expense", label: "加油", name: "加油", channel: "微信转账", purpose: "加油", amount: 1200, date: "2026-07-23", note: "" },
  { id: 6, type: "expense", label: "辅料采购", name: "辅料采购", channel: "微信转账", purpose: "物料采购", amount: 850, date: "2026-07-22", note: "" },
]

function LedgerFormSheet({
  mode,
  initialEntry,
  onClose,
  onSave,
}: {
  mode: "create" | "edit"
  initialEntry?: LedgerEntry
  onClose: () => void
  onSave: (entry: LedgerEntry) => void
}) {
  const [ledgerForm, setLedgerForm] = useState<LedgerFormState>(() => createLedgerForm(initialEntry))
  const amountValue = Number(ledgerForm.amount)
  const canSaveLedger =
    Boolean(ledgerForm.date) &&
    Number.isFinite(amountValue) &&
    amountValue > 0 &&
    Boolean(ledgerForm.channel) &&
    (ledgerForm.type === "income" || Boolean(ledgerForm.purpose)) &&
    (ledgerForm.attachments.length > 0 || mode === "edit")

  const saveLedger = () => {
    if (!canSaveLedger) return

    const name = ledgerForm.name.trim()
    onSave({
      id: initialEntry?.id ?? 0,
      type: ledgerForm.type,
      label: name || (ledgerForm.type === "expense" ? ledgerForm.purpose : "收入入账"),
      name: name || undefined,
      amount: Number(new Big(ledgerForm.amount).toFixed(2)),
      date: ledgerForm.date,
      note:
        ledgerForm.type === "expense"
          ? `${ledgerForm.purpose} · ${ledgerForm.channel}`
          : ledgerForm.channel,
      channel: ledgerForm.channel,
      purpose: ledgerForm.type === "expense" ? ledgerForm.purpose : undefined,
      attachments: ledgerForm.attachments,
    })
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center px-2 pt-6"
      style={{ background: "rgba(17, 24, 39, 0.46)" }}
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="flex w-full flex-col overflow-hidden rounded-t-2xl"
        style={{
          maxHeight: "calc(100% - 12px)",
          background: T.bg,
          boxShadow: "0 -16px 48px rgba(17, 24, 39, 0.22)",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ledger-form-title"
      >
        <div
          className="flex shrink-0 items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div>
            <h2 id="ledger-form-title" className="text-base font-bold" style={{ color: T.text }}>
              {mode === "create" ? "新增收支" : "修改收支"}
            </h2>
            <p className="mt-0.5 text-xs" style={{ color: T.textTertiary }}>
              {mode === "create" ? "记录本次资金往来" : "更新本次资金记录"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform active:scale-95"
            style={{ background: T.surfaceAlt, color: T.textSecondary }}
            aria-label={`关闭${mode === "create" ? "新增" : "修改"}收支弹层`}
            title="关闭"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={event => {
            event.preventDefault()
            saveLedger()
          }}
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 scrollbar-hide">
            <div>
              <label htmlFor="ledger-date" className="mb-1.5 block text-xs font-semibold" style={{ color: T.textSecondary }}>
                日期 <span style={{ color: T.danger }}>*</span>
              </label>
              <input
                id="ledger-date"
                type="date"
                required
                value={ledgerForm.date}
                onChange={event => setLedgerForm(form => ({ ...form, date: event.target.value }))}
                className="h-11 w-full rounded-xl px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-200"
                style={{ background: T.surface, border: `1px solid ${T.borderStrong}`, color: T.text }}
              />
            </div>

            <fieldset>
              <legend className="mb-1.5 text-xs font-semibold" style={{ color: T.textSecondary }}>
                类别 <span style={{ color: T.danger }}>*</span>
              </legend>
              <div className="grid grid-cols-2 gap-1 rounded-xl p-1" style={{ background: T.surfaceAlt }}>
                {(["expense", "income"] as const).map(type => {
                  const active = ledgerForm.type === type
                  const isExpense = type === "expense"
                  const color = isExpense ? "#E11D48" : T.green
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setLedgerForm(form => ({
                          ...form,
                          type,
                          purpose: type === "income" ? "" : form.purpose,
                        }))
                      }
                      className="flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background: active ? T.bg : "transparent",
                        color: active ? color : T.textTertiary,
                        boxShadow: active ? "0 1px 4px rgba(17,24,39,0.1)" : "none",
                      }}
                      aria-pressed={active}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d={isExpense ? "M12 5v14M5 12l7 7 7-7" : "M12 19V5M5 12l7-7 7 7"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {isExpense ? "支出" : "收入"}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="ledger-amount" className="mb-1.5 block text-xs font-semibold" style={{ color: T.textSecondary }}>
                金额 <span style={{ color: T.danger }}>*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold" style={{ color: T.text }}>¥</span>
                <input
                  id="ledger-amount"
                  type="text"
                  inputMode="decimal"
                  required
                  value={ledgerForm.amount}
                  onChange={event => {
                    const value = event.target.value
                    if (/^\d*(\.\d{0,2})?$/.test(value)) {
                      setLedgerForm(form => ({ ...form, amount: value }))
                    }
                  }}
                  onBlur={() => {
                    if (ledgerForm.amount && Number.isFinite(amountValue)) {
                      setLedgerForm(form => ({ ...form, amount: new Big(form.amount).toFixed(2) }))
                    }
                  }}
                  placeholder="0.00"
                  className="h-12 w-full rounded-xl pl-10 pr-4 text-lg font-bold outline-none focus:ring-2 focus:ring-green-200"
                  style={{ background: T.surface, border: `1px solid ${T.borderStrong}`, color: T.text }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="ledger-channel" className="mb-1.5 block text-xs font-semibold" style={{ color: T.textSecondary }}>
                转账渠道 <span style={{ color: T.danger }}>*</span>
              </label>
              <select
                id="ledger-channel"
                required
                value={ledgerForm.channel}
                onChange={event => setLedgerForm(form => ({ ...form, channel: event.target.value }))}
                className="h-11 w-full rounded-xl px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-200"
                style={{ background: T.surface, border: `1px solid ${T.borderStrong}`, color: ledgerForm.channel ? T.text : T.textTertiary }}
              >
                <option value="">请选择转账渠道</option>
                {TRANSFER_CHANNELS.map(channel => <option key={channel}>{channel}</option>)}
              </select>
            </div>

            {ledgerForm.type === "expense" && (
              <div>
                <label htmlFor="ledger-purpose" className="mb-1.5 block text-xs font-semibold" style={{ color: T.textSecondary }}>
                  支出用途 <span style={{ color: T.danger }}>*</span>
                </label>
                <select
                  id="ledger-purpose"
                  required
                  value={ledgerForm.purpose}
                  onChange={event => setLedgerForm(form => ({ ...form, purpose: event.target.value }))}
                  className="h-11 w-full rounded-xl px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-200"
                  style={{ background: T.surface, border: `1px solid ${T.borderStrong}`, color: ledgerForm.purpose ? T.text : T.textTertiary }}
                >
                  <option value="">请选择支出用途</option>
                  {EXPENSE_PURPOSES.map(purpose => <option key={purpose}>{purpose}</option>)}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="ledger-name" className="mb-1.5 block text-xs font-semibold" style={{ color: T.textSecondary }}>
                名称 <span className="font-normal" style={{ color: T.textTertiary }}>选填</span>
              </label>
              <input
                id="ledger-name"
                type="text"
                value={ledgerForm.name}
                onChange={event => setLedgerForm(form => ({ ...form, name: event.target.value }))}
                placeholder="例如：7月材料款"
                className="h-11 w-full rounded-xl px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-200"
                style={{ background: T.surface, border: `1px solid ${T.borderStrong}`, color: T.text }}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="ledger-attachments" className="text-xs font-semibold" style={{ color: T.textSecondary }}>
                  附件 {mode === "create" && <span style={{ color: T.danger }}>*</span>}
                </label>
                {ledgerForm.attachments.length > 0 && (
                  <span className="text-xs font-medium" style={{ color: T.green }}>{ledgerForm.attachments.length} 张</span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ledgerForm.attachments.map(attachment => (
                  <div
                    key={attachment.id}
                    className="relative aspect-square overflow-hidden rounded-lg"
                    style={{ background: T.surfaceAlt, border: `1px solid ${T.border}` }}
                  >
                    <img src={attachment.url} alt={attachment.name} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() =>
                        setLedgerForm(form => ({
                          ...form,
                          attachments: form.attachments.filter(item => item.id !== attachment.id),
                        }))
                      }
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-md text-white active:scale-95"
                      style={{ background: "rgba(17,24,39,0.72)" }}
                      aria-label={`删除附件 ${attachment.name}`}
                      title="删除图片"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
                <label
                  htmlFor="ledger-attachments"
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg text-xs font-semibold transition-colors active:opacity-70"
                  style={{ background: T.greenLight, border: `1px dashed ${T.green}`, color: T.green }}
                >
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  添加图片
                </label>
                <input
                  id="ledger-attachments"
                  type="file"
                  accept="image/*"
                  multiple
                  required={mode === "create" && ledgerForm.attachments.length === 0}
                  className="sr-only"
                  onChange={async event => {
                    const files = Array.from(event.target.files ?? []).filter(file => file.type.startsWith("image/"))
                    const attachments = await Promise.all(files.map(readAttachment))
                    setLedgerForm(form => ({ ...form, attachments: [...form.attachments, ...attachments] }))
                    event.target.value = ""
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className="flex shrink-0 gap-3 px-5 pb-5 pt-3"
            style={{ background: T.bg, borderTop: `1px solid ${T.border}` }}
          >
            <button
              type="button"
              onClick={onClose}
              className="h-11 flex-1 rounded-xl text-sm font-semibold transition-transform active:scale-[0.98]"
              style={{ background: T.surfaceAlt, color: T.textSecondary }}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!canSaveLedger}
              className="h-11 flex-[1.6] rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: ledgerForm.type === "expense" ? "#E11D48" : T.green }}
            >
              {mode === "create" ? `保存${ledgerForm.type === "expense" ? "支出" : "收入"}` : "保存修改"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function LedgerScreen({
  navigate,
  entries,
  setEntries,
}: {
  navigate: (s: Screen) => void
  entries: LedgerEntry[]
  setEntries: Dispatch<SetStateAction<LedgerEntry[]>>
}) {
  const [tab, setTab] = useState<"all" | "income" | "expense">("all")
  const [showLedgerForm, setShowLedgerForm] = useState(false)
  const totalIncome = entries.filter(e => e.type === "income").reduce((s, e) => s + e.amount, 0)
  const totalExpense = entries.filter(e => e.type === "expense").reduce((s, e) => s + e.amount, 0)
  const filtered = tab === "all" ? entries : entries.filter(e => e.type === tab)

  const closeLedgerForm = () => {
    setShowLedgerForm(false)
  }

  const saveLedger = (entry: LedgerEntry) => {
    setEntries(current => [
      { ...entry, id: Math.max(0, ...current.map(item => item.id)) + 1 },
      ...current,
    ])
    closeLedgerForm()
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide" style={{ background: T.surface }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-4" style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: T.green }}>进出帐</p>
            <h1 className="text-xl font-bold mt-0.5" style={{ color: T.text }}>收支记录</h1>
          </div>
          <button
            type="button"
            onClick={() => setShowLedgerForm(true)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all active:opacity-70"
            style={{ background: T.greenLight, color: T.green, border: `1px solid ${T.greenBorder}` }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            新增
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4" style={{ background: T.greenLight, border: `1px solid ${T.greenBorder}` }}>
            <p className="text-xs" style={{ color: T.green }}>总收入</p>
            <p className="text-2xl font-bold font-mono mt-1" style={{ color: T.green }}>
              ¥{new Big(totalIncome).toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: "#FFF1F2", border: "1px solid #FECDD3" }}>
            <p className="text-xs" style={{ color: "#E11D48" }}>总支出</p>
            <p className="text-2xl font-bold font-mono mt-1" style={{ color: "#E11D48" }}>
              ¥{new Big(totalExpense).toFixed(2)}
            </p>
          </div>
        </div>

        {/* <div
          className="rounded-xl px-4 py-3 flex items-center justify-between"
          style={{ background: T.bg, border: `1px solid ${T.border}` }}
        >
          <span className="text-sm" style={{ color: T.textSecondary }}>净收入</span>
          <span className="text-lg font-bold font-mono" style={{ color: totalIncome - totalExpense >= 0 ? T.green : "#E11D48" }}>
            {totalIncome - totalExpense >= 0 ? "+" : ""}¥{(totalIncome - totalExpense).toLocaleString()}
          </span>
        </div> */}

        {/* Filter tabs */}
        <div className="flex rounded-xl p-1 gap-1" style={{ background: T.surfaceAlt }}>
          {([["all", "全部"], ["income", "收入"], ["expense", "支出"]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setTab(val)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: tab === val ? T.bg : "transparent",
                color: tab === val ? T.text : T.textTertiary,
                boxShadow: tab === val ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Entries */}
        <div className="flex flex-col gap-2">
          {filtered.map(e => (
            <div
              key={e.id}
              className="flex w-full items-center gap-3 rounded-xl p-4"
              style={{ background: T.bg, border: `1px solid ${T.border}` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: e.type === "income" ? T.greenLight : "#FFF1F2",
                  border: `1px solid ${e.type === "income" ? T.greenBorder : "#FECDD3"}`,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  {e.type === "income"
                    ? <path d="M12 19V5M5 12l7-7 7 7" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    : <path d="M12 5v14M5 12l7 7 7-7" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: T.text }}>{e.label}</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: T.textTertiary }}>{e.channel || "未记录渠道"} · {dayjs(e.date).format("MM-DD")}</p>
              </div>
              <span
                className="text-sm font-bold font-mono shrink-0"
                style={{ color: e.type === "income" ? T.green : "#E11D48" }}
              >
                {e.type === "income" ? "+" : "-"}¥{new Big(e.amount).toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => navigate({ id: "ledgerDetail", entry: e })}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all active:scale-95"
                style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, color: T.textSecondary }}
                aria-label={`查看${e.label}详情`}
                title="查看详情"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {showLedgerForm && (
        <LedgerFormSheet
          mode="create"
          onClose={closeLedgerForm}
          onSave={saveLedger}
        />
      )}
    </div>
  )
}

function LedgerDetailRow({
  label,
  value,
  valueColor = T.text,
}: {
  label: string
  value: string
  valueColor?: string
}) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-5 py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
      <span className="shrink-0 text-xs font-medium" style={{ color: T.textTertiary }}>
        {label}
      </span>
      <span className="min-w-0 text-right text-sm font-semibold" style={{ color: valueColor }}>
        {value}
      </span>
    </div>
  )
}

function LedgerDetailScreen({
  entry,
  navigate,
  setEntries,
}: {
  entry: LedgerEntry
  navigate: (s: Screen) => void
  setEntries: Dispatch<SetStateAction<LedgerEntry[]>>
}) {
  const [previewAttachment, setPreviewAttachment] = useState<LedgerAttachment | null>(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const isExpense = entry.type === "expense"
  const accent = isExpense ? "#E11D48" : T.green
  const accentLight = isExpense ? "#FFF1F2" : T.greenLight
  const accentBorder = isExpense ? "#FECDD3" : T.greenBorder
  const attachments = entry.attachments ?? []

  return (
    <div className="flex h-full flex-col overflow-y-auto scrollbar-hide" style={{ background: T.surface }}>
      <div className="shrink-0 px-5 pb-3 pt-4" style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}>
        <BackButton onBack={() => navigate({ id: "ledger" })} />
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest" style={{ color: accent }}>收支记录</p>
            <h1 className="mt-0.5 text-lg font-bold" style={{ color: T.text }}>收支详情</h1>
          </div>
          <button
            type="button"
            onClick={() => setShowEditForm(true)}
            className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-all active:scale-95"
            style={{ background: accentLight, border: `1px solid ${accentBorder}`, color: accent }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            修改
          </button>
        </div>
      </div>

      <div className="px-5 py-5" style={{ background: accentLight, borderBottom: `1px solid ${accentBorder}` }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: T.bg, border: `1px solid ${accentBorder}`, color: accent }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d={isExpense ? "M12 5v14M5 12l7 7 7-7" : "M12 19V5M5 12l7-7 7 7"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold" style={{ color: T.textSecondary }}>{entry.label}</p>
            <p className="mt-0.5 text-2xl font-bold font-mono" style={{ color: accent }}>
              {isExpense ? "-" : "+"}¥{new Big(entry.amount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <section className="mt-3 px-5" style={{ background: T.bg, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <LedgerDetailRow label="日期" value={dayjs(entry.date).format("YYYY年MM月DD日")} />
        <LedgerDetailRow label="类别" value={isExpense ? "支出" : "收入"} valueColor={accent} />
        <LedgerDetailRow label="金额" value={`¥${new Big(entry.amount).toFixed(2)}`} valueColor={accent} />
        <LedgerDetailRow label="转账渠道" value={entry.channel || "未记录"} />
        {isExpense && <LedgerDetailRow label="支出用途" value={entry.purpose || "未记录"} />}
        <div className="flex min-h-14 items-center justify-between gap-5 py-3">
          <span className="shrink-0 text-xs font-medium" style={{ color: T.textTertiary }}>名称</span>
          <span className="min-w-0 text-right text-sm font-semibold" style={{ color: entry.name ? T.text : T.textTertiary }}>
            {entry.name || "未填写"}
          </span>
        </div>
      </section>

      <section
        className="mt-3 px-5 pb-5 pt-4"
        style={{ background: T.bg, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold" style={{ color: T.text }}>附件</h2>
          {attachments.length > 0 && (
            <span className="text-xs font-medium" style={{ color: accent }}>{attachments.length} 张</span>
          )}
        </div>
        {attachments.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {attachments.map(attachment => (
              <button
                key={attachment.id}
                type="button"
                onClick={() => setPreviewAttachment(attachment)}
                className="aspect-square overflow-hidden rounded-lg transition-opacity active:opacity-70"
                style={{ background: T.surfaceAlt, border: `1px solid ${T.border}` }}
                aria-label={`查看附件 ${attachment.name}`}
              >
                <img src={attachment.url} alt={attachment.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : (
          <div
            className="flex h-20 items-center justify-center rounded-lg text-xs font-medium"
            style={{ background: T.surface, border: `1px dashed ${T.borderStrong}`, color: T.textTertiary }}
          >
            未上传附件
          </div>
        )}
      </section>

      {previewAttachment && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center p-5"
          style={{ background: "rgba(17, 24, 39, 0.9)" }}
          onMouseDown={event => {
            if (event.target === event.currentTarget) setPreviewAttachment(null)
          }}
        >
          <img
            src={previewAttachment.url}
            alt={previewAttachment.name}
            className="max-h-full max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => setPreviewAttachment(null)}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-white active:scale-95"
            style={{ background: "rgba(255,255,255,0.16)" }}
            aria-label="关闭附件预览"
            title="关闭"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {showEditForm && (
        <LedgerFormSheet
          mode="edit"
          initialEntry={entry}
          onClose={() => setShowEditForm(false)}
          onSave={updatedEntry => {
            setEntries(current =>
              current.map(item => item.id === updatedEntry.id ? updatedEntry : item),
            )
            setShowEditForm(false)
            navigate({ id: "ledgerDetail", entry: updatedEntry })
          }}
        />
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>({ id: "login" })
  const [ledgerEntries, setLedgerEntries] = useState(LEDGER_ENTRIES)
  const navigate = (s: Screen) => setScreen(s)

  const constructionScreens = ["overview", "buildings", "floors", "workerType", "workItems", "detail"]
  const activeMainTab = constructionScreens.includes(screen.id) ? "construction" : "ledger"
  const showMainTabs = screen.id !== "login"

  const mainTabs = [
    {
      id: "construction",
      label: "施工",
      color: T.orange,
      activeIndicator: T.orangeLight,
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M2 20h20M4 20V10l8-6 8 6v10" stroke={active ? T.orange : T.textTertiary} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 20v-5h6v5" stroke={active ? T.orange : T.textTertiary} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "ledger",
      label: "进出帐",
      color: T.green,
      activeIndicator: T.greenLight,
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={active ? T.green : T.textTertiary} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen w-full" style={{ background: "#E5E7EB" }}>
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "390px",
          height: "844px",
          background: T.surface,
          borderRadius: "40px",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-8 py-2 shrink-0"
          style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}
        >
          <span className="text-xs font-semibold" style={{ color: T.text }}>9:41</span>
          <div className="flex items-center gap-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-sm" style={{ width: 3, height: 4 + i * 2, background: i < 3 ? T.textSecondary : T.border }} />
            ))}
            <div className="ml-1 w-5 h-2.5 rounded-sm flex items-center px-0.5" style={{ border: `1px solid ${T.borderStrong}` }}>
              <div className="h-1.5 rounded-sm" style={{ width: "70%", background: "#16A34A" }} />
            </div>
          </div>
        </div>

        {/* 页面内容 */}
        <div className="flex-1 overflow-hidden">
          {screen.id === "login" && <LoginScreen navigate={navigate} />}
          {screen.id === "overview" && <OverviewScreen navigate={navigate} />}
          {screen.id === "buildings" && <BuildingsScreen navigate={navigate} />}
          {screen.id === "floors" && <FloorsScreen building={screen.building} navigate={navigate} />}
          {screen.id === "workerType" && <WorkerTypeScreen building={screen.building} floor={screen.floor} navigate={navigate} />}
          {screen.id === "workItems" && <WorkItemsScreen building={screen.building} floor={screen.floor} navigate={navigate} />}
          {screen.id === "detail" && <DetailScreen building={screen.building} floor={screen.floor} item={screen.item} navigate={navigate} />}
          {screen.id === "ledger" && (
            <LedgerScreen navigate={navigate} entries={ledgerEntries} setEntries={setLedgerEntries} />
          )}
          {screen.id === "ledgerDetail" && (
            <LedgerDetailScreen entry={screen.entry} navigate={navigate} setEntries={setLedgerEntries} />
          )}
        </div>

        {/* Main bottom tab bar — hidden on login 底部导航栏 */}
        {showMainTabs && (
          <div
            className="shrink-0 flex items-center"
            style={{ background: T.bg, borderTop: `1px solid ${T.border}`, paddingBottom: "20px" }}
          >
            {mainTabs.map((t) => {
              const active = activeMainTab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => navigate({ id: t.id === "construction" ? "overview" : "ledger" })}
                  className="flex-1 flex flex-col items-center gap-1 py-2.5 transition-all relative"
                >
                  {active && (
                    <span
                      className="absolute top-1.5 w-8 h-0.5 rounded-full"
                      style={{ background: t.color }}
                    />
                  )}
                  {t.icon(active)}
                  <span className="text-xs font-semibold" style={{ color: active ? t.color : T.textTertiary }}>
                    {t.label}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
