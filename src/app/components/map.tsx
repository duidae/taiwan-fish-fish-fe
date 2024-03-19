"use client"
import {useState} from "react"
import L, {LatLngExpression} from "leaflet"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"

const DEFAULT_ZOOM = 8
const TAIPEI_CENTER = [25.038357847174, 121.54770626982]
const TAIWAN_CENTER = [23.973837, 120.97969]

// 大肚魚
const taxon_id = 59115

/*
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png"
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png"
*/
import "leaflet/dist/leaflet.css"

const Map = () => {
  const [coord, setCoord] = useState<LatLngExpression>(TAIWAN_CENTER as LatLngExpression)

  return (
    <div className="w-full h-full">
      <MapContainer className="w-full h-full" center={coord} zoom={DEFAULT_ZOOM} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*
        <TileLayer
          attribution='<a href="https://www.gbif.org">GBIF</a>'
          url="https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.point&srs=EPSG%3A3857&taxonKey=1"
        />
        */}
        <TileLayer
          attribution='<a href="https://www.inaturalist.org/">iNaturalist</a>'
          url={`https://api.inaturalist.org/v1/points/{z}/{x}/{y}.png?taxon_id=${taxon_id}`}
        />
      </MapContainer>
    </div>
  )
}

export default Map
