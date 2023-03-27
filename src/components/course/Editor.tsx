import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit]
  })

  return (
    <div>
      <h1>Editor</h1>
      <EditorContent editor={editor} />
    </div>
  )
}
