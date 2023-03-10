import { Course } from "@prisma/client"
import useSWR from "swr"

const fetcher = (key: string) => fetch(key).then(req => req.json())

export default function Courses() {
  const { data, isLoading, mutate } = useSWR<Course[]>("/api/courses", fetcher)

  async function createNewCourse() {
    const req = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Untitled Course" })
    })

    const course = await req.json()
    mutate([...data, course])
  }

  if (isLoading) {
    return <h1>loading...</h1>
  }

  return (
    <div>
      <h1>Courses</h1>
      <button onClick={createNewCourse}>create</button>
      {data.map(course => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <button>edit</button>
        </div>
      ))}
    </div>
  )
}
