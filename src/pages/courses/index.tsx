import { Course } from "@prisma/client"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import usePublishedCourses from "@utils/useCourses"
import fetcher from "@utils/fetcher"
import { useCourseDetails } from "@contexts/CourseDetails"

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: courses } = await fetcher<Course[]>(
    "/api/courses?published=false"
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
  const { setSelectedCourse } = useCourseDetails()
  // collect all unpublished course
  const { data, mutate } = usePublishedCourses<Course[]>(false, courses)

  function handleEditCourse(courseId: string) {
    setSelectedCourse(courseId)
    router.push({
      pathname: `/courses/${courseId}`
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
