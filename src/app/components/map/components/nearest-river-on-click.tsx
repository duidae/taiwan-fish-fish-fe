"use client"
import L from "leaflet"
import {useMapEvents} from "react-leaflet"

type Props = {
  fetchAllRivers: () => Promise<any | null>
  handleResultClick: (feature: any) => void | Promise<void>
}

export const NearestRiverOnClick = ({fetchAllRivers, handleResultClick}: Props) => {
  useMapEvents({
    click: async e => {
      const map = e.target
      if (map.pm?.globalDrawModeEnabled?.()) return // don't hijack geoman's draw clicks

      const data = await fetchAllRivers()
      if (!data) return

      let nearest: any = null
      let minDist = Infinity
      for (const f of data.features) {
        const coords = f.geometry?.coordinates
        if (!coords) continue
        const dist = e.latlng.distanceTo(L.latLng(coords[1], coords[0]))
        if (dist < minDist) {
          minDist = dist
          nearest = f
        }
      }
      if (nearest) handleResultClick(nearest)
    }
  })
  return null
}
