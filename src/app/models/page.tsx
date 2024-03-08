import {models as _models} from "@/app/mockups"

export default function Models() {
  const featuredModels = _models
  const models = _models

  const slider = <div>Slider</div>

  const modelCompnents = models.map((model, index) => (
    <div key={`embed-model-${index}`} dangerouslySetInnerHTML={{__html: model}} />
  ))

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <div className="text-2xl">所有模型</div>
      {slider}
      <div className="mt-8 mb-4 grid text-center w-4/5 lg:grid-cols-3 lg:text-left gap-8">{modelCompnents}</div>
    </main>
  )
}
