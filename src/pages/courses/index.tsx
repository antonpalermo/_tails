import fetcher from "@utils/fetcher"
import { useRouter } from "next/router"

export default function Courses() {
  const router = useRouter()

  async function handleCreate() {
    const { data, error } = await fetcher("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
  }

  return (
    <div>
      <button onClick={() => router.push({ pathname: "/courses/create" })}>
        create
      </button>
      <h1>Courses</h1>
    </div>
  )
}
