import { Course } from "@prisma/client"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import usePublishedCourses from "@utils/useCourses"

export const getServerSideProps: GetServerSideProps = async ctx => {
  const baseURL = new URL("/api/courses?published=true", process.env.BASE_URL)
  const response = await fetch(baseURL)

  return {
    props: { courses: await response.json() }
  }
}

export type DraftsProps = {
  courses: Course[]
}

export default function Drafts({ courses }: DraftsProps) {
  const router = useRouter()
  const { data, mutate } = usePublishedCourses<Course[]>(false, courses)
  function handleEditCourse(cid: string) {
    router.push({
      pathname: "/drafts/[cid]",
      query: { cid }
    })
  }

  return (
    <div>
      <h1>Drafts</h1>
      {data.map(course => (
        <div key={course.id}>
          {JSON.stringify(course)}
          <button onClick={() => handleEditCourse(course.id)}>edit</button>
        </div>
      ))}
    </div>
  )
}
