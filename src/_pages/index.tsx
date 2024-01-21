import EditorContent from "@components/EditorContent"
import { Content } from "@tiptap/react"
import fetcher from "@utils/fetcher"
import React, { useReducer } from "react"

interface HomeState {
  slug: Content
}

interface HomeActions {
  type: "SET_CONTENT_SLUG"
  payload: any
}

export default function Home() {
  const initialState: HomeState = {
    slug: { type: "doc", content: [] }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function reducer(state: HomeState, actions: HomeActions) {
    switch (actions.type) {
      case "SET_CONTENT_SLUG":
        return { ...state, slug: actions.payload }
      default:
        return state
    }
  }

  async function handleSubmit() {
    const { data, error } = await fetcher("/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ slug: state.slug })
    })

    if (error && error.code === 405) {
    }
  }

  return (
    <div>
      <h1>Editor</h1>
      <button onClick={handleSubmit}>Save</button>
      <EditorContent
        onUpdate={({ editor }) =>
          dispatch({ type: "SET_CONTENT_SLUG", payload: editor.getJSON() })
        }
      />
    </div>
  )
}
