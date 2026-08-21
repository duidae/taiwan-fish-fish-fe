"use client"
import {useEffect} from "react"
import {useMap} from "react-leaflet"
import "@geoman-io/leaflet-geoman-free"

export const GeomanControls = () => {
  const map = useMap()

  useEffect(() => {
    if (!map) return
    map.pm.addControls({
      drawPolygon: true,
      drawCircle: false,
      drawMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawCircleMarker: false,
      editMode: true,
      removalMode: true
    })

    map.on("pm:create", e => {
      //console.log(e.layer.toGeoJSON())
    })
  }, [map])

  return null
}
