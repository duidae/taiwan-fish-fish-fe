"use client"
import {useEffect, useRef} from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const RIVER_MAP_API = "https://river-watcher.bambooculture.tw/api/getpcc?limit=3000&requireGeom=True&matches=2000-2099"

function RiversPage() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletMapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // create map once
    if (!leafletMapRef.current) {
      const map = L.map(mapRef.current, {
        center: [23.7, 121],
        zoom: 8,
        maxZoom: 18,
        minZoom: 7
      })

      const mbUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      const mbAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      const streets = L.tileLayer(mbUrl, {attribution: mbAttr})
      streets.addTo(map)

      L.control.zoom({position: "topright"}).addTo(map)

      leafletMapRef.current = map
    }

    // load markercluster css+script from CDN then fetch data
    const addClusterScript = async () => {
      // add CSS
      const cssHref = "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"
      const cssHrefDefault = "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"
      if (!document.querySelector(`link[href="${cssHref}"]`)) {
        const l = document.createElement("link")
        l.rel = "stylesheet"
        l.href = cssHref
        document.head.appendChild(l)
      }
      if (!document.querySelector(`link[href="${cssHrefDefault}"]`)) {
        const l2 = document.createElement("link")
        l2.rel = "stylesheet"
        l2.href = cssHrefDefault
        document.head.appendChild(l2)
      }

      if (!(window as any).L || (window as any).L.MarkerClusterGroup) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script")
          s.src = "https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster-src.js"
          s.onload = () => resolve()
          s.onerror = () => reject()
          document.body.appendChild(s)
        })
      }

      // fetch PCC GeoJSON
      try {
        // try direct fetch first (requires remote server to allow CORS)
        let res = await fetch(RIVER_MAP_API, {mode: "cors"})
        if (!res.ok) {
          // non-2xx status — throw to trigger fallback
          throw new Error("non-OK response")
        }
        const data = await res.json()
        const map = leafletMapRef.current!
        const markers = (window as any).L.markerClusterGroup({maxClusterRadius: 30})
        const geo = L.geoJSON(data, {
          pointToLayer: (feature: any, latlng: L.LatLngExpression) => {
            return L.marker(latlng)
          },
          onEachFeature: (feature: any, layer: L.Layer) => {
            const props = feature.properties || {}
            const title = props.title || props.工程名稱 || props["工程名稱"] || ""
            layer.bindPopup(
              `<div style="max-width:320px"><strong>${title}</strong><div>${props.location || ""}</div></div>`
            )
          }
        })
        markers.addLayer(geo)
        markers.addTo(map)
      } catch (e) {
        // If direct fetch fails (likely CORS), retry via public CORS proxy
        try {
          const proxy = "https://api.allorigins.win/raw?url="
          const proxied = proxy + encodeURIComponent(RIVER_MAP_API)
          const pres = await fetch(proxied)
          if (!pres.ok) return
          const data = await pres.json()
          const map = leafletMapRef.current!
          const markers = (window as any).L.markerClusterGroup({maxClusterRadius: 30})
          const geo = L.geoJSON(data, {
            pointToLayer: (feature: any, latlng: L.LatLngExpression) => {
              return L.marker(latlng)
            },
            onEachFeature: (feature: any, layer: L.Layer) => {
              const props = feature.properties || {}
              const title = props.title || props.工程名稱 || props["工程名稱"] || ""
              layer.bindPopup(
                `<div style="max-width:320px"><strong>${title}</strong><div>${props.location || ""}</div></div>`
              )
            }
          })
          markers.addLayer(geo)
          markers.addTo(map)
        } catch (err) {
          // fallback failed — nothing to show
          console.error("Failed to load PCC data", err)
        }
      }
    }

    addClusterScript()

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  return (
    <div style={{height: "100vh", width: "100%"}}>
      <div id="map" ref={mapRef} style={{height: "100%", width: "100%"}} />
    </div>
  )
}
export default function Rivers() {
  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <div className="w-4/5 h-screen">
        <RiversPage />
      </div>
    </main>
  )
}
