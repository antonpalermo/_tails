import EditorContent from "@components/EditorContent"
import { JSONContent } from "@tiptap/react"
import React, { useReducer } from "react"

interface HomeState {
  body: JSONContent
}

interface HomeActions {
  type: "SET_BODY"
  payload: any
}

export default function Home() {
  const initialState: HomeState = {
    body: { type: "doc", content: [] }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function reducer(state: HomeState, actions: HomeActions) {
    switch (actions.type) {
      case "SET_BODY":
        return { ...state, body: actions.payload }
      default:
        return state
    }
  }

  async function handleSubmit() {
    console.log(state.body)
  }

  return (
    <div>
      <h1>Editor</h1>
      <button onClick={handleSubmit}>Save</button>
      {JSON.stringify(state.body)}
      <EditorContent
        onUpdate={({ editor }) =>
          dispatch({ type: "SET_BODY", payload: editor.getJSON() })
        }
      />
    </div>
  )
}
