import Layout from "@components/drafts/Layout"
import { Doc } from "@prisma/client"
import fetcher from "@utils/fetcher"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"

interface EditCourseDocsProps {
  doc: Doc
}

export default function EditCourseDocs({ doc }: EditCourseDocsProps) {
  return (
    <div>
      <h1>Edit Course Docs</h1>
      {JSON.stringify(doc)}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.doc
  const { data: doc, error } = await fetcher<Doc>(`/api/docs/${id}`)

  if (error) {
    return { notFound: true }
  }

  return {
    props: { doc }
  }
}

EditCourseDocs.pageLayout = function (page: ReactElement) {
  return <Layout title="Edit Docs">{page}</Layout>
}
