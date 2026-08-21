"use client"
import {FormEvent, UIEvent, useRef} from "react"
import {taxanomyURLPrefix} from "../constants"
import {SpeciesChips} from "./species-chips"

const renderTaxonCard = (result: any, index: number, taxonIDs: number[], handleSelect: (taxonID: number) => void) => {
  const taxonID = result.taxon.id
  const taxaURL = `${taxanomyURLPrefix}/${result.taxon.id}`
  const imgURL = result.taxon.default_photo.medium_url
  const title = result.taxon?.preferred_common_name
  const taxonName = result.taxon.name

  return (
    <div
      key={`taxon-item-${taxonID}-${index}`}
      className="flex flex-shrink-0 w-24 sm:w-28 flex-col items-center gap-1.5"
    >
      <img
        className={`w-full aspect-square rounded-lg cursor-pointer object-cover transition hover:opacity-90 ${
          taxonIDs.includes(taxonID) ? "ring-4 ring-sky-400" : ""
        }`}
        src={imgURL}
        onClick={() => handleSelect(taxonID)}
        alt={title ?? "taxon image"}
      />
      <a
        className="w-full flex flex-col items-center text-center text-xs hover:text-blue-600"
        href={taxaURL}
        target="_blank"
      >
        <span className="truncate w-full">{title ?? "Unknown"}</span>
        <span className="text-[10px] text-gray-500 truncate w-full">
          <em>{taxonName}</em>
        </span>
      </a>
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
  taxons: any[]
  taxonIDs: number[]
  handleSelect: (taxonID: number) => void
  removeTaxon: (taxonID: number) => void
  removeAllTaxons: () => void
  loading: boolean
  hasMore: boolean
  loadingTaxonIds: Set<number>
  handleHorizontalScroll: (e: UIEvent<HTMLDivElement>) => void
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
  taxons,
  taxonIDs,
  handleSelect,
  removeTaxon,
  removeAllTaxons,
  loading,
  hasMore,
  loadingTaxonIds,
  handleHorizontalScroll
}: Props) => {
  const listRef = useRef<HTMLDivElement | null>(null)
  const displayedTaxons = fishSearchResults ?? taxons
  const taxonItems = displayedTaxons?.map((result: any, index: number) =>
    renderTaxonCard(result, index, taxonIDs, handleSelect)
  )

  return (
    <div className="w-full rounded-xl bg-white/95 backdrop-blur-md shadow-lg p-3 flex flex-col gap-2">
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
      <div className="flex flex-row items-center">
        <span className="text-sm font-semibold text-slate-700 mr-2">
          {fishSearchResults ? `搜尋結果（${fishSearchResults.length}）：` : "魚類物種："}
        </span>
        <SpeciesChips taxonIDs={taxonIDs} taxons={taxons} removeTaxon={removeTaxon} removeAllTaxons={removeAllTaxons} />
      </div>
      <div className="flex items-center justify-between">
        {fishSearchLoading && <span className="text-xs text-slate-400">搜尋中…</span>}
        {!fishSearchLoading && fishSearchResults?.length === 0 && (
          <span className="text-xs text-slate-400">找不到符合的魚類</span>
        )}
        {!fishSearchResults && loading && <span className="text-xs text-slate-400">載入中…</span>}
        {!fishSearchResults && !loading && !hasMore && <span className="text-xs text-slate-400">已載入全部</span>}
        {loadingTaxonIds.size > 0 && <span className="text-xs text-slate-400">載入觀察紀錄中…</span>}
      </div>
      <div ref={listRef} onScroll={handleHorizontalScroll} className="flex gap-3 overflow-x-auto pb-1">
        {taxonItems}
      </div>
    </div>
  )
}
