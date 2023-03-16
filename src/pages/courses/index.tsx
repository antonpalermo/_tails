import { Course } from "@prisma/client"
import { useRouter } from "next/router"

import useSWR from "swr"
import fetcher from "@libs/fetcher"

export default function Courses() {
  const router = useRouter()
  const { data, isLoading } = useSWR<Course[]>("/api/courses", fetcher)

  if (isLoading) {
    return <h1>loading...</h1>
  }

  return (
    <div>
      <h1>Courses</h1>
      {data.map(course => (
        <div key={course.id}>
          {JSON.stringify(course)}
          <button
            onClick={() =>
              router.push({
                pathname: "/drafts/[cid]",
                query: { cid: course.id }
              })
            }
          >
            edit
          </button>
        </div>
      ))}
    </div>
  )
}
