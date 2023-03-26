import { Doc } from "@prisma/client"
import { GetServerSideProps } from "next"

import fetcher from "@utils/fetcher"

interface DocumentDetailsProps {
  doc: Doc
}

export default function DocumentDetails({ doc }: DocumentDetailsProps) {
  return (
    <div>
      <h1>Document Details</h1>
      {JSON.stringify(doc)}
    </div>
  )
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
