"use client"
import {HUES} from "../constants"

type Props = {
  taxonIDs: number[]
  taxons: any[]
  removeTaxon: (taxonID: number) => void
  removeAllTaxons: () => void
}

export const SpeciesChips = ({taxonIDs, taxons, removeTaxon, removeAllTaxons}: Props) => (
  <div className="min-h-8 flex flex-wrap gap-2 items-center">
    {taxonIDs.map((id, idx) => {
      const item = taxons.find(t => t.taxon?.id === id)
      const name = item?.taxon?.preferred_common_name || item?.taxon?.name || `Taxon ${id}`
      const img = item?.taxon?.default_photo?.square_url || item?.taxon?.default_photo?.medium_url
      const hue = HUES[idx % HUES.length]
      const bg = `hsl(${hue}, 90%, 95%)`
      const fg = `hsl(${hue}, 70%, 30%)`
      return (
        <div
          key={`chip-${id}`}
          className="flex items-center gap-2 px-2 py-1 rounded-full shadow-sm transition hover:shadow"
          style={{backgroundColor: bg, color: fg}}
        >
          {img && <img src={img} alt={name} className="w-6 h-6 rounded-full object-cover" />}
          <span className="text-sm italic">{name}</span>
          <button
            onClick={() => removeTaxon(id)}
            className="ml-1 w-4 h-4 flex items-center justify-center rounded-full text-xs leading-none transition hover:bg-black/10"
            aria-label={`remove ${name}`}
          >
            ×
          </button>
        </div>
      )
    })}
    {taxonIDs.length > 0 && (
      <div
        key={`chip-clear`}
        onClick={removeAllTaxons}
        role="button"
        className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer shadow-sm transition hover:shadow"
        style={{backgroundColor: "hsl(0, 80%, 95%)", color: "hsl(0, 65%, 30%)"}}
        aria-label="remove all selected taxons"
      >
        清除全部
      </div>
    )}
  </div>
)
