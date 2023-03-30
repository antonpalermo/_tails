import { useEffect } from "react"
import { useEditor, EditorEvents, EditorContent as Tiptap } from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"

import Document from "@tiptap/extension-document"
import Placeholder from "@tiptap/extension-placeholder"

export interface EditorContentProps {
  editable?: boolean
  onUpdate: (props: EditorEvents["update"]) => void
}

const Doc = Document.extend({
  content: "heading block*"
})

export default function EditorContent({
  editable,
  onUpdate
}: EditorContentProps) {
  const editor = useEditor({
    extensions: [
      Doc,
      StarterKit.configure({
        document: false
      }),
      Placeholder.configure({
        showOnlyCurrent: true,
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Untitled"
          }
          return "Write something"
        }
      })
    ],
    onUpdate
  })

  useEffect(() => {
    if (editor) editor.setEditable(editable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable])

  return <Tiptap editor={editor} />
}
