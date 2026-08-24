"use client"
import {CircleMarker, MapContainer, Popup, TileLayer} from "react-leaflet"
import {LatLngExpression} from "leaflet"
import "leaflet/dist/leaflet.css"
import {SpeciesEntry} from "../species-list"
import {useDashboardObservations} from "../hooks/use-dashboard-observations"

const TAIWAN_CENTER: LatLngExpression = [23.973837, 120.97969]
const DEFAULT_ZOOM = 8
const HUES = [0, 30, 60, 120, 180, 240, 300]
const RADIUS = 8

type Props = {
  selected: SpeciesEntry[]
}

export const DashboardMap = ({selected}: Props) => {
  const {observationsByName, observationsByNameTBIA} = useDashboardObservations(selected)

  return (
    <MapContainer className="w-full h-full" center={TAIWAN_CENTER} zoom={DEFAULT_ZOOM} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selected.flatMap(({commonName, scientificName}, idx) => {
        const hue = HUES[idx % HUES.length]
        const inatColor = `hsl(${hue}, 70%, 75%)`
        const tbiaColor = `hsl(${hue}, 70%, 20%)`

        const inatMarkers = (observationsByName[scientificName] ?? [])
          .filter((o: any) => o.geojson?.coordinates)
          .map((o: any) => (
            <CircleMarker
              key={`inat-${scientificName}-${o.id}`}
              center={[o.geojson.coordinates[1], o.geojson.coordinates[0]] as LatLngExpression}
              radius={RADIUS}
              weight={1}
              color="white"
              fillColor={inatColor}
              fillOpacity={0.9}
            >
              <Popup>
                <div className="flex flex-col gap-1 w-40">
                  {o.photos?.[0]?.url && (
                    <img
                      src={o.photos[0].url.replace("square", "medium")}
                      alt={commonName}
                      className="w-full rounded object-cover"
                    />
                  )}
                  <span className="font-semibold text-sm">{commonName}</span>
                  <span className="text-xs text-gray-500">{o.observed_on_string || o.observed_on}</span>
                  {o.place_guess && <span className="text-xs text-gray-500">{o.place_guess}</span>}
                  <a href={o.uri} target="_blank" rel="noreferrer" className="text-xs text-sky-600 underline">
                    在 iNaturalist 上查看
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          ))

        const tbiaMarkers = (observationsByNameTBIA[scientificName] ?? [])
          .filter((o: any) => o.standardLatitude != null && o.standardLongitude != null)
          .map((o: any) => (
            <CircleMarker
              key={`tbia-${scientificName}-${o.id}`}
              center={[o.standardLatitude, o.standardLongitude] as LatLngExpression}
              radius={RADIUS}
              weight={1}
              color="white"
              fillColor={tbiaColor}
              fillOpacity={0.9}
            >
              <Popup>
                <div className="flex flex-col gap-1 w-44">
                  <span className="font-semibold text-sm">{commonName}</span>
                  <span className="text-xs text-gray-500">{o.standardDate || o.eventDate}</span>
                  <span className="text-xs text-gray-500">
                    {[o.county, o.municipality, o.locality].filter(Boolean).join(" ")}
                  </span>
                  {o.datasetName && <span className="text-[10px] text-gray-400">{o.datasetName}</span>}
                  <a href={o.references} target="_blank" rel="noreferrer" className="text-xs text-sky-600 underline">
                    在 TBIA 上查看
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          ))

        return [...inatMarkers, ...tbiaMarkers]
      })}
    </MapContainer>
  )
}
