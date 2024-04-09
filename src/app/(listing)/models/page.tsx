import {List} from "../list"

// TODO: remove mockup
import {models as _models} from "@/app/mockups"

export default function Models() {
  const featuredModels = _models
  const models = _models

  const featuredComponents = featuredModels.map((model, index) => (
    <div className="pb-8" key={`embed-model-${index}`} dangerouslySetInnerHTML={{__html: model}} />
  ))

  const modelComponents = models.map((model, index) => (
    <div key={`embed-model-${index}`} dangerouslySetInnerHTML={{__html: model}} />
  ))

  return <List featuredComponents={featuredComponents} listComponents={modelComponents} title="模型" />
}
