"use client"
import {useEffect, useState, useRef, UIEvent} from "react"
import axios from "axios"
import L, {LatLngExpression} from "leaflet"
import {MapContainer, TileLayer, LayersControl, Marker, Popup} from "react-leaflet"
const {BaseLayer, Overlay} = LayersControl

/*
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png"
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png"
*/
import "leaflet/dist/leaflet.css"

// iNaturalist API doc: https://api.inaturalist.org/v1/docs/

// place_id=131031 - taiwan
// iconic_taxa=Actinopterygii - fish
const searchURL = "https://api.inaturalist.org/v1/observations?place_id=7887&view=species&iconic_taxa=Actinopterygii"
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

const g0vToken = "pk.eyJ1IjoianMwMDE5MyIsImEiOiJjazN0dnN2aDkwNmwxM21vM2lvNDB4ZzJkIn0.48gtpsBsdD2vLWDVe1dOlQ"
const defaultTileAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const Map = () => {
  const [coord, setCoord] = useState<LatLngExpression>(TAIWAN_CENTER as LatLngExpression)
  const [taxonIDs, setTaxonIDs] = useState<number[]>([])
  const [taxons, setTaxons] = useState<any[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetchObs(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const PER_PAGE = 30

  const fetchObs = async (p: number) => {
    if (loading || !hasMore) return
    try {
      setLoading(true)
      const url = `${searchURL}&page=${p}&per_page=${PER_PAGE}`
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

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const threshold = 200 // px from bottom
    if (target.scrollHeight - target.scrollTop - target.clientHeight < threshold) {
      if (!loading && hasMore) {
        fetchObs(page + 1)
      }
    }
  }

  const handleSelect = (taxonID: number) => {
    const newSelections = taxonIDs.includes(taxonID) ? taxonIDs.filter(id => id !== taxonID) : [...taxonIDs, taxonID]
    setTaxonIDs(newSelections)
  }

  const mapComponent = (
    <MapContainer className="w-full h-full" center={coord} zoom={DEFAULT_ZOOM} scrollWheelZoom>
      <LayersControl position="topright" collapsed={false}>
        <BaseLayer checked name="街道圖">
          <TileLayer
            attribution={defaultTileAttr}
            url={`https://api.mapbox.com/styles/v1/js00193/ck0lupyad8k061dmv7zvbvwgv/tiles/256/{z}/{x}/{y}@2x?access_token=${g0vToken}`}
          />
        </BaseLayer>

        <BaseLayer name="空照圖">
          <TileLayer
            attribution={defaultTileAttr}
            url={`https://api.mapbox.com/styles/v1/js00193/ck0x9ai2j5kgb1co36kagohqm/tiles/256/{z}/{x}/{y}@2x?access_token=${g0vToken}`}
          />
        </BaseLayer>

        <BaseLayer name="地圖">
          <TileLayer attribution={defaultTileAttr} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>

        {taxonIDs.map(id => (
          <Overlay key={id} checked name={taxons.find(t => t.taxon.id === id)?.species_guess || `Taxon ${id}`}>
            <TileLayer
              attribution='<a href="https://www.inaturalist.org/">iNaturalist</a>'
              url={`https://api.inaturalist.org/v1/points/{z}/{x}/{y}.png?taxon_id=${id}`}
            />
          </Overlay>
        ))}
      </LayersControl>
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
              className={`w-20 h-20 m-1 rounded-full cursor-pointer ${taxonIDs.includes(taxonID) ? "outline outline-sky-400" : ""}`}
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
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="w-1/4 flex flex-row justify-start items-start flex-wrap gap-4 overflow-y-scroll"
      >
        {taxonItems}
        {loading && <div className="w-full text-center">載入中…</div>}
        {!hasMore && <div className="w-full text-center">已載入全部</div>}
      </div>
    </div>
  )
}

export default Map
