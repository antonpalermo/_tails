import { Course } from "@prisma/client"
import { useRouter } from "next/router"

import fetcher from "@libs/fetcher"
import usePublishedCourses from "@utils/useCourses"

export default function Courses() {
  const router = useRouter()
  // collect all unpublished course
  const { data, error, isLoading, mutate } = usePublishedCourses<Course[]>(true)

  if (isLoading) {
    return <h1>loading...</h1>
  }

  function handleEditCourse(cid: string) {
    router.push({
      pathname: "/drafts/[cid]",
      query: { cid }
    })
  }

  async function handleCreateCourse() {
    const course = await fetcher("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Blank Course" })
    })

    handleEditCourse(course.id)
    mutate([...data, course])
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
