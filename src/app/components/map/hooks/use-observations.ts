import {useEffect, useState} from "react"
import axios from "axios"
import {OBSERVATIONS_PER_PAGE} from "../constants"

export function useObservations(taxonIDs: number[], taxons: any[]) {
  const [observationsByTaxon, setObservationsByTaxon] = useState<Record<number, any[]>>({})
  const [observationsByTaxonTBIA, setObservationsByTaxonTBIA] = useState<Record<number, any[]>>({})
  const [observationSources, setObservationSources] = useState<Set<"inaturalist" | "tbia">>(
    new Set<"inaturalist" | "tbia">(["inaturalist"])
  )
  const [loadingTaxonIds, setLoadingTaxonIds] = useState<Set<number>>(new Set())

  const fetchObservations = async (taxonId: number) => {
    if (observationsByTaxon[taxonId] || loadingTaxonIds.has(taxonId)) return
    setLoadingTaxonIds(prev => new Set(prev).add(taxonId))
    try {
      const url = `https://api.inaturalist.org/v1/observations?taxon_id=${taxonId}&place_id=7887&photos=true&geo=true&per_page=${OBSERVATIONS_PER_PAGE}&order_by=observed_on&order=desc`
      const res = await axios.get(url)
      setObservationsByTaxon(prev => ({...prev, [taxonId]: res?.data?.results ?? []}))
    } catch (e) {
      console.warn("Failed to fetch observations for taxon", taxonId, e)
      setObservationsByTaxon(prev => ({...prev, [taxonId]: []}))
    } finally {
      setLoadingTaxonIds(prev => {
        const next = new Set(prev)
        next.delete(taxonId)
        return next
      })
    }
  }

  const fetchTbiaObservations = async (taxonId: number, commonName: string) => {
    if (observationsByTaxonTBIA[taxonId] || loadingTaxonIds.has(taxonId)) return
    setLoadingTaxonIds(prev => new Set(prev).add(taxonId))
    try {
      const res = await axios.get(
        `/api/tbia/occurrence?name=${encodeURIComponent(commonName)}&limit=${OBSERVATIONS_PER_PAGE}`
      )
      // TBIA's `name` filter is fuzzy, not exact — it mixes in loosely related species, so filter to exact matches
      const results = (res?.data?.data ?? []).filter((o: any) => o.common_name_c === commonName)
      setObservationsByTaxonTBIA(prev => ({...prev, [taxonId]: results}))
    } catch (e) {
      console.warn("Failed to fetch TBIA observations for taxon", taxonId, e)
      setObservationsByTaxonTBIA(prev => ({...prev, [taxonId]: []}))
    } finally {
      setLoadingTaxonIds(prev => {
        const next = new Set(prev)
        next.delete(taxonId)
        return next
      })
    }
  }

  useEffect(() => {
    taxonIDs.forEach(id => {
      if (observationSources.has("inaturalist")) {
        fetchObservations(id)
      }
      if (observationSources.has("tbia")) {
        const commonName = taxons.find(t => t.taxon?.id === id)?.taxon?.preferred_common_name
        if (commonName) fetchTbiaObservations(id, commonName)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxonIDs, observationSources])

  const toggleObservationSource = (source: "inaturalist" | "tbia") => {
    setObservationSources(prev => {
      if (prev.has(source) && prev.size === 1) return prev // keep at least one source active
      const next = new Set(prev)
      next.has(source) ? next.delete(source) : next.add(source)
      return next
    })
  }

  return {
    observationsByTaxon,
    observationsByTaxonTBIA,
    observationSources,
    toggleObservationSource,
    loadingTaxonIds
  }
}
