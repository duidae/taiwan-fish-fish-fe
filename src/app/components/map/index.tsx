"use client"
import {useEffect, useState, useRef} from "react"
import L, {LatLngExpression} from "leaflet"

import {TAIWAN_CENTER} from "./constants"
import {useSpeciesSearch} from "./hooks/use-species-search"
import {useTaxonSelection} from "./hooks/use-taxon-selection"
import {useObservations} from "./hooks/use-observations"
import {useRiverSearch} from "./hooks/use-river-search"
import {MapView} from "./components/map-view"
import {RiverSearchPanel} from "./components/river-search-panel"
import {RiverResultsList} from "./components/river-results-list"
import {SpeciesSlider} from "./components/species-slider"

const Map = () => {
  const [coord] = useState<LatLngExpression>(TAIWAN_CENTER as LatLngExpression)
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const mapWrapperRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const selection = useTaxonSelection()
  const species = useSpeciesSearch()
  const observations = useObservations(selection.taxonIDs, species.taxons)
  const river = useRiverSearch(mapInstance)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

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

  const riverResultsJSX = river.riverResults && !river.searchResultsCollapsed && (
    <RiverResultsList
      riverResults={river.riverResults}
      selectedRiver={river.selectedRiver}
      handleResultClick={river.handleResultClick}
    />
  )

  return (
    <div className="relative w-full h-full">
      <MapView
        mapWrapperRef={mapWrapperRef}
        coord={coord}
        isMobile={isMobile}
        setMapInstance={setMapInstance}
        taxonIDs={selection.taxonIDs}
        taxons={species.taxons}
        observationSources={observations.observationSources}
        observationsByTaxon={observations.observationsByTaxon}
        observationsByTaxonTBIA={observations.observationsByTaxonTBIA}
        riverResults={river.riverResults}
        riverQuery={river.riverQuery}
        selectedChannel={river.selectedChannel}
        selectedRiver={river.selectedRiver}
        selectedRiverMarkerRef={river.selectedRiverMarkerRef}
        fetchAllRivers={river.fetchAllRivers}
        handleResultClick={river.handleResultClick}
      />
      <div
        className={`absolute z-[1000] flex flex-col gap-2 ${
          isMobile ? "top-4 left-16 right-4 bottom-4" : "top-4 right-4 bottom-4 w-full max-w-sm"
        }`}
      >
        <div className="flex-shrink-0 rounded-xl bg-white/95 backdrop-blur-md shadow-lg p-3">
          <RiverSearchPanel
            riverQuery={river.riverQuery}
            setRiverQuery={river.setRiverQuery}
            handleSearchSubmit={river.handleSearchSubmit}
            riverResults={river.riverResults}
            searchResultsCollapsed={river.searchResultsCollapsed}
            setSearchResultsCollapsed={river.setSearchResultsCollapsed}
          />
        </div>
        {riverResultsJSX}
        <div className="flex-1 min-h-0 rounded-xl bg-white/95 backdrop-blur-md shadow-lg p-3">
          <SpeciesSlider
            fishQuery={species.fishQuery}
            setFishQuery={species.setFishQuery}
            handleFishSearchSubmit={species.handleFishSearchSubmit}
            fishSearchResults={species.fishSearchResults}
            fishSearchLoading={species.fishSearchLoading}
            clearFishSearch={species.clearFishSearch}
            observationSources={observations.observationSources}
            toggleObservationSource={observations.toggleObservationSource}
            taxons={species.taxons}
            taxonIDs={selection.taxonIDs}
            handleSelect={selection.handleSelect}
            removeTaxon={selection.removeTaxon}
            removeAllTaxons={selection.removeAllTaxons}
            loading={species.loading}
            hasMore={species.hasMore}
            loadingTaxonIds={observations.loadingTaxonIds}
            handleListScroll={species.handleListScroll}
          />
        </div>
      </div>
    </div>
  )
}

export default Map
