import {useEffect, useRef, useState} from "react"
import L, {LatLngExpression} from "leaflet"

export function useRiverSearch(mapInstance: L.Map | null) {
  const [allRivers, setAllRivers] = useState<any | null>(null)
  const [riverResults, setRiverResults] = useState<any | null>(null)
  const [riverQuery, setRiverQuery] = useState<string>("")
  const [selectedRiver, setSelectedRiver] = useState<any | null>(null)
  const selectedRiverMarkerRef = useRef<L.Marker | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<any | null>(null)
  const [searchResultsCollapsed, setSearchResultsCollapsed] = useState<boolean>(false)

  useEffect(() => {
    if (selectedRiver && selectedRiverMarkerRef.current) {
      selectedRiverMarkerRef.current.openPopup()
    }
  }, [selectedRiver])

  const fetchAllRivers = async () => {
    if (allRivers) return allRivers
    try {
      const res = await fetch("/api/local-rivers")
      if (!res.ok) throw new Error("fetch failed")
      const data = await res.json()
      setAllRivers(data)
      return data
    } catch (e) {
      console.warn("failed to load rivers", e)
      return null
    }
  }

  const handleResultClick = async (feature: any) => {
    if (!feature) return
    const coords = feature.geometry?.coordinates
    const name = feature.properties?.name
    setSelectedRiver(feature)
    setSelectedChannel(null)
    if (name) setRiverQuery(name)

    // Try to show the river's actual channel shape (from WRA's RIVERPOLY dataset)
    if (name) {
      try {
        const res = await fetch(`/api/river-channels?name=${encodeURIComponent(name)}`)
        const channel = res.ok ? await res.json() : null
        if (channel?.features?.length > 0) {
          setSelectedChannel(channel)
          const bounds = L.geoJSON(channel).getBounds()
          if (mapInstance && bounds.isValid()) {
            mapInstance.fitBounds(bounds)
            return
          }
        }
      } catch (err) {
        console.warn("failed to load river channel", err)
      }
    }

    // Fallback: no channel geometry found, just pan/zoom to the point
    if (coords) {
      const latlng: LatLngExpression = [coords[1], coords[0]]
      mapInstance && mapInstance.setView(latlng as any, 13)
    }
  }

  const handleSearchSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setSelectedRiver(null)
    setSelectedChannel(null)
    setSearchResultsCollapsed(false)
    const q = riverQuery.trim().toLowerCase()
    if (q.length < 1) {
      setRiverResults(null)
      return
    }
    const data = await fetchAllRivers()
    if (!data) return
    const matches = data.features.filter((f: any) => {
      const name = (f.properties?.name || "").toString().toLowerCase()
      return name.includes(q)
    })
    if (matches.length > 0) {
      const fc = {type: "FeatureCollection" as const, features: matches}
      setRiverResults(fc)
      // fit map to results
      try {
        const bounds = L.geoJSON(fc).getBounds()
        mapInstance && bounds.isValid() && mapInstance.fitBounds(bounds)
      } catch (err) {
        console.warn("fitBounds failed", err)
      }
    } else {
      setRiverResults(null)
    }
  }

  return {
    riverResults,
    riverQuery,
    setRiverQuery,
    selectedRiver,
    selectedChannel,
    selectedRiverMarkerRef,
    searchResultsCollapsed,
    setSearchResultsCollapsed,
    fetchAllRivers,
    handleSearchSubmit,
    handleResultClick
  }
}
