import {SpeciesEntry} from "./species-list"

const INAT_OBSERVATIONS_URL = "https://api.inaturalist.org/v1/observations"
const TBIA_OCCURRENCE_URL = "https://tbiadata.tw/api/v1/occurrence"
const TAIWAN_PLACE_ID = 7887
// keep concurrency modest — these are free/public APIs, not ours to hammer
const CONCURRENCY = 6
const REVALIDATE_SECONDS = 60 * 60 * 24 * 30 // 1 month

export type SpeciesObservationCount = SpeciesEntry & {
  inaturalist: number | null
  tbia: number | null
}

async function fetchInatCount(scientificName: string): Promise<number | null> {
  const url = `${INAT_OBSERVATIONS_URL}?taxon_name=${encodeURIComponent(scientificName)}&place_id=${TAIWAN_PLACE_ID}&verifiable=true&per_page=0`
  try {
    const res = await fetch(url, {next: {revalidate: REVALIDATE_SECONDS}})
    if (!res.ok) return null
    const data = await res.json()
    return typeof data?.total_results === "number" ? data.total_results : null
  } catch (e) {
    console.warn("Failed to fetch iNaturalist count for", scientificName, e)
    return null
  }
}

async function fetchTbiaCount(scientificName: string): Promise<number | null> {
  const url = `${TBIA_OCCURRENCE_URL}?name=${encodeURIComponent(scientificName)}&limit=1`
  try {
    const res = await fetch(url, {next: {revalidate: REVALIDATE_SECONDS}})
    if (!res.ok) return null
    const data = await res.json()
    return typeof data?.meta?.total === "number" ? data.meta.total : null
  } catch (e) {
    console.warn("Failed to fetch TBIA count for", scientificName, e)
    return null
  }
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let cursor = 0
  const workers = Array.from({length: Math.min(limit, items.length)}, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await fn(items[index])
    }
  })
  await Promise.all(workers)
  return results
}

export async function getObservationCounts(species: SpeciesEntry[]): Promise<SpeciesObservationCount[]> {
  return mapWithConcurrency(species, CONCURRENCY, async entry => {
    const [inaturalist, tbia] = await Promise.all([
      fetchInatCount(entry.scientificName),
      fetchTbiaCount(entry.scientificName)
    ])
    return {...entry, inaturalist, tbia}
  })
}
