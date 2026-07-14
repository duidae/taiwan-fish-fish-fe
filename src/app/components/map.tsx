"use client"
import {useEffect, useState, useRef, UIEvent} from "react"
import axios from "axios"
import L, {LatLngExpression} from "leaflet"
import {MapContainer, TileLayer, LayersControl, Marker, Popup, GeoJSON, useMap} from "react-leaflet"
import {Group, Panel, Separator} from "react-resizable-panels"
const {BaseLayer, Overlay} = LayersControl
import "@geoman-io/leaflet-geoman-free"

/*
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png"
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png"
*/
import "leaflet/dist/leaflet.css"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"

// iNaturalist API doc: https://api.inaturalist.org/v1/docs/

// place_id=7887 - taiwan
// iconic_taxa=Actinopterygii - fish
// https://api.inaturalist.org/v1/taxa?q=Actinopterygii => id: 47178
// const searchURL = "https://api.inaturalist.org/v1/observations?place_id=7887&view=species&iconic_taxa=Actinopterygii&locale=zh-TW&verifiable=true&order_by=id&order=desc"
const iNatURL =
  "https://api.inaturalist.org/v2/observations/species_counts?verifiable=true&spam=false&place_id=7887&iconic_taxa%5B%5D=Actinopterygii&locale=zh-TW&include_ancestors=true&fields=(taxon%3A(ancestor_ids%3A!t%2Cancestors%3A(default_photo%3A(square_url%3A!t)%2Ciconic_taxon_name%3A!t%2Cid%3A!t%2Cis_active%3A!t%2Cname%3A!t%2Cpreferred_common_name%3A!t%2Cpreferred_common_names%3A(name%3A!t)%2Crank%3A!t%2Crank_level%3A!t%2Cuuid%3A!t)%2Cancestry%3A!t%2Cconservation_status%3A(status%3A!t)%2Cdefault_photo%3A(attribution%3A!t%2Clicense_code%3A!t%2Cmedium_url%3A!t%2Csquare_url%3A!t%2Curl%3A!t)%2Cestablishment_means%3A(establishment_means%3A!t)%2Ciconic_taxon_name%3A!t%2Cid%3A!t%2Cis_active%3A!t%2Cname%3A!t%2Cpreferred_common_name%3A!t%2Cpreferred_common_names%3A(name%3A!t)%2Crank%3A!t%2Crank_level%3A!t))"
const taxanomyURLPrefix = "https://www.inaturalist.org/taxa"
// const speciesSearchExample = "https://api.inaturalist.org/v1/observations/species_counts?nelat=...&nelng=...&swlat=...&swlng=...&taxon_id=47178"

