import {Slider} from "@/app/components/slider"

// TODO: remove mockup
import {models as _models} from "@/app/mockups"

export default function Models() {
  const featuredModels = _models
  const models = _models

  const featuredComponents = featuredModels.map((model, index) => (
    <div key={`embed-model-${index}`} dangerouslySetInnerHTML={{__html: model}} />
  ))

  const modelComponents = models.map((model, index) => (
    <div key={`embed-model-${index}`} dangerouslySetInnerHTML={{__html: model}} />
  ))

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <div className="text-2xl mb-8">精選模型</div>
      <div className="w-4/5">
        <Slider slides={featuredComponents} />
      </div>
      <div className="text-2xl mt-8 mb-8">所有模型</div>
      <div className="w-4/5 grid text-center  lg:grid-cols-4 lg:text-left gap-8 mt-4 mb-4">{modelComponents}</div>
    </main>
  )
}
