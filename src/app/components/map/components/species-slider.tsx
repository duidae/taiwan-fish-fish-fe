"use client"
import {FormEvent, UIEvent, useRef} from "react"
import {taxanomyURLPrefix} from "../constants"
import {SpeciesChips} from "./species-chips"

type RenderTaxonRowContext = {
  taxonIDs: number[]
  handleSelect: (taxonID: number) => void
  observationsByTaxon: Record<number, any[]>
  observationsByTaxonTBIA: Record<number, any[]>
  observationSources: Set<"inaturalist" | "tbia">
  loadingTaxonIds: Set<number>
}

const renderTaxonRow = (result: any, index: number, ctx: RenderTaxonRowContext) => {
  const {taxonIDs, handleSelect, observationsByTaxon, observationsByTaxonTBIA, observationSources, loadingTaxonIds} =
    ctx
  const taxonID = result.taxon.id
  const taxaURL = `${taxanomyURLPrefix}/${result.taxon.id}`
  const imgURL = result.taxon.default_photo.medium_url
  const title = result.taxon?.preferred_common_name
  const taxonName = result.taxon.name
  const selected = taxonIDs.includes(taxonID)
  const sourceCounts = (["inaturalist", "tbia"] as const)
    .filter(source => observationSources.has(source))
    .map(source => ({
      source,
      count: (source === "inaturalist" ? observationsByTaxon[taxonID] : observationsByTaxonTBIA[taxonID])?.length ?? 0
    }))
  const totalCount = sourceCounts.reduce((sum, {count}) => sum + count, 0)
  const isLoadingObservations = loadingTaxonIds.has(taxonID)

  return (
    <div
      key={`taxon-item-${taxonID}-${index}`}
      className={`flex items-center gap-3 w-full p-2 rounded-xl transition ${selected ? "bg-sky-50" : "hover:bg-slate-100"}`}
    >
      <img
        className={`w-16 h-16 flex-shrink-0 rounded-xl cursor-pointer object-cover transition hover:opacity-90 ${
          selected ? "ring-4 ring-sky-400" : ""
        }`}
        src={imgURL}
        onClick={() => handleSelect(taxonID)}
        alt={title ?? "taxon image"}
      />
      <a className="flex-1 min-w-0 flex flex-col gap-0.5 hover:text-blue-600" href={taxaURL} target="_blank">
        <span className="text-base font-medium truncate w-full">{title ?? "Unknown"}</span>
        <span className="text-sm text-gray-500 truncate w-full">
          <em>{taxonName}</em>
        </span>
      </a>
      {selected && (
        <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
          <span className="text-xs font-semibold text-sky-600">
            {isLoadingObservations ? "…" : `共 ${totalCount} 筆`}
          </span>
          {!isLoadingObservations && sourceCounts.length > 1 && (
            <div className="flex gap-1.5">
              {sourceCounts.map(({source, count}) => (
                <span key={source} className="flex items-center gap-1 text-[10px] text-gray-400">
                  <span
                    className="w-1.5 h-1.5 rounded-full ring-1 ring-black/20"
                    style={{backgroundColor: `hsl(0, 0%, ${source === "inaturalist" ? 55 : 30}%)`}}
                  />
                  {count}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

type Props = {
  fishQuery: string
  setFishQuery: (q: string) => void
  handleFishSearchSubmit: (e?: FormEvent) => void
  fishSearchResults: any[] | null
  fishSearchLoading: boolean
  clearFishSearch: () => void
  observationSources: Set<"inaturalist" | "tbia">
  toggleObservationSource: (source: "inaturalist" | "tbia") => void
  observationsByTaxon: Record<number, any[]>
  observationsByTaxonTBIA: Record<number, any[]>
  taxons: any[]
  taxonIDs: number[]
  handleSelect: (taxonID: number) => void
  removeTaxon: (taxonID: number) => void
  removeAllTaxons: () => void
  loading: boolean
  hasMore: boolean
  loadingTaxonIds: Set<number>
  handleListScroll: (e: UIEvent<HTMLDivElement>) => void
  areaResults: any[] | null
  areaLoading: boolean
  clearAreaSearch: () => void
}

export const SpeciesSlider = ({
  fishQuery,
  setFishQuery,
  handleFishSearchSubmit,
  fishSearchResults,
  fishSearchLoading,
  clearFishSearch,
  observationSources,
  toggleObservationSource,
  observationsByTaxon,
  observationsByTaxonTBIA,
  taxons,
  taxonIDs,
  handleSelect,
  removeTaxon,
  removeAllTaxons,
  loading,
  hasMore,
  loadingTaxonIds,
  handleListScroll,
  areaResults,
  areaLoading,
  clearAreaSearch
}: Props) => {
  const listRef = useRef<HTMLDivElement | null>(null)
  const displayedTaxons = areaResults ?? fishSearchResults ?? taxons
  const taxonItems = displayedTaxons?.map((result: any, index: number) =>
    renderTaxonRow(result, index, {
      taxonIDs,
      handleSelect,
      observationsByTaxon,
      observationsByTaxonTBIA,
      observationSources,
      loadingTaxonIds
    })
  )
  const listLabel = areaResults
    ? `範圍內物種（${areaResults.length}）：`
    : fishSearchResults
      ? `搜尋結果（${fishSearchResults.length}）：`
      : "魚類物種："

  return (
    <div className="w-full h-full min-h-0 flex flex-col gap-2">
      <form onSubmit={handleFishSearchSubmit} className="flex items-center gap-2">
        <input
          className="flex-1 min-w-0 px-3 py-1.5 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
          placeholder="搜尋魚類名稱"
          value={fishQuery}
          onChange={e => setFishQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-sm font-medium transition hover:bg-sky-700 active:bg-sky-800"
        >
          搜尋
        </button>
        {fishSearchResults && (
          <button
            type="button"
            onClick={clearFishSearch}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            清除
          </button>
        )}
      </form>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">觀察紀錄來源：</span>
        <div className="flex rounded-lg overflow-hidden border border-slate-300">
          {(["inaturalist", "tbia"] as const).map(source => (
            <button
              key={source}
              type="button"
              aria-pressed={observationSources.has(source)}
              onClick={() => toggleObservationSource(source)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium transition ${
                observationSources.has(source) ? "bg-sky-600 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full ring-1 ring-black/20 shrink-0"
                style={{backgroundColor: `hsl(0, 0%, ${source === "inaturalist" ? 55 : 30}%)`}}
              />
              {source === "inaturalist" ? "iNaturalist" : "TBIA"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">{listLabel}</span>
          {areaResults && (
            <button
              type="button"
              onClick={clearAreaSearch}
              className="text-xs text-slate-500 underline transition hover:text-slate-700"
            >
              清除範圍
            </button>
          )}
        </div>
        <SpeciesChips taxonIDs={taxonIDs} taxons={taxons} removeTaxon={removeTaxon} removeAllTaxons={removeAllTaxons} />
      </div>
      <div className="flex items-center justify-between">
        {areaLoading && <span className="text-xs text-slate-400">搜尋範圍中…</span>}
        {!areaLoading && areaResults?.length === 0 && (
          <span className="text-xs text-slate-400">此範圍內找不到魚類</span>
        )}
        {!areaResults && fishSearchLoading && <span className="text-xs text-slate-400">搜尋中…</span>}
        {!areaResults && !fishSearchLoading && fishSearchResults?.length === 0 && (
          <span className="text-xs text-slate-400">找不到符合的魚類</span>
        )}
        {!areaResults && !fishSearchResults && loading && <span className="text-xs text-slate-400">載入中…</span>}
        {!areaResults && !fishSearchResults && !loading && !hasMore && (
          <span className="text-xs text-slate-400">已載入全部</span>
        )}
        {loadingTaxonIds.size > 0 && <span className="text-xs text-slate-400">載入觀察紀錄中…</span>}
      </div>
      <div
        ref={listRef}
        onScroll={handleListScroll}
        className="flex-1 min-h-0 flex flex-col gap-1 divide-y divide-slate-100 overflow-y-auto pr-1"
      >
        {taxonItems}
      </div>
    </div>
  )
}
