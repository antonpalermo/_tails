import fetcher from "@utils/fetcher"

export default function Courses() {
  async function handleCreate() {
    const { data, error } = await fetcher("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })


    

  }

  return (
    <div>
      <button>create</button>
      <h1>Courses</h1>
    </div>
  )
}
