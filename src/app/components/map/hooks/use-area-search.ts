import {useState} from "react"
import axios from "axios"
import L from "leaflet"

const AREA_PER_PAGE = 100
const MAX_RADIUS_KM = 500

const geoParamsFor = (layer: L.Layer): string => {
  if (typeof (layer as L.Circle).getRadius === "function") {
    const circle = layer as L.Circle
    const center = circle.getLatLng()
    const radiusKm = Math.min(circle.getRadius() / 1000, MAX_RADIUS_KM)
    return `lat=${center.lat}&lng=${center.lng}&radius=${radiusKm}`
  }
  const bounds = (layer as L.Polygon).getBounds()
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  return `swlat=${sw.lat}&swlng=${sw.lng}&nelat=${ne.lat}&nelng=${ne.lng}`
}

export function useAreaSearch() {
  const [areaResults, setAreaResults] = useState<any[] | null>(null)
  const [areaLoading, setAreaLoading] = useState<boolean>(false)

  const searchArea = async (layer: L.Layer): Promise<any[] | null> => {
    setAreaLoading(true)
    try {
      const url = `https://api.inaturalist.org/v1/observations/species_counts?${geoParamsFor(
        layer
      )}&iconic_taxa=Actinopterygii&verifiable=true&photos=true&locale=zh-TW&per_page=${AREA_PER_PAGE}`
      const res = await axios.get(url)
      const results = res?.data?.results ?? []
      setAreaResults(results)
      return results
    } catch (e) {
      console.warn("area species search failed", e)
      setAreaResults([])
      return null
    } finally {
      setAreaLoading(false)
    }
  }

  const clearAreaSearch = () => setAreaResults(null)

  return {areaResults, areaLoading, searchArea, clearAreaSearch}
}
