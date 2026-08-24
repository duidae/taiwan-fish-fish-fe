import {useEffect, useState} from "react"
import axios from "axios"
import {SpeciesEntry} from "../species-list"

const OBSERVATIONS_PER_PAGE = 100

export function useDashboardObservations(selected: SpeciesEntry[]) {
  const [observationsByName, setObservationsByName] = useState<Record<string, any[]>>({})
  const [observationsByNameTBIA, setObservationsByNameTBIA] = useState<Record<string, any[]>>({})
  const [loadingNames, setLoadingNames] = useState<Set<string>>(new Set())

  useEffect(() => {
    selected.forEach(({commonName, scientificName}) => {
      if (!(scientificName in observationsByName) && !loadingNames.has(scientificName)) {
        setLoadingNames(prev => new Set(prev).add(scientificName))
        const url = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(scientificName)}&place_id=7887&photos=true&geo=true&verifiable=true&per_page=${OBSERVATIONS_PER_PAGE}&order_by=observed_on&order=desc`
        axios
          .get(url)
          .then(res => setObservationsByName(prev => ({...prev, [scientificName]: res?.data?.results ?? []})))
          .catch(e => {
            console.warn("Failed to fetch iNaturalist observations for", scientificName, e)
            setObservationsByName(prev => ({...prev, [scientificName]: []}))
          })
          .finally(() =>
            setLoadingNames(prev => {
              const next = new Set(prev)
              next.delete(scientificName)
              return next
            })
          )
      }

      if (!(scientificName in observationsByNameTBIA)) {
        axios
          .get(`/api/tbia/occurrence?name=${encodeURIComponent(commonName)}&limit=${OBSERVATIONS_PER_PAGE}`)
          .then(res => {
            // TBIA's `name` filter is fuzzy, not exact — it mixes in loosely related species, so filter to exact matches
            const results = (res?.data?.data ?? []).filter((o: any) => o.common_name_c === commonName)
            setObservationsByNameTBIA(prev => ({...prev, [scientificName]: results}))
          })
          .catch(e => {
            console.warn("Failed to fetch TBIA observations for", scientificName, e)
            setObservationsByNameTBIA(prev => ({...prev, [scientificName]: []}))
          })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return {observationsByName, observationsByNameTBIA, loadingNames}
}
