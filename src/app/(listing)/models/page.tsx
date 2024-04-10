import {List} from "../list"
import "./page.css"

// TODO: remove mockup
import {models as _models} from "@/app/mockups"

export default function Models() {
  const featuredModels = _models
  const models = _models

  const featuredComponents = featuredModels.map((model, index) => (
    <div className="embed pb-8" key={`embed-model-${index}`} dangerouslySetInnerHTML={{__html: model}} />
  ))

  const modelComponents = models.map((model, index) => (
    <div className="embed" key={`embed-model-${index}`} dangerouslySetInnerHTML={{__html: model}} />
  ))

  return <List autoplay={false} featuredComponents={featuredComponents} listComponents={modelComponents} title="模型" />
}
