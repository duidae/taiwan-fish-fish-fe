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
const MAX_SELECTION = 5

// TODO: integrate GBIF
/*
<TileLayer
  attribution='<a href="https://www.gbif.org">GBIF</a>'
  url="https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.point&srs=EPSG%3A3857&taxonKey=1"
/>
*/

const Map = () => {
  const [coord, setCoord] = useState<LatLngExpression>(TAIWAN_CENTER as LatLngExpression)
  const [taxonIDs, setTaxonIDs] = useState<number[]>([])
  const [taxons, setTaxons] = useState<any[]>([])

  useEffect(() => {
    // TODO: add infinite load
    const fetchObs = async () => {
      const obs = await axios.get(searchURL)
      if (obs?.data?.results) {
        let ids: number[] = []
        let unique: any[] = []
        obs.data.results.forEach((result: any) => {
          const currentID = result.taxon.id
          !ids.includes(currentID) && ids.push(currentID) && unique.push(result)
        })
        setTaxons(unique)
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
          <div key={`taxon-item-${index}`} className="flex flex-col items-center gap-2">
            <img
              className={`w-20 h-20 rounded-full cursor-pointer ${taxonIDs.includes(taxonID) ? "border-4 border-sky-400" : ""}`}
              src={imgURL}
              onClick={() => handleSelect(taxonID)}
            />
            <a className="w-20 flex flex-col items-center text-sm hover:text-blue-600" href={taxaURL} target="_blank">
              {title ?? "Unknown"}
            </a>
          </div>
        )
      })}
    </>
  )

  return (
    <div className="w-full h-full flex flex-row py-20 gap-4">
      <div className="w-3/4">{mapComponent}</div>
      <div className="w-1/4 flex flex-row justify-start items-start flex-wrap gap-4 overflow-y-scroll">
        {taxonItems}
      </div>
    </div>
  )
}

export default Map
