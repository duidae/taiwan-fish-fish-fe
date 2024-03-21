"use client"
import {useState} from "react"
import L, {LatLngExpression} from "leaflet"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"

/*
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png"
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png"
*/
import "leaflet/dist/leaflet.css"

const DEFAULT_ZOOM = 8
const TAIPEI_CENTER = [25.038357847174, 121.54770626982]
const TAIWAN_CENTER = [23.973837, 120.97969]

const taxons = [
  {
    id: 59115,
    label: "大肚魚",
    link: "https://www.inaturalist.org/taxa/59115"
  },
  {
    id: 53911,
    label: "鯉魚",
    link: "https://www.inaturalist.org/taxa/53911"
  },
  {
    id: 549770,
    label: "五線無鬚魮",
    link: "https://www.inaturalist.org/taxa/549770"
  },
  {
    id: 91566,
    label: "翼甲鯰屬",
    link: "https://www.inaturalist.org/taxa/91566"
  }
]

// TODO: integrate GBIF
/*
<TileLayer
  attribution='<a href="https://www.gbif.org">GBIF</a>'
  url="https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.point&srs=EPSG%3A3857&taxonKey=1"
/>
*/
const Map = () => {
  const [coord, setCoord] = useState<LatLngExpression>(TAIWAN_CENTER as LatLngExpression)
  const [taxonID, setTaxonID] = useState<number>(taxons[0].id)

  const handleTaxonChange = (id: number) => {
    setTaxonID(id)
  }

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-3/4">
        <MapContainer className="w-full h-full" center={coord} zoom={DEFAULT_ZOOM} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            attribution='<a href="https://www.inaturalist.org/">iNaturalist</a>'
            url={`https://api.inaturalist.org/v1/points/{z}/{x}/{y}.png?taxon_id=${taxonID}`}
          />
        </MapContainer>
      </div>
      <div className="w-1/4 flex flex-col right-0 top-1/4">
        {taxons.map((taxon, index) => (
          <div className="flex flex-row gap-4">
            <button key={`taxon-select-${index}`} onClick={() => handleTaxonChange(taxon.id)}>
              {taxon.label}
            </button>
            <a href={`https://www.inaturalist.org/taxa/${taxon.id}`} target="_blank">
              {taxon.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Map
