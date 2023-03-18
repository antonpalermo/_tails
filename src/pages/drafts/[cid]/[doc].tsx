import Layout from "@components/drafts/Layout"
import { ReactElement } from "react"

export default function EditCourseDocs() {
  return (
    <div>
      <h1>Edit Course Docs</h1>
    </div>
  )
}

EditCourseDocs.pageLayout = function (page: ReactElement) {
  return <Layout title="Edit Docs">{page}</Layout>
}
