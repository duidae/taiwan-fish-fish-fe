"use client"
import {FormEvent} from "react"

type Props = {
  riverQuery: string
  setRiverQuery: (q: string) => void
  handleSearchSubmit: (e?: FormEvent) => void
  riverResults: any | null
  searchResultsCollapsed: boolean
  setSearchResultsCollapsed: (updater: (prev: boolean) => boolean) => void
}

export const RiverSearchPanel = ({
  riverQuery,
  setRiverQuery,
  handleSearchSubmit,
  riverResults,
  searchResultsCollapsed,
  setSearchResultsCollapsed
}: Props) => (
  <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-2 items-center">
    <input
      className="flex-1 min-w-[140px] px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
      placeholder="搜尋河川"
      value={riverQuery}
      onChange={e => setRiverQuery(e.target.value)}
    />
    <button
      className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium transition hover:bg-sky-700 active:bg-sky-800"
      type="submit"
    >
      搜尋
    </button>
    {riverResults && (
      <button
        type="button"
        className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        onClick={() => setSearchResultsCollapsed(prev => !prev)}
      >
        {searchResultsCollapsed ? "顯示結果" : "隱藏結果"}
      </button>
    )}
  </form>
)