const taxaOnlyURL = "https://api.inaturalist.org/v1/taxa?place_id=7887&taxon_id=47178&rank=species&per_page=100"

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
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const mapWrapperRef = useRef<HTMLDivElement | null>(null)
  const [allRivers, setAllRivers] = useState<any | null>(null)
  const [TBIAResults, setTBIAResults] = useState<any | null>(null)
  //const [riverResults, setRiverResults] = useState<any | null>(null)
  const [riverQuery, setRiverQuery] = useState<string>("")

  useEffect(() => {
    fetchObs(1)
    fetchTBIA()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const PER_PAGE = 50
  const HUES = [0, 30, 60, 120, 180, 240, 300]

  const fetchTBIA = async () => {
    try {
      const response = await axios.get("/api/tbia/map?boundedBy=122,23,121,22&grid=1")
      if (response.data) {
        setTBIAResults(response.data.data)
        console.log("TBIA results:", response.data)
      }
    } catch (e) {
      console.warn("Failed to fetch TBIA data", e)
    }
  }

  const fetchObs = async (p: number) => {
    if (loading || !hasMore) return
    try {
      setLoading(true)
      const url = `${iNatURL}&page=${p}&per_page=${PER_PAGE}`
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

  const removeTaxon = (taxonID: number) => {
    setTaxonIDs(prev => prev.filter(id => id !== taxonID))
  }

  const removeAllTaxons = () => {
    setTaxonIDs([])
  }

  const Geoman = () => {
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

  const mapComponent = (
    <div ref={mapWrapperRef} className="w-full h-full">
      <MapContainer
        className="w-full h-full"
        center={coord}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        //whenCreated={m => setMapInstance(m)}
      >
        {/* Dynamic styles for taxon tile colorization */}
        <style>{`
        ${taxonIDs
          .map((id, i) => {
            const hue = HUES[i % HUES.length]
            return `.taxon-tile-id-${id} { filter: hue-rotate(${hue}deg) saturate(120%) brightness(95%); opacity: 0.9; }`
          })
          .join("\n")}
      `}</style>
        <LayersControl position="topright" collapsed={false}>
          <BaseLayer checked name="溪流圖">
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

          {taxonIDs.map((id, idx) => (
            <Overlay
              key={id}
              checked
              name={taxons.find(t => t.taxon.id === id)?.taxon.preferred_common_name || `Taxon ${id}`}
            >
              <TileLayer
                attribution='<a href="https://www.inaturalist.org/">iNaturalist</a>'
                url={`https://api.inaturalist.org/v1/points/{z}/{x}/{y}.png?taxon_id=${id}`}
                className={`taxon-tile taxon-tile-id-${id}`}
              />
            </Overlay>
          ))}
        </LayersControl>
        {TBIAResults && (
          <GeoJSON data={TBIAResults} style={{color: "#0FC9DC", weight: 3, opacity: 0.7, fillOpacity: 0.7}} />
        )}
        <Geoman />
      </MapContainer>
    </div>
  )

  const taxonItems = (
    <>
      {taxons?.map((result, index) => {
        const taxonID = result.taxon.id
        const taxaURL = `${taxanomyURLPrefix}/${result.taxon.id}`
        const imgURL = result.taxon.default_photo.medium_url
        const title = result.taxon?.preferred_common_name
        const taxonName = result.taxon.name

        return (
          <div key={`taxon-item-${index}`} className="flex flex-col items-center gap-2">
            <img
              className={`w-40 h-40 m-1 cursor-pointer object-cover ${taxonIDs.includes(taxonID) ? "outline outline-sky-400" : ""}`}
              src={imgURL}
              onClick={() => handleSelect(taxonID)}
              alt={title ?? "taxon image"}
            />
            <a className="w-40 flex flex-col items-center text-sm hover:text-blue-600" href={taxaURL} target="_blank">
              {title ?? "Unknown"}
              <span className="text-xs text-gray-500">
                <em>{taxonName}</em>
              </span>
            </a>
          </div>
        )
      })}
    </>
  )

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

  /*
  const handleSearchSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!riverQuery || riverQuery.trim().length < 1) return
    const data = await fetchAllRivers()
    if (!data) return
    const q = riverQuery.trim().toLowerCase()
    const matches = data.features.filter((f: any) => {
      const name = (f.properties?.name || "").toString().toLowerCase()
      return name.includes(q)
    })
    if (matches.length > 0) {
      const fc = {type: "FeatureCollection", features: matches}
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
  */

  const handleResultClick = (feature: any) => {
    if (!feature) return
    const coords = feature.geometry?.coordinates
    if (coords) {
      // GeoJSON coordinates are [lng, lat]
      const latlng: LatLngExpression = [coords[1], coords[0]]
      mapInstance && mapInstance.setView(latlng as any, 13)
    }
  }

  const searchJSX = (
    <form /*onSubmit={handleSearchSubmit}*/ className="flex gap-2 items-center">
      <input
        className="flex-1 p-2 border rounded"
        placeholder="搜尋河川"
        value={riverQuery}
        onChange={e => setRiverQuery(e.target.value)}
      />
      <button className="btn btn-style1 p-2" type="submit">
        搜尋
      </button>
    </form>
  )

  const chipsJSX = (
    <div className="min-h-8 flex flex-wrap gap-2 items-center">
      {taxonIDs.map((id, idx) => {
        const item = taxons.find(t => t.taxon?.id === id)
        const name = item?.taxon?.preferred_common_name || item?.taxon?.name || `Taxon ${id}`
        const img = item?.taxon?.default_photo?.square_url || item?.taxon?.default_photo?.medium_url
        const hue = HUES[idx % HUES.length]
        const bg = `hsl(${hue}, 90%, 95%)`
        const fg = `hsl(${hue}, 70%, 30%)`
        return (
          <div
            key={`chip-${id}`}
            className="flex items-center gap-2 px-2 py-1 rounded-full"
            style={{backgroundColor: bg, color: fg}}
          >
            {img && <img src={img} alt={name} className="w-6 h-6 rounded-full object-cover" />}
            <span className="text-sm italic">{name}</span>
            <button onClick={() => removeTaxon(id)} className="ml-2 text-xs leading-none" aria-label={`remove ${name}`}>
              ×
            </button>
          </div>
        )
      })}
      {taxonIDs.length > 0 && (
        <div
          key={`chip-clear`}
          onClick={removeAllTaxons}
          role="button"
          className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer"
          style={{backgroundColor: "hsl(0, 80%, 95%)", color: "hsl(0, 65%, 30%)"}}
          aria-label="remove all selected taxons"
        >
          清除全部
        </div>
      )}
    </div>
  )

  const taxonItemsJSX = (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="flex-1 flex flex-row justify-start items-start flex-wrap gap-4 overflow-y-scroll"
    >
      {riverResults ? (
        <div className="w-full">
          <div className="text-sm font-semibold mb-2">搜尋結果</div>
          {riverResults.features.map((f: any, i: number) => (
            <div key={`river-${i}`} className="p-1 cursor-pointer" onClick={() => handleResultClick(f)}>
              {f.properties?.name} <span className="text-xs text-gray-500">{f.properties?.city}</span>
            </div>
          ))}
        </div>
      ) : (
        taxonItems
      )}

      {loading && <div className="w-full text-center">載入中…</div>}
      {!hasMore && <div className="w-full text-center">已載入全部</div>}
    </div>
  )

  useEffect(() => {
    if (!mapInstance || !mapWrapperRef.current) return
    const ro = new ResizeObserver(() => {
      try {
        mapInstance.invalidateSize()
      } catch (e) {
        console.warn("invalidateSize failed", e)
      }
    })
    ro.observe(mapWrapperRef.current)
    return () => ro.disconnect()
  }, [mapInstance])

  return (
    <Group orientation="horizontal" id="map-panel-group">
      <Panel defaultSize={"66%"} className="h-full">
        <div className="h-full">{mapComponent}</div>
      </Panel>
      <Separator className="rounded-xs flex items-center justify-center bg-slate-600 [&[data-separator='disabled']]:opacity-50 [&[data-separator='hover']]:bg-slate-500 [&[data-separator='active']]:bg-slate-400 text-slate-900 [&[data-separator='hover']]:text-slate-950 [&[data-separator='active']]:text-slate-950 [&[data-separator='focus']]:bg-sky-400 w-4 sm:w-2" />
      <Panel defaultSize={"34%"} className="h-full overflow-auto p-4 flex flex-col gap-4">
        {searchJSX}
        {chipsJSX}
        {taxonItemsJSX}
      </Panel>
    </Group>
  )
}

export default Map
