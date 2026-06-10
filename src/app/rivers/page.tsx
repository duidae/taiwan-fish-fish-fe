"use client"
import {useEffect, useRef} from "react"
import "leaflet/dist/leaflet.css"
import styles from "./page.module.css"

const RIVER_MAP_API = "https://river-watcher.bambooculture.tw/api/getpcc?limit=3000&requireGeom=True&matches=2000-2099"

const RiversPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletMapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    let L: any = undefined

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

      try {
        const map = leafletMapRef.current!

        // try to fetch and render local river GeoJSON
        try {
          const rres = await fetch("/api/local-rivers")
          if (rres.ok) {
            const rivers = await rres.json()
            const riverStyle = {
              fillColor: "#0FC9DC",
              color: "#0FC9DC",
              weight: 3,
              opacity: 0.7,
              fillOpacity: 0.7
            }
            const riverLayer = L.geoJSON(rivers, {
              style: riverStyle
            })
            //riverLayer.addTo(map)
          }
        } catch (err) {
          // ignore missing local file
        }
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

    const init = async () => {
      // dynamically import leaflet only on client
      const leafletModule = await import("leaflet")
      L = (window as any).L = leafletModule && (leafletModule.default || leafletModule)

      const mbAttr =
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://www.mapbox.com/">mapbox</a> '
      const MymbUrl =
        "https://api.mapbox.com/styles/v1/js00193/{id}/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoianMwMDE5MyIsImEiOiJjazN0dnN2aDkwNmwxM21vM2lvNDB4ZzJkIn0.48gtpsBsdD2vLWDVe1dOlQ"
      const satellite = L.tileLayer(MymbUrl, {id: "ck0x9ai2j5kgb1co36kagohqm", attribution: mbAttr})
      const streets = L.tileLayer(MymbUrl, {id: "ck0lupyad8k061dmv7zvbvwgv", attribution: mbAttr})

      // create map once
      if (!leafletMapRef.current) {
        const map = L.map(mapRef.current, {
          center: [23.7, 121],
          zoom: 8,
          layers: [streets],
          maxZoom: 18,
          minZoom: 7
        })

        L.control
          .layers(
            {
              空照圖: satellite,
              街道圖: streets
            },
            null,
            {position: "topright"}
          )
          .addTo(map)

        leafletMapRef.current = map
      }

      await addClusterScript()
    }

    init()

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.map} id="map" ref={mapRef} />
    </div>
  )
}

export default function Rivers() {
  return (
    <main className="flex flex-col w-full items-center justify-between mt-24 mb-8">
      <div className="w-full">
        <RiversPage />
      </div>
    </main>
  )
}
