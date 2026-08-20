"use client"
import {useEffect, useState, useRef, UIEvent} from "react"
import axios from "axios"
import L, {LatLngExpression} from "leaflet"
import {MapContainer, TileLayer, LayersControl, Marker, Popup, GeoJSON, CircleMarker, useMap} from "react-leaflet"
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
  const [observationsByTaxon, setObservationsByTaxon] = useState<Record<number, any[]>>({})
  const [loadingTaxonIds, setLoadingTaxonIds] = useState<Set<number>>(new Set())
  const [riverResults, setRiverResults] = useState<any | null>(null)
  const [riverQuery, setRiverQuery] = useState<string>("")
  const [selectedRiver, setSelectedRiver] = useState<any | null>(null)
  const selectedRiverMarkerRef = useRef<L.Marker | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<any | null>(null)
  const [searchResultsCollapsed, setSearchResultsCollapsed] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [fishQuery, setFishQuery] = useState<string>("")
  const [fishSearchResults, setFishSearchResults] = useState<any[] | null>(null)
  const [fishSearchLoading, setFishSearchLoading] = useState<boolean>(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (selectedRiver && selectedRiverMarkerRef.current) {
      selectedRiverMarkerRef.current.openPopup()
    }
  }, [selectedRiver])

  useEffect(() => {
    fetchObs(1)
  }, [])

  useEffect(() => {
    taxonIDs.forEach(id => fetchObservations(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxonIDs])

  const PER_PAGE = 50
  const OBSERVATIONS_PER_PAGE = 100
  const HUES = [0, 30, 60, 120, 180, 240, 300]

  const fetchObservations = async (taxonId: number) => {
    if (observationsByTaxon[taxonId] || loadingTaxonIds.has(taxonId)) return
    setLoadingTaxonIds(prev => new Set(prev).add(taxonId))
    try {
      const url = `https://api.inaturalist.org/v1/observations?taxon_id=${taxonId}&place_id=7887&photos=true&geo=true&per_page=${OBSERVATIONS_PER_PAGE}&order_by=observed_on&order=desc`
      const res = await axios.get(url)
      setObservationsByTaxon(prev => ({...prev, [taxonId]: res?.data?.results ?? []}))
    } catch (e) {
      console.warn("Failed to fetch observations for taxon", taxonId, e)
      setObservationsByTaxon(prev => ({...prev, [taxonId]: []}))
    } finally {
      setLoadingTaxonIds(prev => {
        const next = new Set(prev)
        next.delete(taxonId)
        return next
      })
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

  const handleHorizontalScroll = (e: UIEvent<HTMLDivElement>) => {
    if (fishSearchResults) return // search results aren't paginated
    const target = e.currentTarget
    const threshold = 300 // px from the trailing edge
    if (target.scrollWidth - target.scrollLeft - target.clientWidth < threshold) {
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
      <MapContainer className="w-full h-full" center={coord} zoom={DEFAULT_ZOOM} scrollWheelZoom ref={setMapInstance}>
        {/* Dynamic styles for taxon tile colorization */}
        <style>{`
        ${taxonIDs
          .map((id, i) => {
            const hue = HUES[i % HUES.length]
            return `.taxon-tile-id-${id} { filter: hue-rotate(${hue}deg) saturate(120%) brightness(95%); opacity: 0.9; }`
          })
          .join("\n")}
      `}</style>
        <LayersControl position="topright" collapsed={isMobile}>
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
        {taxonIDs.flatMap((id, idx) => {
          const hue = HUES[idx % HUES.length]
          const color = `hsl(${hue}, 70%, 45%)`
          const observations = observationsByTaxon[id] || []
          return observations
            .filter((o: any) => o.geojson?.coordinates)
            .map((o: any) => (
              <CircleMarker
                key={`obs-${id}-${o.id}`}
                center={[o.geojson.coordinates[1], o.geojson.coordinates[0]] as LatLngExpression}
                radius={5}
                weight={1}
                color="white"
                fillColor={color}
                fillOpacity={0.9}
              >
                <Popup>
                  <div className="flex flex-col gap-1 w-40">
                    {o.photos?.[0]?.url && (
                      <img
                        src={o.photos[0].url.replace("square", "medium")}
                        alt={o.taxon?.preferred_common_name ?? o.taxon?.name}
                        className="w-full rounded object-cover"
                      />
                    )}
                    <span className="font-semibold text-sm">{o.taxon?.preferred_common_name || o.taxon?.name}</span>
                    <span className="text-xs text-gray-500">{o.observed_on_string || o.observed_on}</span>
                    {o.place_guess && <span className="text-xs text-gray-500">{o.place_guess}</span>}
                    <a href={o.uri} target="_blank" rel="noreferrer" className="text-xs text-sky-600 underline">
                      在 iNaturalist 上查看
                    </a>
                  </div>
                </Popup>
              </CircleMarker>
            ))
        })}
        {riverResults && (
          <GeoJSON
            key={`river-results-${riverResults.features.length}-${riverQuery}`}
            data={riverResults}
            pointToLayer={(_feature, latlng) =>
              L.circleMarker(latlng, {
                radius: 6,
                weight: 2,
                color: "#1d4ed8",
                fillColor: "#60a5fa",
                fillOpacity: 0.8
              })
            }
            onEachFeature={(feature, layer) => {
              const name = feature.properties?.name
              const city = feature.properties?.city
              layer.bindTooltip(city ? `${name}（${city}）` : name)
              layer.on("click", () => handleResultClick(feature))
            }}
          />
        )}
        {selectedChannel && (
          <GeoJSON
            key={`river-channel-${selectedRiver?.properties?.name}-${selectedChannel.features.length}`}
            data={selectedChannel}
            style={{color: "#60a5fa", weight: 6, fillColor: "#93c5fd", fillOpacity: 0.4}}
          />
        )}
        {selectedRiver && !selectedChannel && selectedRiver.geometry?.coordinates && (
          <Marker
            ref={selectedRiverMarkerRef}
            position={
              [selectedRiver.geometry.coordinates[1], selectedRiver.geometry.coordinates[0]] as LatLngExpression
            }
          >
            <Popup>
              {selectedRiver.properties?.name}
              {selectedRiver.properties?.city && (
                <span className="text-xs text-gray-500">　{selectedRiver.properties.city}</span>
              )}
            </Popup>
          </Marker>
        )}
        <Geoman />
      </MapContainer>
    </div>
  )

  const renderTaxonCard = (result: any, index: number) => {
    const taxonID = result.taxon.id
    const taxaURL = `${taxanomyURLPrefix}/${result.taxon.id}`
    const imgURL = result.taxon.default_photo.medium_url
    const title = result.taxon?.preferred_common_name
    const taxonName = result.taxon.name

    return (
      <div
        key={`taxon-item-${taxonID}-${index}`}
        className="flex flex-shrink-0 w-24 sm:w-28 flex-col items-center gap-1.5"
      >
        <img
          className={`w-full aspect-square rounded-lg cursor-pointer object-cover transition hover:opacity-90 ${
            taxonIDs.includes(taxonID) ? "ring-4 ring-sky-400" : ""
          }`}
          src={imgURL}
          onClick={() => handleSelect(taxonID)}
          alt={title ?? "taxon image"}
        />
        <a
          className="w-full flex flex-col items-center text-center text-xs hover:text-blue-600"
          href={taxaURL}
          target="_blank"
        >
          <span className="truncate w-full">{title ?? "Unknown"}</span>
          <span className="text-[10px] text-gray-500 truncate w-full">
            <em>{taxonName}</em>
          </span>
        </a>
      </div>
    )
  }

  const displayedTaxons = fishSearchResults ?? taxons
  const taxonItems = <>{displayedTaxons?.map(renderTaxonCard)}</>

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

  const handleSearchSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setSelectedRiver(null)
    setSelectedChannel(null)
    setSearchResultsCollapsed(false)
    const q = riverQuery.trim().toLowerCase()
    if (q.length < 1) {
      setRiverResults(null)
      return
    }
    const data = await fetchAllRivers()
    if (!data) return
    const matches = data.features.filter((f: any) => {
      const name = (f.properties?.name || "").toString().toLowerCase()
      return name.includes(q)
    })
    if (matches.length > 0) {
      const fc = {type: "FeatureCollection" as const, features: matches}
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

  const handleFishSearchSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = fishQuery.trim()
    if (q.length < 1) {
      setFishSearchResults(null)
      return
    }
    setFishSearchLoading(true)
    try {
      const res = await axios.get(`${iNatURL}&q=${encodeURIComponent(q)}&per_page=30`)
      const results = res?.data?.results ?? []
      setFishSearchResults(results)
      // merge into `taxons` so chips/observations can still resolve name+photo
      // after the user clears the search box
      setTaxons(prev => {
        const existingIds = new Set(prev.map((t: any) => t.taxon?.id))
        const fresh = results.filter((r: any) => !existingIds.has(r.taxon?.id))
        return [...prev, ...fresh]
      })
    } catch (err) {
      console.warn("fish search failed", err)
      setFishSearchResults([])
    } finally {
      setFishSearchLoading(false)
    }
  }

  const clearFishSearch = () => {
    setFishQuery("")
    setFishSearchResults(null)
  }

  const handleResultClick = async (feature: any) => {
    if (!feature) return
    const coords = feature.geometry?.coordinates
    const name = feature.properties?.name
    setSelectedRiver(feature)
    setSelectedChannel(null)

    // Try to show the river's actual channel shape (from WRA's RIVERPOLY dataset)
    if (name) {
      try {
        const res = await fetch(`/api/river-channels?name=${encodeURIComponent(name)}`)
        const channel = res.ok ? await res.json() : null
        if (channel?.features?.length > 0) {
          setSelectedChannel(channel)
          const bounds = L.geoJSON(channel).getBounds()
          if (mapInstance && bounds.isValid()) {
            mapInstance.fitBounds(bounds)
            return
          }
        }
      } catch (err) {
        console.warn("failed to load river channel", err)
      }
    }

    // Fallback: no channel geometry found, just pan/zoom to the point
    if (coords) {
      const latlng: LatLngExpression = [coords[1], coords[0]]
      mapInstance && mapInstance.setView(latlng as any, 13)
    }
  }

  const searchJSX = (
    <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-2 items-center">
      <input
        className="flex-1 min-w-[140px] px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
        placeholder="搜尋河川"
        value={riverQuery}
        onChange={e => setRiverQuery(e.target.value)}
      />
      <button
        className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium transition hover:bg-sky-700 active:bg-sky-800"
        type="submit"
      >
        搜尋
      </button>
      {riverResults && (
        <button
          type="button"
          className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          onClick={() => setSearchResultsCollapsed(prev => !prev)}
        >
          {searchResultsCollapsed ? "顯示結果" : "隱藏結果"}
        </button>
      )}
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
            className="flex items-center gap-2 px-2 py-1 rounded-full shadow-sm transition hover:shadow"
            style={{backgroundColor: bg, color: fg}}
          >
            {img && <img src={img} alt={name} className="w-6 h-6 rounded-full object-cover" />}
            <span className="text-sm italic">{name}</span>
            <button
              onClick={() => removeTaxon(id)}
              className="ml-1 w-4 h-4 flex items-center justify-center rounded-full text-xs leading-none transition hover:bg-black/10"
              aria-label={`remove ${name}`}
            >
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
          className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer shadow-sm transition hover:shadow"
          style={{backgroundColor: "hsl(0, 80%, 95%)", color: "hsl(0, 65%, 30%)"}}
          aria-label="remove all selected taxons"
        >
          清除全部
        </div>
      )}
    </div>
  )

  const riverResultsJSX = riverResults && !searchResultsCollapsed && (
    <div className="w-full max-h-72 overflow-y-auto rounded-xl bg-white/95 backdrop-blur-md shadow-lg p-3">
      <div className="text-sm font-semibold mb-2 text-slate-700">搜尋結果（{riverResults.features.length}）</div>
      <div className="flex flex-col gap-1">
        {riverResults.features.map((f: any, i: number) => (
          <div
            key={`river-${i}`}
            className={`px-3 py-2 cursor-pointer rounded-lg text-sm transition ${
              selectedRiver === f ? "bg-sky-100 text-sky-800" : "hover:bg-slate-100"
            }`}
            onClick={() => handleResultClick(f)}
          >
            {f.properties?.name} <span className="text-xs text-gray-500">{f.properties?.city}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const speciesSliderJSX = (
    <div className="w-full rounded-xl bg-white/95 backdrop-blur-md shadow-lg p-3 flex flex-col gap-2">
      <form onSubmit={handleFishSearchSubmit} className="flex items-center gap-2">
        <input
          className="flex-1 min-w-0 px-3 py-1.5 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
          placeholder="搜尋魚類名稱"
          value={fishQuery}
          onChange={e => setFishQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-sm font-medium transition hover:bg-sky-700 active:bg-sky-800"
        >
          搜尋
        </button>
        {fishSearchResults && (
          <button
            type="button"
            onClick={clearFishSearch}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            清除
          </button>
        )}
      </form>
      <div className="flex flex-row items-center">
        <span className="text-sm font-semibold text-slate-700 mr-2">
          {fishSearchResults ? `搜尋結果（${fishSearchResults.length}）：` : "魚類物種："}
        </span>
        {chipsJSX}
      </div>
      <div className="flex items-center justify-between">
        {fishSearchLoading && <span className="text-xs text-slate-400">搜尋中…</span>}
        {!fishSearchLoading && fishSearchResults?.length === 0 && (
          <span className="text-xs text-slate-400">找不到符合的魚類</span>
        )}
        {!fishSearchResults && loading && <span className="text-xs text-slate-400">載入中…</span>}
        {!fishSearchResults && !loading && !hasMore && <span className="text-xs text-slate-400">已載入全部</span>}
        {loadingTaxonIds.size > 0 && <span className="text-xs text-slate-400">載入觀察紀錄中…</span>}
      </div>
      <div ref={listRef} onScroll={handleHorizontalScroll} className="flex gap-3 overflow-x-auto pb-1">
        {taxonItems}
      </div>
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
    <div className="relative w-full h-full">
      {mapComponent}
      <div
        className={`absolute top-4 z-[1000] flex flex-col gap-2 ${
          isMobile ? "left-16 right-4" : "left-1/2 -translate-x-1/2 w-full max-w-md"
        }`}
      >
        <div className="rounded-xl bg-white/95 backdrop-blur-md shadow-lg p-3">{searchJSX}</div>
        {riverResultsJSX}
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[1000] w-[75%] min-w-8xl">{speciesSliderJSX}</div>
    </div>
  )
}

export default Map
