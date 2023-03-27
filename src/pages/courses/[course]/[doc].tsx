import { Doc } from "@prisma/client"
import { GetServerSideProps } from "next"

import fetcher from "@utils/fetcher"
import Layout from "@components/course/Layout"
import { ReactElement } from "react"
import Editor from "@components/course/Editor"

interface DocumentDetailsProps {
  doc: Doc
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const courseId = query.course
  const docId = query.doc

  const { data: doc, error } = await fetcher<Doc>(
    `/api/courses/${courseId}/docs/${docId}`
  )

  if (error && error.code === 404) {
    return { notFound: true }
  }

  return {
    props: { doc }
  }
}

export default function DocumentDetails({ doc }: DocumentDetailsProps) {
  return (
    <div>
      <h1>Document Details</h1>
      <Editor />
    </div>
  )
}

DocumentDetails.pageLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>
}
