import { Course } from "@prisma/client"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import usePublishedCourses from "@utils/useCourses"
import fetcher from "@utils/fetcher"

export const getServerSideProps: GetServerSideProps = async ctx => {
  const baseURL = new URL("/api/courses?published=true", process.env.BASE_URL)
  const response = await fetch(baseURL)

  return {
    props: { courses: await response.json() }
  }
}

export type CoursesProps = {
  courses: Course[]
}

export default function Courses({ courses }: CoursesProps) {
  const router = useRouter()
  // collect all unpublished course
  const { data, mutate } = usePublishedCourses<Course[]>(true, courses)

  function handleEditCourse(cid: string) {
    router.push({
      pathname: "/drafts/[cid]",
      query: { cid }
    })
  }

  async function handleCreateCourse() {
    const request = await fetcher("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Blank Course" })
    })

    const course = await request.json()

    mutate([...data, course])
    handleEditCourse(course.id)
  }

  return (
    <div>
      <h1>Courses</h1>
      <button onClick={handleCreateCourse}>create</button>
      {data.map(course => (
        <div key={course.id}>
          {JSON.stringify(course)}
          <button onClick={() => handleEditCourse(course.id)}>edit</button>
        </div>
      ))}
    </div>
  )
}
