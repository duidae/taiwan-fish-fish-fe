"use client"
import {BlockNoteEditor, PartialBlock} from "@blocknote/core"
import {BlockNoteView} from "@blocknote/react"
import dynamic from "next/dynamic"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/react/style.css"

//const BlockNoteView = dynamic(async () => (await import("@blocknote/react")), {ssr: false})

export const BlockNoteRenderer = (props: {content: any}) => {
  const {content} = props

  const initialContent = content ? (JSON.parse(content) as PartialBlock[]) : undefined
  const editor = BlockNoteEditor.create({initialContent})

  return <BlockNoteView editable={false} editor={editor} />
}
