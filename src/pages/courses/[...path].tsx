import { Doc, Prisma } from "@prisma/client"
import { GetServerSideProps } from "next"

import fetcher from "@utils/fetcher"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

interface CourseDetailsProps {
  course: Prisma.CourseGetPayload<{
    include: { docs: { select: { id: true; title: true } } }
  }>
}

export default function Course({ course }: CourseDetailsProps) {
  const router = useRouter()

  function handleNavigate(docId: string) {
    router.push({
      pathname: "/courses/[courseId]/[docId]",
      query: { courseId: course.id, docId }
    })
  }

  return (
    <div>
      <div>
        <h2>sidebar</h2>
        {course.docs.map(doc => (
          <button key={doc.id} onClick={() => handleNavigate(doc.id)}>
            {doc.title}
          </button>
        ))}
      </div>
      <h1>Course Details</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // extract the courseId in the query
  const { path, courseId = path[0] } = query
  // fetch the course details based on the selected courseId
  const { data: course, error } = await fetcher(`/api/courses/${courseId}`)

  if (error) {
    return { notFound: true }
  }

  return {
    props: {
      course
    }
  }
}
