import {FRESHWATER_FISH_SPECIES} from "./species-list"
import {getObservationCounts} from "./get-observation-counts"
import {SpeciesTable} from "./species-table"

export const revalidate = 60 * 60 * 24 * 30 // 1 month

export default async function Dashboard() {
  const counts = await getObservationCounts(FRESHWATER_FISH_SPECIES)

  const totalInat = counts.reduce((sum, {inaturalist}) => sum + (inaturalist ?? 0), 0)
  const totalTbia = counts.reduce((sum, {tbia}) => sum + (tbia ?? 0), 0)

  return (
    <main className="w-full flex flex-col items-center mt-24 mb-16 px-4">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-800">台灣淡水魚觀察紀錄數</h1>
          <p className="text-sm text-slate-500">
            資料來源：<span className="font-medium">TBIA</span> 台灣生物多樣性資訊聯盟與{" "}
            <span className="font-medium">iNaturalist</span>（台灣地區、已驗證紀錄）。以學名查詢，每月更新一次。
          </p>
        </div>

        <SpeciesTable counts={counts} totalTbia={totalTbia} totalInat={totalInat} />

        <p className="text-xs text-slate-400">
          註：部分物種於資料庫中以同物異名（synonym）方式對應，可能造成數筆物種顯示相近或相同筆數（例如纓口臺鰍與吉氏纓口鰍於
          TBIA 中對應同一筆學名紀錄），僅供參考。
        </p>
      </div>
    </main>
  )
}
