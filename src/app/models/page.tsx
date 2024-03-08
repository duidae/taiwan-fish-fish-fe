import {models as _models} from "@/app/mockups"

export default function Models() {
  const featuredModels = _models
  const models = _models

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      {models.map((model, index) => (
        <div key={`embed-model-${index}`} dangerouslySetInnerHTML={{__html: model}} />
      ))}
    </main>
  )
}
