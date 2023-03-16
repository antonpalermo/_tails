import { Course } from "@prisma/client"
import usePublishedCourses from "@utils/useCourses"
import { useRouter } from "next/router"

export default function Drafts() {
  const router = useRouter()
  const {
    data: courses,
    error,
    isLoading,
    mutate
  } = usePublishedCourses<Course[]>(false)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  function handleEditCourse(cid: string) {
    router.push({
      pathname: "/drafts/[cid]",
      query: { cid }
    })
  }

  return (
    <div>
      <h1>Drafts</h1>
      {courses.map(course => (
        <div key={course.id}>
          {JSON.stringify(course)}
          <button onClick={() => handleEditCourse(course.id)}>edit</button>
        </div>
      ))}
    </div>
  )
}
