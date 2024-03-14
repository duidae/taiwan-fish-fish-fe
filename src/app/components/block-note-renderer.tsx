"use client"
import {BlockNoteView, useCreateBlockNote} from "@blocknote/react"
import dynamic from "next/dynamic"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/react/style.css"

//const BlockNoteView = dynamic(async () => (await import("@blocknote/react")), {ssr: false})

export const BlockNoteRenderer = (props: {content: any}) => {
  const {content} = props

  const editor = useCreateBlockNote(content)

  return <BlockNoteView editable={false} editor={editor} />
}
