import {
  useEditor,
  EditorEvents,
  EditorContent as TipTapEditorContent
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export interface EditorContentProps {
  onUpdate: (props: EditorEvents["update"]) => void
}

export default function EditorContent({ onUpdate }: EditorContentProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate
  })

  return <TipTapEditorContent editor={editor} />
}
