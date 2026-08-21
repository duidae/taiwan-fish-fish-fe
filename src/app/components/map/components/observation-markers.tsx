"use client"
import {CircleMarker, Popup} from "react-leaflet"
import {LatLngExpression} from "leaflet"
import {HUES} from "../constants"

const radius = 10

const renderINatMarker = (o: any, id: number, color: string) => (
  <CircleMarker
    key={`inat-obs-${id}-${o.id}`}
    center={[o.geojson.coordinates[1], o.geojson.coordinates[0]] as LatLngExpression}
    radius={radius}
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
)

const renderTbiaMarker = (o: any, id: number, color: string) => (
  <CircleMarker
    key={`tbia-obs-${id}-${o.id}`}
    center={[o.standardLatitude, o.standardLongitude] as LatLngExpression}
    radius={radius}
    weight={1}
    color="white"
    fillColor={color}
    fillOpacity={0.9}
  >
    <Popup>
      <div className="flex flex-col gap-1 w-44">
        <span className="font-semibold text-sm">{o.common_name_c || o.scientificName}</span>
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
)

type Props = {
  taxonIDs: number[]
  observationSources: Set<"inaturalist" | "tbia">
  observationsByTaxon: Record<number, any[]>
  observationsByTaxonTBIA: Record<number, any[]>
}

export const ObservationMarkers = ({
  taxonIDs,
  observationSources,
  observationsByTaxon,
  observationsByTaxonTBIA
}: Props) => (
  <>
    {taxonIDs.flatMap((id, idx) => {
      const hue = HUES[idx % HUES.length]
      const inatColor = `hsl(${hue}, 70%, 75%)`
      const tbiaColor = `hsl(${hue}, 70%, 20%)`
      const markers: React.ReactNode[] = []
      if (observationSources.has("inaturalist")) {
        const observations = observationsByTaxon[id] || []
        markers.push(
          ...observations.filter((o: any) => o.geojson?.coordinates).map((o: any) => renderINatMarker(o, id, inatColor))
        )
      }
      if (observationSources.has("tbia")) {
        const observations = observationsByTaxonTBIA[id] || []
        markers.push(
          ...observations
            .filter((o: any) => o.standardLatitude != null && o.standardLongitude != null)
            .map((o: any) => renderTbiaMarker(o, id, tbiaColor))
        )
      }
      return markers
    })}
  </>
)
