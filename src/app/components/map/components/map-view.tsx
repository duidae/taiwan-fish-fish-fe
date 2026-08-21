"use client"
import {RefObject} from "react"
import L, {LatLngExpression} from "leaflet"
import {MapContainer, TileLayer, LayersControl, Marker, Popup, GeoJSON} from "react-leaflet"
const {BaseLayer, Overlay} = LayersControl
import "leaflet/dist/leaflet.css"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"

import {DEFAULT_ZOOM, HUES, g0vToken, defaultTileAttr} from "../constants"
import {GeomanControls} from "./geoman-controls"
import {NearestRiverOnClick} from "./nearest-river-on-click"
import {ObservationMarkers} from "./observation-markers"

type Props = {
  mapWrapperRef: RefObject<HTMLDivElement>
  coord: LatLngExpression
  isMobile: boolean
  setMapInstance: (map: L.Map | null) => void
  taxonIDs: number[]
  taxons: any[]
  observationSources: Set<"inaturalist" | "tbia">
  observationsByTaxon: Record<number, any[]>
  observationsByTaxonTBIA: Record<number, any[]>
  riverResults: any | null
  riverQuery: string
  selectedChannel: any | null
  selectedRiver: any | null
  selectedRiverMarkerRef: RefObject<L.Marker>
  fetchAllRivers: () => Promise<any | null>
  handleResultClick: (feature: any) => void | Promise<void>
}

export const MapView = ({
  mapWrapperRef,
  coord,
  isMobile,
  setMapInstance,
  taxonIDs,
  taxons,
  observationSources,
  observationsByTaxon,
  observationsByTaxonTBIA,
  riverResults,
  riverQuery,
  selectedChannel,
  selectedRiver,
  selectedRiverMarkerRef,
  fetchAllRivers,
  handleResultClick
}: Props) => (
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

        {taxonIDs.map(id => (
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
      <ObservationMarkers
        taxonIDs={taxonIDs}
        observationSources={observationSources}
        observationsByTaxon={observationsByTaxon}
        observationsByTaxonTBIA={observationsByTaxonTBIA}
      />
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
          position={[selectedRiver.geometry.coordinates[1], selectedRiver.geometry.coordinates[0]] as LatLngExpression}
        >
          <Popup>
            {selectedRiver.properties?.name}
            {selectedRiver.properties?.city && (
              <span className="text-xs text-gray-500">　{selectedRiver.properties.city}</span>
            )}
          </Popup>
        </Marker>
      )}
      <GeomanControls />
      <NearestRiverOnClick fetchAllRivers={fetchAllRivers} handleResultClick={handleResultClick} />
    </MapContainer>
  </div>
)
