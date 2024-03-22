"use client"
import {useEffect, useState} from "react"
import axios from "axios"
import L, {LatLngExpression} from "leaflet"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"

/*
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png"
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png"
*/
import "leaflet/dist/leaflet.css"

// iNaturalist API doc: https://api.inaturalist.org/v1/docs/

// place_id=131031 - taiwan
// iconic_taxa=Actinopterygii - fish
const searchURL = "https://api.inaturalist.org/v1/observations?place_id=131031&iconic_taxa=Actinopterygii"
const taxanomyURLPrefix = "https://www.inaturalist.org/taxa"

const DEFAULT_ZOOM = 8
const TAIPEI_CENTER = [25.038357847174, 121.54770626982]
const TAIWAN_CENTER = [23.973837, 120.97969]

// TODO: integrate GBIF
/*
<TileLayer
  attribution='<a href="https://www.gbif.org">GBIF</a>'
  url="https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.point&srs=EPSG%3A3857&taxonKey=1"
/>
*/

const Item = (props: {checked: boolean; onChange: () => void; children?: React.ReactNode}) => {
  const {checked, onChange, children} = props
  return (
    <div className="flex flex-row gap-4">
      <input className="cursor-pointer" type="checkbox" onChange={onChange} checked={checked} />
      {children}
    </div>
  )
}

const Map = () => {
  const [coord, setCoord] = useState<LatLngExpression>(TAIWAN_CENTER as LatLngExpression)
  const [taxonIDs, setTaxonIDs] = useState<number[]>([])
  const [taxons, setTaxons] = useState<any[]>([])

  useEffect(() => {
    // TODO: remove duplications, add infinite load
    const fetchObs = async () => {
      const obs = await axios.get(searchURL)
      if (obs?.data?.results) {
        setTaxons(obs.data.results)
      } else {
        console.warn("Fetch taxons failed!")
      }
    }

    fetchObs()
  }, [])

  const handleSelect = (taxonID: number) => {
    const newSelections = taxonIDs.includes(taxonID) ? taxonIDs.filter(id => id !== taxonID) : [...taxonIDs, taxonID]
    setTaxonIDs(newSelections)
  }

  const mapComponent = (
    <MapContainer className="w-full h-full" center={coord} zoom={DEFAULT_ZOOM} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {taxonIDs.map((id, index) => (
        <TileLayer
          key={`tile-layer-${index}`}
          attribution='<a href="https://www.inaturalist.org/">iNaturalist</a>'
          url={`https://api.inaturalist.org/v1/points/{z}/{x}/{y}.png?taxon_id=${id}`}
        />
      ))}
    </MapContainer>
  )

  const taxonItems = (
    <>
      {taxons?.map((result, index) => {
        const taxonID = result.taxon.id
        const taxaURL = `${taxanomyURLPrefix}/${result.taxon.id}`
        const imgURL = result.taxon.default_photo.medium_url
        const title = result.species_guess

        return (
          <Item key={`taxon-item-${index}`} onChange={() => handleSelect(taxonID)} checked={taxonIDs.includes(taxonID)}>
            <a href={taxaURL} target="_blank">
              <img src={imgURL} />
              <span>{title}</span>
            </a>
          </Item>
        )
      })}
    </>
  )

  return (
    <div className="w-full h-full flex flex-row gap-4">
      <div className="w-3/4">{mapComponent}</div>
      <div className="w-1/4 flex flex-col right-0 top-1/4 overflow-scroll">{taxonItems}</div>
    </div>
  )
}

export default Map
