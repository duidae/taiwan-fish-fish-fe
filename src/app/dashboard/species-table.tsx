"use client"
import {useMemo, useState} from "react"
import {SpeciesObservationCount} from "./get-observation-counts"

type SortKey = "tbia" | "inaturalist"
type SortDir = "asc" | "desc"

const formatCount = (count: number | null) => (count === null ? "—" : count.toLocaleString("zh-TW"))

const inatObservationsURL = (scientificName: string) =>
  `https://www.inaturalist.org/observations?place_id=7887&taxon_name=${encodeURIComponent(scientificName)}&verifiable=true`

// TBIA has no public species search page with a shareable URL — link to the raw API response instead
const tbiaOccurrenceURL = (scientificName: string) =>
  `https://tbiadata.tw/api/v1/occurrence?name=${encodeURIComponent(scientificName)}&limit=100`

const CountLink = ({count, href}: {count: number | null; href: string}) => {
  if (count === null) return <span className="text-slate-400">—</span>
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-700 underline decoration-sky-200 underline-offset-2 transition hover:text-sky-800 hover:decoration-sky-400"
    >
      {formatCount(count)}
    </a>
  )
}

const compareCounts = (a: number | null, b: number | null, dir: SortDir) => {
  if (a === null && b === null) return 0
  if (a === null) return 1 // nulls always last, regardless of direction
  if (b === null) return -1
  return dir === "asc" ? a - b : b - a
}

const SortIndicator = ({active, dir}: {active: boolean; dir: SortDir}) => (
  <span className={`ml-1 inline-block text-[10px] ${active ? "text-sky-600" : "text-slate-300"}`}>
    {active && dir === "asc" ? "▲" : "▼"}
  </span>
)

type Props = {
  counts: SpeciesObservationCount[]
  totalTbia: number
  totalInat: number
  selectedNames: Set<string>
  toggleSelected: (scientificName: string) => void
}

export const SpeciesTable = ({counts, totalTbia, totalInat, selectedNames, toggleSelected}: Props) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const handleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir("desc")
      return
    }
    setSortDir(prev => (prev === "desc" ? "asc" : "desc"))
  }

  const sortedCounts = useMemo(() => {
    if (!sortKey) return counts
    return [...counts].sort((a, b) => compareCounts(a[sortKey], b[sortKey], sortDir))
  }, [counts, sortKey, sortDir])

  const headerButtonClass = (key: SortKey) =>
    `flex items-center justify-end gap-0.5 w-full transition ${
      sortKey === key ? "text-sky-600" : "text-slate-600 hover:text-slate-800"
    }`

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-3 py-2 font-medium w-8">
              <span className="sr-only">地圖</span>
            </th>
            <th className="px-3 py-2 font-medium">中文名</th>
            <th className="px-3 py-2 font-medium">學名</th>
            <th className="px-3 py-2 font-medium text-right">
              <button type="button" onClick={() => handleSort("tbia")} className={headerButtonClass("tbia")}>
                TBIA
                <SortIndicator active={sortKey === "tbia"} dir={sortDir} />
              </button>
            </th>
            <th className="px-3 py-2 font-medium text-right">
              <button
                type="button"
                onClick={() => handleSort("inaturalist")}
                className={headerButtonClass("inaturalist")}
              >
                iNaturalist
                <SortIndicator active={sortKey === "inaturalist"} dir={sortDir} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sortedCounts.map(({commonName, scientificName, inaturalist, tbia}) => (
            <tr key={scientificName} className="hover:bg-slate-50">
              <td className="px-3 py-2">
                <input
                  type="checkbox"
                  checked={selectedNames.has(scientificName)}
                  onChange={() => toggleSelected(scientificName)}
                  aria-label={`在地圖上顯示${commonName}的觀察紀錄`}
                  className="size-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
              </td>
              <td className="px-3 py-2 whitespace-nowrap font-medium text-slate-800">{commonName}</td>
              <td className="px-3 py-2 whitespace-nowrap italic text-slate-500">{scientificName}</td>
              <td className="px-3 py-2 text-right tabular-nums">
                <CountLink count={tbia} href={tbiaOccurrenceURL(scientificName)} />
              </td>
              <td className="px-3 py-2 text-right tabular-nums">
                <CountLink count={inaturalist} href={inatObservationsURL(scientificName)} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-50 font-semibold text-slate-700">
          <tr>
            <td className="px-3 py-2" colSpan={3}>
              合計
            </td>
            <td className="px-3 py-2 text-right tabular-nums">{formatCount(totalTbia)}</td>
            <td className="px-3 py-2 text-right tabular-nums">{formatCount(totalInat)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
