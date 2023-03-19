import { Course } from "@prisma/client"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import usePublishedCourses from "@utils/useCourses"
import fetcher from "@utils/fetcher"

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: courses } = await fetcher<Course[]>(
    "/api/courses?published=true"
  )

  return {
    props: { courses }
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
    const { data: course } = await fetcher<Course>("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Blank Course" })
    })

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
          {/* make sure that the course owner can edit */}
          <button onClick={() => handleEditCourse(course.id)}>edit</button>
        </div>
      ))}
    </div>
  )
}
