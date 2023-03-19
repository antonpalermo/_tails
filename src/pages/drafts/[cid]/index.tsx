import Layout from "@components/drafts/Layout"
import { Course } from "@prisma/client"
import fetcher from "@utils/fetcher"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"

export type EditCourseDetailsProps = {
  course: Course
}

export default function EditCourseDetails({ course }: EditCourseDetailsProps) {
  return (
    <div>
      <h1>Edit Course Details</h1>
      {JSON.stringify(course)}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { data: course, error } = await fetcher<Course>(
    `/api/courses/${ctx.query.cid}`
  )

  if (error && error.code === 404) {
    return { notFound: true }
  }

  return {
    props: { course }
  }
}

EditCourseDetails.pageLayout = function (page: ReactElement) {
  const { course } = page.props
  return <Layout title={course.name}>{page}</Layout>
}
