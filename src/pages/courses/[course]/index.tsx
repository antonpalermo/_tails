import { Course } from "@prisma/client"
import { GetServerSideProps } from "next"

import fetcher from "@utils/fetcher"
import { ReactElement } from "react"
import Layout from "@components/course/Layout"

interface CourseDetailsProps {
  course: Course
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { data: course, error } = await fetcher<Course>(
    `/api/courses/${ctx.query.course}`
  )

  if (error && error.code === 404) {
    return { notFound: true }
  }

  return {
    props: { course }
  }
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div>
      <h1>Course Details</h1>
      {JSON.stringify(course)}
    </div>
  )
}

CourseDetails.pageLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>
}
