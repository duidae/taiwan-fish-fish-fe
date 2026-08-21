import {useEffect, useState, UIEvent} from "react"
import axios from "axios"
import {iNatURL, PER_PAGE} from "../constants"

export function useSpeciesSearch() {
  const [taxons, setTaxons] = useState<any[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [fishQuery, setFishQuery] = useState<string>("")
  const [fishSearchResults, setFishSearchResults] = useState<any[] | null>(null)
  const [fishSearchLoading, setFishSearchLoading] = useState<boolean>(false)

  const fetchObs = async (p: number) => {
    if (loading || !hasMore) return
    try {
      setLoading(true)
      const url = `${iNatURL}&page=${p}&per_page=${PER_PAGE}`
      const obs = await axios.get(url)
      if (obs?.data?.results) {
        const existingIds = new Set(taxons.map(t => t.taxon?.id))
        const newItems: any[] = []
        obs.data.results.forEach((result: any) => {
          const currentID = result.taxon?.id
          if (currentID != null && !existingIds.has(currentID)) {
            existingIds.add(currentID)
            newItems.push(result)
          }
        })
        setTaxons(prev => [...prev, ...newItems])
        setHasMore(obs.data.results.length === PER_PAGE)
        setPage(p)
      } else {
        console.warn("Fetch taxons failed!")
        setHasMore(false)
      }
    } catch (e) {
      console.warn("Fetch taxons error", e)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchObs(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleHorizontalScroll = (e: UIEvent<HTMLDivElement>) => {
    if (fishSearchResults) return // search results aren't paginated
    const target = e.currentTarget
    const threshold = 300 // px from the trailing edge
    if (target.scrollWidth - target.scrollLeft - target.clientWidth < threshold) {
      if (!loading && hasMore) {
        fetchObs(page + 1)
      }
    }
  }

  const handleFishSearchSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = fishQuery.trim()
    if (q.length < 1) {
      setFishSearchResults(null)
      return
    }
    setFishSearchLoading(true)
    try {
      const res = await axios.get(`${iNatURL}&q=${encodeURIComponent(q)}&per_page=30`)
      const results = res?.data?.results ?? []
      setFishSearchResults(results)
      // merge into `taxons` so chips/observations can still resolve name+photo
      // after the user clears the search box
      setTaxons(prev => {
        const existingIds = new Set(prev.map((t: any) => t.taxon?.id))
        const fresh = results.filter((r: any) => !existingIds.has(r.taxon?.id))
        return [...prev, ...fresh]
      })
    } catch (err) {
      console.warn("fish search failed", err)
      setFishSearchResults([])
    } finally {
      setFishSearchLoading(false)
    }
  }

  const clearFishSearch = () => {
    setFishQuery("")
    setFishSearchResults(null)
  }

  return {
    taxons,
    loading,
    hasMore,
    handleHorizontalScroll,
    fishQuery,
    setFishQuery,
    fishSearchResults,
    fishSearchLoading,
    handleFishSearchSubmit,
    clearFishSearch
  }
}
