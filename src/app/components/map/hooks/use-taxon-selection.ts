import {useState} from "react"

export function useTaxonSelection() {
  const [taxonIDs, setTaxonIDs] = useState<number[]>([])

  const handleSelect = (taxonID: number) => {
    const newSelections = taxonIDs.includes(taxonID) ? taxonIDs.filter(id => id !== taxonID) : [...taxonIDs, taxonID]
    setTaxonIDs(newSelections)
  }

  const removeTaxon = (taxonID: number) => {
    setTaxonIDs(prev => prev.filter(id => id !== taxonID))
  }

  const removeAllTaxons = () => {
    setTaxonIDs([])
  }

  return {taxonIDs, handleSelect, removeTaxon, removeAllTaxons}
}
