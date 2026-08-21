"use client"
import {useEffect} from "react"
import {useMap} from "react-leaflet"
import L from "leaflet"
import "@geoman-io/leaflet-geoman-free"

type Props = {
  onShapeDrawn: (layer: L.Layer) => void
}

export const GeomanControls = ({onShapeDrawn}: Props) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return
    map.pm.addControls({
      drawPolygon: true,
      drawCircle: true,
      drawMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawCircleMarker: false,
      drawText: false,
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      rotateMode: false,
      removalMode: true
    })
  }, [map])

  useEffect(() => {
    if (!map) return
    const handleCreate = (e: any) => onShapeDrawn(e.layer)
    map.on("pm:create", handleCreate)
    return () => {
      map.off("pm:create", handleCreate)
    }
  }, [map, onShapeDrawn])

  return null
}
