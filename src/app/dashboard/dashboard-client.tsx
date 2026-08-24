"use client"
import {useMemo, useState} from "react"
import dynamic from "next/dynamic"
import {SpeciesObservationCount} from "./get-observation-counts"
import {SpeciesTable} from "./species-table"

const DashboardMap = dynamic(() => import("./components/dashboard-map").then(m => m.DashboardMap), {ssr: false})

type Props = {
  counts: SpeciesObservationCount[]
  totalTbia: number
  totalInat: number
}

export const DashboardClient = ({counts, totalTbia, totalInat}: Props) => {
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set())

  const toggleSelected = (scientificName: string) => {
    setSelectedNames(prev => {
      const next = new Set(prev)
      next.has(scientificName) ? next.delete(scientificName) : next.add(scientificName)
      return next
    })
  }

  const selectedSpecies = useMemo(
    () => counts.filter(({scientificName}) => selectedNames.has(scientificName)),
    [counts, selectedNames]
  )

  return (
    <div className="w-full flex flex-col gap-4">
      <SpeciesTable
        counts={counts}
        totalTbia={totalTbia}
        totalInat={totalInat}
        selectedNames={selectedNames}
        toggleSelected={toggleSelected}
      />

      {selectedSpecies.length > 0 && (
        <div className="w-full h-[28rem] rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <DashboardMap selected={selectedSpecies} />
        </div>
      )}
    </div>
  )
}
