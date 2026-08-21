"use client"

type Props = {
  riverResults: any
  selectedRiver: any | null
  handleResultClick: (feature: any) => void | Promise<void>
}

export const RiverResultsList = ({riverResults, selectedRiver, handleResultClick}: Props) => (
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
